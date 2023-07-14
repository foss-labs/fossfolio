import { useQuery } from 'react-query';
import { supaClient } from '@app/config/supabaseClient';

const getUserInfo = async () => await supaClient.auth.getUser();

export const useUser = () => {
    const user = useQuery('user', getUserInfo);

    return user;
};
