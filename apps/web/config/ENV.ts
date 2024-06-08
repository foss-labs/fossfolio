export const ENV = {
    api_base: process.env.NEXT_PUBLIC_API_URL + '/api' || 'http://localhost:3001/api',
    web_base_url: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || 'http://localhost:3000',
    aws_access_key: process.env.AWS_ACCESS_KEY,
    aws_secret_key: process.env.AWS_SECRET_KEY,
};
