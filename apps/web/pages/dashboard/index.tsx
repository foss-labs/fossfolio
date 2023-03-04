import React from 'react';
import { HomeLayout } from '@app/layout';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { AddEvent, Event } from '@app/views/dashboard';
import { NextPageWithLayout } from '../_app';

const index: NextPageWithLayout = () => (
    <Box p="6">
        <Heading>Your Hackathons</Heading>
        <Flex mt="30px" columnGap="30px" flexWrap="wrap">
            <AddEvent />
            <Event />
        </Flex>
    </Box>
);

index.getLayout = (page) => <HomeLayout>{page}</HomeLayout>;

export default index;
