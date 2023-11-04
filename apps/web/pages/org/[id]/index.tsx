import { useState } from 'react';
import { NextPageWithLayout } from 'next';
import { HomeLayout } from '@app/layout';
import { Members } from '@app/components/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/ui/components/tabs';
import { Events, DeleteOrg, LeaveOrg, InviteModal } from '@app/views/org';
import { useToggle } from '@app/hooks';
import { useOrgRole } from '@app/hooks/api/org';

const TabName = [
    { value: 'events', title: 'All Events' },
    { value: 'teams', title: 'Members' },
    { value: 'settings', title: 'Settings' },
];

const Org: NextPageWithLayout = () => {
    const [activeTab, setTab] = useState('events');
    const [inviteLink, setInviteLink] = useState('');
    const [isOpen, toggleOpen] = useToggle();
    useOrgRole();

    return (
        <div className="mt-4 p-4 h-[92vh]">
            <Tabs
                value={activeTab}
                defaultValue="events"
                className="h-full"
                onValueChange={(el: string) => setTab(el)}
            >
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
                    <Members setLink={setInviteLink} onInviteModal={toggleOpen.on} />
                    <InviteModal isOpen={isOpen} onClose={toggleOpen.off} link={inviteLink} />
                </TabsContent>
                <TabsContent
                    value="settings"
                    className={`flex justify-end items-center flex-col gap-3 ${
                        activeTab === 'settings' ? 'h-[calc(100%-7rem)]' : ''
                    }`}
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
