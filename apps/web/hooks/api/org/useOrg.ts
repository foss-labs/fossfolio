import { apiHandler } from '@app/config';
import { useQuery } from 'react-query';

const getAllOrg = async () => {
    try {
        const { data, status } = await apiHandler.get('/user/orgs');
        // handling unauth
        if (status === 401) {
            throw new Error('Unauthorized user');
        }
        return data;
    } catch {
        console.error('Login failed');
    }
};

export const useOrgs = () => {
    const orgs= useQuery('orgs', getAllOrg);
    return orgs;
};
