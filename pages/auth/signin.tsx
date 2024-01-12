import { getProviders, signIn } from 'next-auth/react';

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';


export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);

  // If the user is already logged in, redirect.
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}