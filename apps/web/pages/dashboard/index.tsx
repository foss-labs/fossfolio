import { NextPageWithLayout } from 'next';
import React from 'react';
import { HomeLayout } from '@app/layout';
import { Box, Heading } from '@chakra-ui/react';
import { AddEvent } from '@app/views/dashboard';

const index: NextPageWithLayout = () => (
    <Box p="6">
        <Heading>Your Hackathons</Heading>
        <AddEvent />
    </Box>
);

index.Layout = HomeLayout;

export default index;
