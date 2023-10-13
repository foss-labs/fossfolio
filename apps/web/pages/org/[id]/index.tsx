import React from 'react';
import { NextPageWithLayout } from 'next';
import { HomeLayout } from '@app/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/ui/components/tabs';
import { Members } from '@app/components/table';
import { Events, DeleteOrg, LeaveOrg } from '@app/views/org';

const TabName = [
    { value: 'events', title: 'All Events' },
    { value: 'teams', title: 'Members' },
    { value: 'settings', title: 'Settings' },
];

const Org: NextPageWithLayout = () => {
    return (
        <div className="mt-4 p-4">
            <Tabs defaultValue="events">
                <div className="flex items-center justify-center">
                    <TabsList>
                        {TabName.map((el) => (
                            <TabsTrigger value={el.value} key={el.title}>
                                {el.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                <TabsContent
                    value="events"
                    className="flex md:flex-row flex-wrap gap-5 sm:justify-center "
                >
                    <Events />
                </TabsContent>
                <TabsContent value="teams">
                    <Members />
                </TabsContent>
                <TabsContent
                    value="settings"
                    className="mb-4 flex justify-center items-center flex-col gap-3"
                >
                    <LeaveOrg />
                    <DeleteOrg />
                </TabsContent>
            </Tabs>
        </div>
    );
};

Org.Layout = HomeLayout;
Org.RequireAuth = true;

export default Org;
