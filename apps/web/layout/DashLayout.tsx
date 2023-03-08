import React from 'react';
import { Child } from '@app/types';
import { Flex } from '@chakra-ui/react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { DashNav } from './components/DashNav';

export const DashLayout = ({ children }: Child) => (
    <SessionAuth>
        <Flex>
            <DashNav />
            {children}
        </Flex>
    </SessionAuth>
);
