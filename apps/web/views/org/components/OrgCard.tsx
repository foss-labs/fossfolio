import { useAuth } from '@app/hooks';
import { Roles } from '@app/types';
import { useRouter } from 'next/router';
import { BsChevronRight } from 'react-icons/bs';
import { IoIosList, IoMdPeople } from 'react-icons/io';

type Prop = {
    name: string;
    id: string;
    role: Roles;
    events: number;
    members: number;
};

export const OrgCard = ({ name, id, role, members, events }: Prop) => {
    const router = useRouter();
    const { setRole } = useAuth();

    const goToOrg = () => {
        setRole(role);
        router.push(`/org/${id}`);
    };

    return (
        <div
            onClick={goToOrg}
            className="flex flex-col group justify-between w-[300px] h-[150px] border-solid border p-3 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition rounded-sm hover:cursor-pointer"
        >
            <div className="flex justify-between w-full">
                <h2 className="text-2xl font-bold capitalize">{name}</h2>
                <BsChevronRight className="text-lg" />
            </div>
            <div className="flex justify-between">
                <span className="flex items-center gap-2">
                    <IoIosList />
                    {events} Events
                </span>
                <span className="flex items-center gap-2">
                    <IoMdPeople />
                    {members} Members
                </span>
            </div>
        </div>
    );
};
