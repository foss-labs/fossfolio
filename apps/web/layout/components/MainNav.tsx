import { Button, Flex, Heading } from '@chakra-ui/react';

import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@app/hooks';
import { BsGithub } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';

export const MainNav = () => {
    const router = useRouter();
    const { login, isUserExist, logout } = useAuth();

    return (
        <Flex
            p="4"
            alignItems="center
    "
            justifyContent="space-between"
        >
            <Flex alignItems="center">
                {/* <Image src="/logo.svg" alt="fossfolio" width="150" height="150" /> */}
                <Heading fontSize="29px">FossFolio</Heading>
                <Flex
                    ml={{ sm: '0', md: '60px' }}
                    w={{ sm: 'none', md: '300px' }}
                    justifyContent="space-around"
                >
                    <Link href="/">
                        <Heading
                            as="nav"
                            fontSize="15px"
                            _hover={{ cursor: 'pointer' }}
                            color="#667085"
                            onClick={() => router.push('/')}
                        >
                            Home
                        </Heading>
                    </Link>
                    <Link href="/events">
                        <Heading
                            as="nav"
                            fontSize="15px"
                            _hover={{ cursor: 'pointer' }}
                            color="#667085"
                        >
                            Events
                        </Heading>
                    </Link>
                    <Link href="/dashboard">
                        <Heading
                            as="nav"
                            fontSize="15px"
                            _hover={{ cursor: 'pointer' }}
                            color="#667085"
                        >
                            Dashboard
                        </Heading>
                    </Link>
                    <Link href="/pricing">
                        <Heading
                            as="nav"
                            fontSize="15px"
                            _hover={{ cursor: 'pointer' }}
                            color="#667085"
                        >
                            Pricing
                        </Heading>
                    </Link>
                </Flex>
            </Flex>
            <Flex alignItems="center">
                {!isUserExist ? (
                    <Button
                        mr="30px"
                        as="nav"
                        fontSize="15px"
                        _hover={{ cursor: 'pointer' }}
                        color="#667085"
                        onClick={login}
                        colorScheme="purple"
                        variant="outline"
                        rightIcon={<BsGithub />}
                    >
                        Login
                    </Button>
                ) : (
                    <Button
                        mr="30px"
                        as="nav"
                        fontSize="15px"
                        _hover={{ cursor: 'pointer' }}
                        color="#667085"
                        onClick={logout}
                        colorScheme="purple"
                        variant="outline"
                        rightIcon={<AiOutlineLogout />}
                    >
                        Logout
                    </Button>
                )}
            </Flex>
        </Flex>
    );
};
