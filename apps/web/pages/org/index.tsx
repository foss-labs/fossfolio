import { NextPageWithLayout } from 'next';
import React from 'react';
import { HomeLayout } from '@app/layout';
import { Button } from '@app/ui/components/button';
import { Separator } from '@app/ui/components/separator';
import { OrgCard, NewOrgDialog } from '@app/views/org';
import { useToggle } from '@app/hooks';

const Index: NextPageWithLayout = () => {
    const [isOpen, setOpen] = useToggle(false);
    return (
        <div className="p-[20px]">
            <Separator className="mb-5" />
            <NewOrgDialog isOpen={isOpen} onClose={setOpen.off} />
            <Button
                onClick={setOpen.on}
                className="bg-[#7F56D9] px-5 py-2 rounded-md text-[white] hover:text-[#7F56D9] hover:bg-[#F9F5FF]  border-[1.4px] hover:border-[#7F56D9]"
            >
                New Org
            </Button>
            <h4 className="text-[25px] text-start mt-6">Sreehari&apos;s org</h4>
            <div className="flex flex-wrap mt-3 gap-5 justify-around lg:justify-between">
                <OrgCard name="fossfolio" />
                <OrgCard name="foss-hack" />
                <OrgCard name="girls hack" />
                <OrgCard name="cusat hack" />
            </div>
        </div>
    );
};

Index.Layout = HomeLayout;
export default Index;
