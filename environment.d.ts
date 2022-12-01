declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_END_POINT: string;
    }
  }
}

export {};
