import { NextPageWithLayout } from 'next';
import React from 'react';
import { HomeLayout } from '@app/layout';
import { Button } from '@app/ui/components/button';
import { Separator } from '@app/ui/components/separator';
import { OrgCard, NewOrgDialog } from '@app/views/org';
import { useAuth, useToggle } from '@app/hooks';
import { useOrgs } from '@app/hooks/api/org';
import { Skeleton } from '@app/ui/components/skeleton';
import { useUser } from '@app/hooks/api/Auth';

const Index: NextPageWithLayout = () => {
    const [isOpen, setOpen] = useToggle(false);
    const { data, isLoading } = useOrgs();
    const { user } = useAuth()
    return (
        <div className="p-[20px]">
            <Separator className="mb-5" />
            <NewOrgDialog isOpen={isOpen} onClose={setOpen.off} />
            <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold md:text-[40px]">{user?.displayName.split(" ")[0]}&apos;s organisations</h4>
                <Button
                    onClick={setOpen.on}
                    className="bg-[#7F56D9] px-3 py-2 rounded-md text-[white] hover:text-[#7F56D9] hover:bg-[#F9F5FF]  border-[1.4px] hover:border-[#7F56D9]"
                >
                    New Organisation
                </Button>
            </div>
            <div className="flex flex-wrap mt-10 gap-5 justify-around lg:justify-between">
                {isLoading ? (
                    <div className='flex flex-col flex-wrap gap-5 md:flex-row'>
                        <Skeleton className=" w-[300px] h-[150px] border-solid border-2 border-sky-500" />
                        <Skeleton className=" w-[300px] h-[150px] border-solid border-2 border-sky-500" />
                        <Skeleton className=" w-[300px] h-[150px] border-solid border-2 border-sky-500" />
                        <Skeleton className=" w-[300px] h-[150px] border-solid border-2 border-sky-500" />
                        <Skeleton className=" w-[300px] h-[150px] border-solid border-2 border-sky-500" />
                        <Skeleton className=" w-[300px] h-[150px] border-solid border-2 border-sky-500" />
                        <Skeleton className=" w-[300px] h-[150px] border-solid border-2 border-sky-500" />
                        <Skeleton className=" w-[300px] h-[150px] border-solid border-2 border-sky-500" />
                        <Skeleton className=" w-[300px] h-[150px] border-solid border-2 border-sky-500" />
                    </div>
                ) : (
                    data?.map((el) => <OrgCard name={el.organization.name} id={el.organization.id} />)
                )}
            </div>
        </div>
    );
};

Index.Layout = HomeLayout;
export default Index;
