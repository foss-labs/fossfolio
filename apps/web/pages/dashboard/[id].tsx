import React from 'react';
import { DashLayout } from '@app/layout';
import { Team } from '@app/views/dashboard';
import { Flex } from '@chakra-ui/react';
import { NextPageWithLayout } from '../_app';

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

Page.getLayout = (page) => <DashLayout>{page}</DashLayout>;

export default Page;
