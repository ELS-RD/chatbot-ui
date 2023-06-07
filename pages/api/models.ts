import { NextFetchEvent, NextRequest } from 'next/server';

import {
  OPENAI_API_HOST,
  OPENAI_API_TYPE,
  OPENAI_API_VERSION,
  OPENAI_ORGANIZATION,
} from '@/utils/app/const';

import { OpenAIModel, OpenAIModelID, OpenAIModels } from '@/types/openai';
import { Duration } from '@/types/ratelimit';

import { Ratelimit } from '@upstash/ratelimit';
import kv from '@vercel/kv';
import md5 from 'md5';


export const config = {
  runtime: 'edge',
};

const tokens = parseInt(process.env.RATE_LIMITER_CALL_MODEL ?? '600', 10);
const rateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(
    isNaN(tokens) ? 600 : tokens,
    (process.env.RATE_LIMITER_WINDOW ?? '1h') as Duration,
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
      `jackgpt_ratelimit_model_${hashedUsername}`,
    );
    event.waitUntil(pending);

    if (!success) {
      console.warn(
        'RATE_LIMIT_MODEL',
        hashedUsername,
        `remaining:${remaining}/limit:${limit}`,
      );
      return new Response(
        'You have reached your quota of model requests. Please try again later.',
        {
          status: 429,
        },
      );
    }

    const { key } = (await req.json()) as {
      key: string;
    };

    let url = `${OPENAI_API_HOST}/v1/models`;
    if (OPENAI_API_TYPE === 'azure') {
      url = `${OPENAI_API_HOST}/openai/deployments?api-version=${OPENAI_API_VERSION}`;
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(OPENAI_API_TYPE === 'openai' && {
          Authorization: `Bearer ${key ? key : process.env.OPENAI_API_KEY}`,
        }),
        ...(OPENAI_API_TYPE === 'azure' && {
          'api-key': `${key ? key : process.env.OPENAI_API_KEY}`,
        }),
        ...(OPENAI_API_TYPE === 'openai' &&
          OPENAI_ORGANIZATION && {
            'OpenAI-Organization': OPENAI_ORGANIZATION,
          }),
      },
    });

    if (response.status === 401) {
      return new Response(response.body, {
        status: 500,
        headers: response.headers,
      });
    } else if (response.status !== 200) {
      console.error(
        `OpenAI API returned an error ${
          response.status
        }: ${await response.text()}`,
      );
      throw new Error('OpenAI API returned an error');
    }

    const json = await response.json();

    const models: OpenAIModel[] = json.data
      .map((model: any) => {
        const model_name = OPENAI_API_TYPE === 'azure' ? model.model : model.id;
        for (const [key, value] of Object.entries(OpenAIModelID)) {
          if (value === model_name) {
            return {
              id: model.id,
              name: OpenAIModels[value].name,
            };
          }
        }
      })
      .filter(Boolean);

    return new Response(JSON.stringify(models), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;