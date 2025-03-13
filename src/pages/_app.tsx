import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

import { Toaster } from '@/components/ui/sonner';

import { Providers } from '../components/Providers';

import '@/styles/globals.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>FinanTrack</title>
      </Head>
      <SessionProvider session={ session }>
        <Providers>
          { getLayout(<Component { ...pageProps } />) }
        </Providers>
      </SessionProvider>
      <Toaster />
    </>
  );
}
