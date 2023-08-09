import { NextPageWithLayout } from 'next';
import React from 'react';
import { HomeLayout } from '@app/layout';
import { Button } from '@app/ui/components/button';
import { Separator } from '@app/ui/components/separator';
import { OrgCard, NewOrgDialog } from '@app/views/org';
import { useAuth, useToggle } from '@app/hooks';
import { useOrgs } from '@app/hooks/api/org';
import { OrgLoader } from '@app/components/preloaders';

const Index: NextPageWithLayout = () => {
    const [isOpen, setOpen] = useToggle(false);
    const { data, isLoading } = useOrgs();
    const { user } = useAuth();
    return (
        <div className="p-[20px]">
            <Separator className="mb-5" />
            <NewOrgDialog isOpen={isOpen} onClose={setOpen.off} />
            <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold md:text-[40px]">
                    {user?.displayName.split(' ')[0]}&apos;s organisations
                </h4>
                <Button
                    onClick={setOpen.on}
                    className="bg-[#7F56D9] px-3 py-2 rounded-md text-[white] hover:text-[#7F56D9] hover:bg-[#F9F5FF]  border-[1.4px] hover:border-[#7F56D9]"
                >
                    New Organisation
                </Button>
            </div>
            <div className="flex flex-wrap mt-10 gap-5 justify-around lg:justify-between">
                {isLoading ? (
                    <div className="flex flex-col flex-wrap gap-5 md:flex-row">
                        <OrgLoader />
                    </div>
                ) : data && data?.length > 0 ? (
                    data?.map((el) => (
                        <OrgCard name={el.organization.name} id={el.organization.id} />
                    ))
                ) : (
                    <div className="flex flex-col">
                        <h3>No Org Found </h3>
                        <Button
                            onClick={setOpen.on}
                            className="bg-[#7F56D9] px-3 py-2 rounded-md text-[white] hover:text-[#7F56D9] hover:bg-[#F9F5FF]  border-[1.4px] hover:border-[#7F56D9]"
                        >
                            New Organisation
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

Index.Layout = HomeLayout;
Index.RequireAuth = true;

export default Index;
