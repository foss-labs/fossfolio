import { NextPageWithLayout } from 'next';
import { GoOrganization } from 'react-icons/go';
import { HomeLayout } from '@app/layout';
import { Button } from '@app/components/ui/Button';
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
            <div className="flex items-center gap-y-2 flex-wrap justify-between">
                <h4 className="text-xl font-semibold md:text-[40px]">
                    {user?.displayName.split(' ')[0]}&apos;s organisations
                </h4>
                <div className="flex md:w-auto justify-end w-full">
                    <Button onClick={setOpen.on}>New Organisation</Button>
                </div>
            </div>
            <div className="flex justify-center md:justify-start flex-wrap mt-10 gap-5">
                {isLoading ? (
                    <div className="flex flex-col flex-wrap gap-5 md:flex-row">
                        <OrgLoader />
                    </div>
                ) : (
                    <>
                        <div
                            className="w-[300px] h-[150px] border-2 group p-3 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition flex justify-center items-center border-dotted flex-col hover:cursor-pointer"
                            onClick={setOpen.on}
                        >
                            <div className="flex flex-col items-center group-hover:scale-110 transition justify-center gap-2">
                                <GoOrganization className="border-black border-2 rounded-full text-3xl p-1" />
                                Create a new organisation
                            </div>
                        </div>
                        {data?.data.map((el) => (
                            <OrgCard
                                key={el.organization.id}
                                role={el.role}
                                name={el.organization.name}
                                id={el.organization.id}
                                events={el.organization._count.events}
                                members={el.organization._count.members}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

Index.Layout = HomeLayout;
Index.RequireAuth = true;

export default Index;
