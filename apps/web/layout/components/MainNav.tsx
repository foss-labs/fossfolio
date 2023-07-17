import React, { useImperativeHandle } from 'react';
import Link from 'next/link';
import { AuthModal } from '../AuthModal';
import { useToggle } from '@app/hooks';
import { Button } from '@app/ui/components/button';
import { useRouter } from 'next/router';
export const MainNav = () => {
    const [isOpen, triggerModal] = useToggle(false);

    const router = useRouter();

    const login = () => {
        triggerModal.on();
    };

    return (
        <div className="flex justify-between items-center p-4 w-full">
            <div className="flex items-center justify-between">
                <h2 className=" text-[29px]">FossFolio</h2>
                <AuthModal isOpen={isOpen} onClose={triggerModal.off} />
                <div className="flex justify-around w-[300px]">
                    <Link href="/">
                        <h4 className="text-[15px] text-[#667085]" onClick={() => router.push('/')}>
                            Home
                        </h4>
                    </Link>
                    <Link href="/events">
                        <h4 className="text-[15px] text-[#667085]">Events</h4>
                    </Link>
                    <Link href="/dashboard">
                        <h4 className="text-[15px] text-[#667085]">Dashboard</h4>
                    </Link>
                </div>
            </div>
            <div className="flex items-center">
                {/* {authState ? (
                    <Button
                        mr="30px"
                        fontSize="15px"
                        _hover={{ cursor: 'pointer' }}
                        color="#667085"
                        colorScheme="purple"
                        variant="outline"
                        rightIcon={<BsGithub />}
                        onClick={async () => {
                            await logout();
                        }}
                    >
                        Logout
                    </Button>
                ) : ( */}
                <Button className="mr-[30px] text-[15px] text-[#667085]">Login</Button>
            </div>
        </div>
    );
};
