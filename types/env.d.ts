declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_END_POINT: string;
      NEXT_PUBLIC_KAKAO_API_KEY: string;
      NEXT_PUBLIC_DOMAIN_URL: string;
    }
  }
  interface Window {
    Kakao: any;
  }
}

export {};
