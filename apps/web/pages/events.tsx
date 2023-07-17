/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { HomeLayout } from '@app/layout';
import { Card } from '@app/views/events';
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
        <div className="p-6 flex flex-col">
            <h1 className="text-center text-[48px]">Find Hackathons</h1>
            <div className="flex flex-wrap gap-[25px]">
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

Events.Layout = HomeLayout;
Events.RequireAuth = false;

export default Events;
