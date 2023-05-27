import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchUser } from '@app/slices/auth';
import { Child } from '@app/types';
import { Flex } from '@chakra-ui/react';
import { DashNav } from './components/DashNav';

export const DashLayout = ({ children }: Child) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const authState = useSelector((state: any) => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch<any>(fetchUser());
        if (!authState) router.replace('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState]);

    return (
        <Flex>
            <DashNav />
            {children}
        </Flex>
    );
};
