import Axios from 'axios';

export const apiHandler = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
