/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { HomeLayout } from '@app/layout';
import { Card } from '@app/views/events';
import { Flex, Heading } from '@chakra-ui/react';
import { apiHandler } from '@app/config/handler';
import { NextPageWithLayout } from 'next';

const Events: NextPageWithLayout = () => {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getData = async () => {
        try {
            setIsLoading(true);
            const { data: apiData } = await apiHandler.get('/user/ViewAllEvents');
            if (!apiData.ok) {
                throw new Error();
            }
            setData(data);
        } catch {
            // render a error ui in same page
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            await getData();
        })();
    }, []);

    if (isLoading) {
        <h1>loading</h1>;
    }

    return (
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
};

Events.Layout = HomeLayout;

export default Events;
