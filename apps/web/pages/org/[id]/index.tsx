import React from 'react';
import { NextPageWithLayout } from 'next';
import { HomeLayout } from '@app/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/ui/components/tabs';
import { DeleteOrg } from '@app/views/org';
import { Members } from '@app/components/table';
import { EventCard } from '@app/components/events';

const TabName = [
    { value: 'events', title: 'All Events' },
    { value: 'teams', title: 'Members' },
    { value: 'settings', title: 'Settings' },
];

const Events: NextPageWithLayout = () => {
    return (
        <div className="mt-4 p-4">
            <Tabs defaultValue="events">
                <div className="flex items-center justify-center">
                    <TabsList>
                        {TabName.map((el) => (
                            <TabsTrigger value={el.value} key={el.title}>
                                {el.title}{' '}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                <TabsContent
                    value="events"
                    className="flex md:flex-row flex-wrap gap-5 sm:justify-center "
                >
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </TabsContent>
                <TabsContent value="teams">
                    <Members />
                </TabsContent>
                <TabsContent value="settings" className="mb-4 flex justify-center items-center">
                    <DeleteOrg />
                </TabsContent>
            </Tabs>
        </div>
    );
};

Events.Layout = HomeLayout;
Events.RequireAuth = true;

export default Events;
