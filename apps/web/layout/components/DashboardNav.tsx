import Link from 'next/link';
import React from 'react';
import { FiArrowLeft, FiHome, FiUser } from 'react-icons/fi';

export const DashNav = () => (
    <div className='flex flex-col items-center pt-31 min-h-full p-9'>
        <div className='flex flex-col items-center justify-center mt-5 gap-1.5'>
            <div className='font-medium flex text-lg hover:cursor-pointer'

            >
                <FiHome className='mr-2.1' />
                Event name
            </div>
            <div className='font-medium flex text-lg hover:cursor-pointer'

            >
                <FiUser className='9px text-md' />
                Teams
            </div>
        </div>
        <Link href="/dashboard">
            <div className='font-medium flex text-lg hover:cursor-pointer'>
                <FiArrowLeft className='mr-2 text-md' />
                Your Hackthons
            </div>
        </Link>
    </div>
)