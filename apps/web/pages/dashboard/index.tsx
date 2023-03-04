import { NextPageWithLayout } from 'next';
import React from 'react';
import { HomeLayout } from '@app/layout';
import { Box, Heading } from '@chakra-ui/react';

const index: NextPageWithLayout = () => (
    <Box p="6" border="1px solid red">
        <Heading>Your Hackathons</Heading>
    </Box>
);

index.Layout = HomeLayout;

export default index;
