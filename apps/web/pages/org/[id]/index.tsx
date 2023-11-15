import { useState } from 'react';
import { NextPageWithLayout } from 'next';
import { HomeLayout } from '@app/layout';
import { Members } from '@app/components/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/ui/components/tabs';
import { Events, DeleteOrg, LeaveOrg, InviteModal } from '@app/views/org';
import { useRoles, useToggle } from '@app/hooks';
import { useOrgInfo } from '@app/hooks/api/org';
import { RiLoaderFill } from 'react-icons/ri';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@app/ui/components/form';
import { Input } from '@app/ui/components/input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const TabName = [
    { value: 'events', title: 'All Events' },
    { value: 'teams', title: 'Members' },
    { value: 'settings', title: 'Settings' },
];

const orgValidator = yup.object().shape({
    orgName: yup.string().required(),
    slug: yup.string().required(),
});

type IOrgVal = yup.InferType<typeof orgValidator>;

const Org: NextPageWithLayout = () => {
    const [activeTab, setTab] = useState('events');
    const [inviteLink, setInviteLink] = useState('');
    const [isOpen, toggleOpen] = useToggle();
    const { canDeleteOrg } = useRoles();
    const { data, isLoading } = useOrgInfo(activeTab === 'settings');
    const form = useForm<IOrgVal>({
        defaultValues: {
            orgName: data?.data.name,
            slug: data?.data.slug,
        },
    });

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
                    className="flex justify-end items-center flex-col gap-3"
                >
                    {isLoading && (
                        <div className="h-[300px]  flex items-center justify-center">
                            <RiLoaderFill className="animate-spin h-5 w-5" />
                        </div>
                    )}
                    {data && (
                        <div className="flex gap-4 py-4 w-full">
                            <Form {...form}>
                                <form className="border-red-400 w-full flex flex-col items-center">
                                    <FormField
                                        control={form.control}
                                        name="orgName"
                                        render={({ field }) => (
                                            <FormItem className="items-center border-2 border-gray-300 p-5 rounded-md w-full max-w-2xl">
                                                <FormLabel>Org Name</FormLabel>
                                                <FormDescription>
                                                    Pleae enter a org name you are comfortable with
                                                    bieng public
                                                </FormDescription>

                                                <FormControl>
                                                    <Input
                                                        placeholder={data.data.name}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="slug"
                                        render={({ field }) => (
                                            <FormItem className="items-center mt-5 border-2  border-gray-300 p-5 rounded-md w-full max-w-2xl">
                                                <FormLabel>Org URL</FormLabel>
                                                <FormDescription>
                                                    Pleae enter a valid URL ,this URL can be
                                                    acccessible by anyone
                                                </FormDescription>
                                                <FormControl>
                                                    <Input
                                                        placeholder={data.data.slug}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        </div>
                    )}
                    <LeaveOrg />
                    {canDeleteOrg && <DeleteOrg />}
                </TabsContent>
            </Tabs>
        </div>
    );
};

Org.Layout = HomeLayout;
Org.RequireAuth = true;

export default Org;
