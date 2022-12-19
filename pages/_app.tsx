import { Global, ThemeProvider } from "@emotion/react";
import global from "@styles/global";
import theme from "@styles/theme";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
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
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}
