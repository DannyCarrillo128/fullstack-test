import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Providers } from '../../components/Providers';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>FinanTrack</title>
      </Head>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  );
}
