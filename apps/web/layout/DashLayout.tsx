import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '@app/slices/auth';
import { Child } from '@app/types';
import { Flex } from '@chakra-ui/react';
import { DashNav } from './components/DashNav';

export const DashLayout = ({ children }: Child) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<any>(fetchUser());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Flex>
            <DashNav />
            {children}
        </Flex>
    );
};
