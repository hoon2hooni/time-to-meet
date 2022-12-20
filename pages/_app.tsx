import "react-toastify/dist/ReactToastify.css";

import { Global, ThemeProvider } from "@emotion/react";
import global from "@styles/global";
import theme from "@styles/theme";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { ReactElement, ReactNode } from "react";
import { ToastContainer } from "react-toastify";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <title>타임투밋</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="타임투밋, 카톡으로 약속잡기" />
        <meta property="og:title" content="타임투밋" />
        <meta property="og:url" content="https://www.time2meet.xyz/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.time2meet.xyz/og_image.png"
        />
        <meta property="og:title" content="타임투밋" />
        <meta property="og:description" content="타임투밋, 카톡으로 약속잡기" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="339" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}
