import React from 'react';
import { DashLayout } from '@app/layout';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { AddEvent, Event } from '@app/views/dashboard';

const index = () => (
    <Box p="6">
        <Heading>Your Hackathons</Heading>
        <Flex mt="30px" columnGap="30px" flexWrap="wrap">
            <AddEvent />
            <Event />
        </Flex>
    </Box>
);

index.Layout = DashLayout;

export default index;
