declare namespace NodeJS {
    export interface ProcessEnv {
        NEXT_PUBLIC_WEBSITE_DOMAIN: string;
        NEXT_PUBLIC_API_URL: string;
        OPEN_AI_TOKEN: string;
        AWS_ACCESS_KEY: string;
        AWS_SECRET_KEY: string;
    }
}
