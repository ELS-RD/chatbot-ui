import { NextFetchEvent, NextRequest } from 'next/server';

import {
  DEFAULT_SYSTEM_PROMPT,
  DEFAULT_TEMPERATURE,
  RATE_LIMIT_DURATION,
} from '@/utils/app/const';
import { OpenAIError, OpenAIStream } from '@/utils/server';

import { ChatBody, Message } from '@/types/chat';

// @ts-expect-error
import wasm from '../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';

import tiktokenModel from '@dqbd/tiktoken/encoders/cl100k_base.json';
import { Tiktoken, init } from '@dqbd/tiktoken/lite/init';
import { Ratelimit } from '@upstash/ratelimit';
import kv from '@vercel/kv';
import md5 from 'md5';


export const config = {
  runtime: 'edge',
};

const tokens = parseInt(process.env.RATE_LIMITER_TOKENS ?? '120', 10);
const rateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(
    isNaN(tokens) ? 120 : tokens,
    (process.env.RATE_LIMITER_WINDOW ?? '1h') as RATE_LIMIT_DURATION,
  ),
  analytics: false, // disable Upstash rate limiter analytics
});

const handler = async (
  req: NextRequest,
  event: NextFetchEvent,
): Promise<Response> => {
  try {
    const username = req.headers.get('x-user') ?? 'anonymous';
    const hashedUsername = md5(username);

    const { success, pending, limit, remaining, reset } = await rateLimit.limit(
      `jackgpt_ratelimit_chat_${hashedUsername}`,
    );
    event.waitUntil(pending);

    if (!success) {
      console.warn(
        'RATE_LIMIT_CHAT',
        hashedUsername,
        `remaining:${remaining}/limit:${limit}`,
      );
      return new Response(
        'You have reached your quota of requests. Please try again later.',
        {
          status: 429,
        },
      );
    }

    const { model, messages, key, prompt, temperature } =
      (await req.json()) as ChatBody;

    // ⚠️temporary: to be removed
    // checks whether the model sent is the default
    if (model.id !== process.env.DEFAULT_MODEL) {
      return new Response(
        'Unauthorized : The version of the model transmitted is not authorized.',
        { status: 401 },
      );
    }

    await init((imports) => WebAssembly.instantiate(wasm, imports));
    const encoding = new Tiktoken(
      tiktokenModel.bpe_ranks,
      tiktokenModel.special_tokens,
      tiktokenModel.pat_str,
    );

    let promptToSend = prompt;
    if (!promptToSend) {
      promptToSend = DEFAULT_SYSTEM_PROMPT;
    }

    let temperatureToUse = temperature;
    if (temperatureToUse == null) {
      temperatureToUse = DEFAULT_TEMPERATURE;
    }

    const prompt_tokens = encoding.encode(promptToSend);

    let tokenCount = prompt_tokens.length;
    let messagesToSend: Message[] = [];

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const tokens = encoding.encode(message.content);

      if (tokenCount + tokens.length + 1000 > model.tokenLimit) {
        break;
      }
      tokenCount += tokens.length;
      messagesToSend = [message, ...messagesToSend];
    }

    encoding.free();

    const stream = await OpenAIStream(
      model,
      promptToSend,
      temperatureToUse,
      key,
      messagesToSend,
      hashedUsername,
    );

    return new Response(stream);
  } catch (error) {
    console.error(error);
    if (error instanceof OpenAIError) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(
        'An error has occurred beyond our control. Please try again later.',
        { status: 500 },
      );
    }
  }
};

export default handler;