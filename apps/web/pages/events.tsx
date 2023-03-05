import React from 'react';
import { HomeLayout } from '@app/layout';
import { Card } from '@app/views/events';
import { Flex, Heading } from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';

const Events: NextPageWithLayout = () => (
    <Flex p="6" flexDir="column">
        <Heading textAlign="center" fontSize="48px">
            Find Hackathons
        </Heading>
        <Flex columnGap="25px" flexWrap="wrap">
            <Card />
            <Card />
            <Card />
        </Flex>
    </Flex>
);

Events.getLayout = (page) => <HomeLayout>{page}</HomeLayout>;

export default Events;
