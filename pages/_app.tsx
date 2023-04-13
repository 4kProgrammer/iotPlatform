import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import 'material-icons/css/material-icons.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
