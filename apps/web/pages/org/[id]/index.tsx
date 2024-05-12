import { useEffect, useState } from 'react';
import { NextPageWithLayout } from 'next';
import { HomeLayout } from '@app/layout';
import { Members } from '@app/components/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/ui/components/tabs';
import { Events, DeleteOrg, LeaveOrg, InviteModal } from '@app/views/org';
import { useRoles, useToggle } from '@app/hooks';
import { useOrgInfo } from '@app/hooks/api/org';
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
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '@app/components/ui/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { apiHandler } from '@app/config';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { Loader } from '@app/components/preloaders';

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
    const { canDeleteOrg, canEditOrg } = useRoles();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (router.isReady) {
            router.replace({
                query: {
                    ...router.query,
                    tab: activeTab,
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    // api is only called when tab becomes settings
    const { data, isLoading } = useOrgInfo(activeTab === 'settings');
    const form = useForm<IOrgVal>({
        defaultValues: {
            orgName: data?.data.name,
            slug: data?.data.slug,
        },
        resolver: yupResolver(orgValidator),
    });

    useEffect(() => {
        if (data) {
            form.setValue('orgName', data?.data.name as string);
            form.setValue('slug', data?.data.slug as string);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleOrgUpdate: SubmitHandler<IOrgVal> = async (changes) => {
        // handle update with api call
        try {
            await apiHandler.patch('/org/update', {
                organizationId: id,
                name: changes.orgName,
                slug: changes.slug,
            });
            toast.success('Org was updated successfully');
        } catch {
            toast.error('Couldnt update org');
        }
    };

    return (
        <div className="mt-4 p-4 h-[92vh]">
            <Tabs
                value={activeTab}
                defaultValue={activeTab}
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
                    className="flex md:flex-row flex-wrap gap-5 sm:justify-center"
                >
                    <Events />
                </TabsContent>
                <TabsContent value="teams">
                    <Members setLink={setInviteLink} onInviteModal={toggleOpen.on} />
                    <InviteModal isOpen={isOpen} onClose={toggleOpen.off} link={inviteLink} />
                </TabsContent>
                <TabsContent
                    value="settings"
                    className="flex justify-end items-center pb-3 flex-col gap-3"
                >
                    {isLoading && <Loader />}
                    {data && (
                        <div className="flex gap-4 py-4 w-full">
                            <Form {...form}>
                                <form
                                    className="border-red-400 w-full flex flex-col items-center"
                                    onSubmit={form.handleSubmit(handleOrgUpdate)}
                                >
                                    <FormField
                                        control={form.control}
                                        name="orgName"
                                        render={({ field }) => (
                                            <FormItem
                                                disa
                                                className="border border-gray-200 p-5 rounded-md w-full max-w-2xl"
                                            >
                                                <FormLabel className="mb-1">
                                                    Organization Name
                                                </FormLabel>
                                                <FormDescription>
                                                    Pleae enter a Organization name you are
                                                    comfortable with being public
                                                </FormDescription>

                                                <FormControl>
                                                    <Input
                                                        disabled={!canEditOrg}
                                                        placeholder={data.data.name}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                                <div className="flex w-full max-w-2xl justify-end">
                                                    <Button
                                                        disabled={!canEditOrg}
                                                        className="p-3 mt-3"
                                                        type="submit"
                                                    >
                                                        Update
                                                    </Button>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="slug"
                                        render={({ field }) => (
                                            <FormItem className="mt-5 border  border-gray-200 p-5 rounded-md w-full max-w-2xl">
                                                <FormLabel className="mb-1">
                                                    Organization Slug
                                                </FormLabel>
                                                <FormDescription>
                                                    Pleae enter a valid Slug. The slug can be used
                                                    to visit your organization page
                                                </FormDescription>
                                                <FormControl>
                                                    <Input
                                                        disabled={!canEditOrg}
                                                        placeholder={data.data.slug}
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                                <div className="flex w-full max-w-2xl justify-end">
                                                    <Button
                                                        disabled={!canEditOrg}
                                                        className="p-3 mt-3"
                                                        type="submit"
                                                    >
                                                        Update
                                                    </Button>
                                                </div>
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
