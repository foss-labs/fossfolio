import { apiHandler } from '@app/config';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@app/hooks/useAuth';

type LogOut = {
    isLoading: boolean;
    logOut: () => Promise<void>;
};

export const useLogOut = (): LogOut => {
    const [isLoading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const { clearData } = useAuth();
    const logOut = async (): Promise<void> => {
        try {
            setLoading(true);
            // clearing user context
            clearData();
            // clearing all the disk cache
            queryClient.clear();
            await apiHandler.get('/auth/logout');
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    return { logOut, isLoading };
};
