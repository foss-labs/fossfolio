import React from 'react';
import { DashLayout } from '@app/layout';
import { Flex, Heading } from '@chakra-ui/react';
import { Card } from '@app/views/events';
import { NextPageWithLayout } from 'next';

const Tickets: NextPageWithLayout = () => (
    <Flex columnGap="25px" flexWrap="wrap" flexDir="column" p="10">
        <Heading textAlign="start" fontSize="38px">
            Your Tickets
        </Heading>
        <Flex columnGap="25px" flexWrap="wrap">
            <Card />
            <Card />
        </Flex>
    </Flex>
);
Tickets.Layout = DashLayout;
Tickets.RequireAuth = true;

export default Tickets;
