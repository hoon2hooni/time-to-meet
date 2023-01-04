import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      yellow: string;
      white: string;
      block: string;
      error: string;
      green: string;
      lightGreen: string;
      gray: string;
      buttonHoverPrimary: string;
      buttonHoverSecondary: string;
      header: string;
    };
  }
}
