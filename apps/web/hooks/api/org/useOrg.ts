import { apiHandler } from '@app/config';
import { useQuery } from '@tanstack/react-query';

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

type IOrg = {
    organization: {
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    };
    role: 'ADMIN' | 'EDITOR' | 'VIEWER';
};

export const useOrgs = () => {
    const orgs = useQuery<Array<IOrg>>({ queryKey: ['orgs]'], queryFn: getAllOrg });
    return orgs;
};
