import type { DateISO } from "@dateTypes";
declare global {
  interface Window {
    Kakao: any;
  }
  interface Date {
    toISOString(): DateISO;
  }
}

export {};
