declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_WEBSITE_DOMAIN: string;
    NEXT_PUBLIC_API_URL: string;
    MISTRAL_API_KEY: string;
    NEXT_PUBLIC_POSTHOG_KEY: string;
    NEXT_PUBLIC_POSTHOG_HOST: string;
  }
}
