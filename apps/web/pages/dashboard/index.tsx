import { NextPageWithLayout } from 'next';
import React from 'react';
import { HomeLayout } from '@app/layout';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { AddEvent, Event } from '@app/views/dashboard';

const index: NextPageWithLayout = () => (
    <Box p="6">
        <Heading>Your Hackathons</Heading>
        <Flex mt="30px" columnGap="30px" flexWrap="wrap">
            <AddEvent />
            <Event />
        </Flex>
    </Box>
);

index.Layout = HomeLayout;

export default index;
