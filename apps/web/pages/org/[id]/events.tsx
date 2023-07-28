import React from 'react';
import { NextPageWithLayout } from 'next';
import { HomeLayout } from '@app/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/ui/components/tabs';
import { Members } from '@app/views/org';

const Events: NextPageWithLayout = () => {
    return (
        <div className="mt-4 p-4">
            <Tabs defaultValue="teams">
                <div className="flex items-center justify-center">
                    <TabsList>
                        <TabsTrigger value="events">My Events</TabsTrigger>
                        <TabsTrigger value="teams">Members</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="events">Make changes to your account here.</TabsContent>
                <TabsContent value="teams">
                    <Members />
                </TabsContent>
                <TabsContent value="settings">Change your settings here.</TabsContent>
            </Tabs>
        </div>
    );
};

Events.Layout = HomeLayout;

export default Events;
