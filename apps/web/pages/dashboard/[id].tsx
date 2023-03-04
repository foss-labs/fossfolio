import React from 'react';
import { NextPageWithLayout } from 'next';
import { DashLayout } from '@app/layout';
import { Team } from '@app/views/dashboard';
import { Flex } from '@chakra-ui/react';

const Data = {
    name: 'Team',
    users: [
        {
            name: 'sreehri',
            email: 'sreehri@gmail.com',
            dp: './.',
        },
        {
            name: 'sreehri',
            email: 'sreehri@gmail.com',
            dp: './.',
        },
        {
            name: 'sreehri',
            email: 'sreehri@gmail.com',
            dp: './.',
        },
    ],
};

const Page: NextPageWithLayout = () => (
    <Flex p="70px" flexWrap="wrap" columnGap="70px">
        <Team name={Data.name} users={Data.users} />
        <Team name={Data.name} users={Data.users} />
        <Team name={Data.name} users={Data.users} />
        <Team name={Data.name} users={Data.users} />
        <Team name={Data.name} users={Data.users} />
    </Flex>
);

Page.Layout = DashLayout;

export default Page;
