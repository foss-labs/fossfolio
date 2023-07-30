import React from 'react';
import { BsChevronRight } from 'react-icons/bs';

type Prop = {
    name: string;
};

export const OrgCard = ({ name }: Prop) => {
    return (
        <div className="flex group justify-between w-[300px] h-[150px] border-solid border-2 border-sky-500 p-6 rounded-sm bg-[#e9ecef] hover:cursor-pointer hover:bg-[#dee2e6]">
            {name}
            <BsChevronRight className="group-hover:translate-x-2 duration-100" />
        </div>
    );
};
