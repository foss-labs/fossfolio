import { useRouter } from 'next/router';
import React from 'react';
import { BsChevronRight } from 'react-icons/bs';

type Prop = {
    name: string;
    id: string
};

export const OrgCard = ({ name, id }: Prop) => {
    const router = useRouter()
    return (
        <div onClick={() => router.push(`/org/${id}`)} className="flex group justify-between w-[300px] h-[150px] border-solid border-2 border-sky-500 p-6 rounded-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {name}
            <BsChevronRight className="group-hover:translate-x-2 duration-100" />
        </div>
    );
};
