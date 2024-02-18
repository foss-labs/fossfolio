declare namespace NodeJS {
    export interface ProcessEnv {
        DATABASE_URL: string;
        GITHUB_CLIENT_ID: string;
        GITHUB_CLIENT_SECRET: string;
        GITHUB_CALLBACK_URL: string;
        GITHUB_SCOPE: string;
        ACCESS_TOKEN_VALIDITY: string;
        API_BASE_URL: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        GOOGLE_CALLBACK_URL: string;
        GOOGLE_SCOPE: string;
        WEB_URL: string;
        MAIL_HOST: string;
        MAIL_PORT: number;
        MAIL_USER: string;
        MAIL_PASSWORD: string;
        AWS_ACCESS_KEY: string;
        AWS_SECRET_KEY: string;
        AWS_REGION: string;
        STRIPE_SECRET_KEY: string;
    }
}
