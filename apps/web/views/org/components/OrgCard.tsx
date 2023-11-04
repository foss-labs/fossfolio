import { useAuth } from '@app/hooks';
import { Role, Roles } from '@app/types';
import { useRouter } from 'next/router';
import React from 'react';
import { BsChevronRight } from 'react-icons/bs';

type Prop = {
    name: string;
    id: string;
    role: Roles;
};

export const OrgCard = ({ name, id, role }: Prop) => {
    const router = useRouter();
    const { setRole } = useAuth();

    const goToOrg = () => {
        setRole(role);
        router.push(`/org/${id}`);
    };

    return (
        <div
            onClick={goToOrg}
            className="flex group justify-between w-[300px] h-[150px] border-solid border-2 p-3 border-gray-400 rounded-sm b hover:cursor-pointer"
        >
            {name}
            <BsChevronRight className="group-hover:translate-x-2 duration-100" />
        </div>
    );
};
