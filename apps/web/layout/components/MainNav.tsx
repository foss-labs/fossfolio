import { Button, Flex, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@app/hooks';

export const MainNav = () => {
    const router = useRouter();
    const { login } = useAuth();

    return (
        <Flex
            p="4"
            alignItems="center
    "
            justifyContent="space-between"
        >
            <Flex alignItems="center">
                <Image src="/logo.svg" alt="fossfolio" width="150" height="150" />
                <Flex ml="60px" w="300px" justifyContent="space-around">
                    <Heading
                        as="nav"
                        fontSize="15px"
                        _hover={{ cursor: 'pointer' }}
                        color="#667085"
                        onClick={() => router.push('/')}
                    >
                        Home
                    </Heading>
                    <Heading
                        as="nav"
                        fontSize="15px"
                        _hover={{ cursor: 'pointer' }}
                        color="#667085"
                    >
                        <Link href="/events">Events</Link>
                    </Heading>
                    <Heading
                        as="nav"
                        fontSize="15px"
                        _hover={{ cursor: 'pointer' }}
                        color="#667085"
                    >
                        <Link href="/dashboard">Dashboard</Link>
                    </Heading>
                    <Heading
                        as="nav"
                        fontSize="15px"
                        _hover={{ cursor: 'pointer' }}
                        color="#667085"
                    >
                        <Link href="/pricing">Pricing</Link>
                    </Heading>
                </Flex>
            </Flex>
            <Flex alignItems="center">
                <Button
                    mr="30px"
                    as="nav"
                    fontSize="15px"
                    _hover={{ cursor: 'pointer' }}
                    color="#667085"
                    onClick={login}
                    colorScheme="purple"
                    variant="outline"
                >
                    Login
                </Button>
                <Button colorScheme="purple">Create an event</Button>
            </Flex>
        </Flex>
    );
};
