import React, { forwardRef, useImperativeHandle } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiOutlineLogout } from 'react-icons/ai';
import { AuthModal } from '../AuthModal';
import { useToggle } from '@app/hooks';
import { Button } from '@app/ui/components/button';

// eslint-disable-next-line react/display-name
export const MainNav = forwardRef((_props, ref) => {
    const router = useRouter();
    const [isOpen, triggerModal] = useToggle(false);

    const login = () => {
        triggerModal.on();
    };

    useImperativeHandle(ref, () => ({
        redirectLogin() {
            login();
        },
    }));

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
});
