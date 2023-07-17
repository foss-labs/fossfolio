import React from 'react';
import { DashLayout } from '@app/layout';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { AddEvent, Event } from '@app/views/dashboard';
import { NextPageWithLayout } from 'next';

const index: NextPageWithLayout = () => (
    <Box p="6">
        <Heading>Your Hackathons</Heading>
        <Flex mt="30px" columnGap="30px" flexWrap="wrap">
            <AddEvent />
            <Event />
        </Flex>
    </Box>
);

index.Layout = DashLayout;
index.RequireAuth = true;

export default index;
