import Axios from 'axios';

export const apiHandler = Axios.create({
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
