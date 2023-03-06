import { Button, Flex } from '@chakra-ui/react';
import Image from 'next/image';
// import Link from 'next/link';
import React from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '@app/hooks';

export const MainNav = () => (
    // const router = useRouter();
    // const { login } = useAuth();

    <Flex
        p="4"
        alignItems="center
    "
        justifyContent="space-between"
        _hover={{ cursor: 'not-allowed' }}
    >
        <Flex alignItems="center">
            <Image src="/logo.svg" alt="fossfolio" width="150" height="150" />
            <Flex ml={{ sm: '0', md: '60px' }} w="300px" justifyContent="space-around">
                {/* <Link href="/">
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
                    <Heading
                        as="nav"
                        fontSize="15px"
                        _hover={{ cursor: 'pointer' }}
                        color="#667085"
                    >
                        Events
                        <Link href="/events">Events</Link>
                    </Heading>
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
                    </Link> */}
            </Flex>
        </Flex>
        <Flex alignItems="center">
            {/* <Button
                mr="30px"
                as="nav"
                fontSize="15px"
                _hover={{ cursor: 'pointer' }}
                color="#667085"
                // onClick={login}
                colorScheme="purple"
                variant="outline"
            >
                Login
            </Button> */}
            <Button colorScheme="purple" _hover={{ cursor: 'not-allowed' }}>
                Coming soon
            </Button>
        </Flex>
    </Flex>
);
