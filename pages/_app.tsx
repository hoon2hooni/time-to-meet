import { Global, ThemeProvider } from "@emotion/react";
import global from "@styles/global";
import theme from "@styles/theme";
import { Clarity, GA } from "@ui";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { ReactElement, ReactNode } from "react";
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
        <title>타임투밋 - 빠짐없는 모임 시간 맞추기</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="팀플,회의,모임 시간 매번 카톡 투표 만들지말고 링크 하나만 올려보세요. 사이드프로젝트 필수앱 타임투밋!"
        />
        {/* og url과 twitter url은 동적으로  */}
        <meta property="og:title" content="타임투밋" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.time2meet.xyz/og_image.png"
        />
        <meta
          property="og:title"
          content="타임투밋 - 빠짐없는 모임 시간 맞추기"
        />
        <meta property="og:description" content="타임투밋, 카톡으로 약속잡기" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="339" />
        <meta
          property="twitter:title"
          content="타임투밋 - 빠짐없는 모임 시간 맞추기"
        />
        <meta
          property="twitter:image"
          content="https://www.time2meet.xyz/og_image.png/"
        ></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </Head>
      <GA />
      <Clarity />
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
}
