import React from 'react';

import { Child } from '@app/types';
import { Flex } from '@chakra-ui/react';
import { DashNav } from './components/DashNav';

export const DashLayout = ({ children }: Child) => (
    <Flex>
        <DashNav />
        {children}
    </Flex>
);
