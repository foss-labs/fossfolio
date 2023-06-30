import { Flex, Heading, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiHome, FiUser } from 'react-icons/fi';

export const DashNav = () => {
    const router = useRouter();
    const [isEvent, setIsEvent] = useState(false);

    useEffect(() => {
        if (router.query.id) {
            setIsEvent(true);
        } else {
            setIsEvent(false);
        }
    }, [router.query.id]);
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            bg="#f9f5ff"
            w="220px"
            p="9"
            pt="64px"
            minH="100vh"
        >
            <Image src="/logo.svg" alt="LOGO" width="150" height="150" />

            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                mt="20px"
                rowGap="26px"
            >
                <Link href="/dashboard">
                    <Heading
                        fontWeight="500"
                        display="flex"
                        fontSize="15px"
                        color="#6941C6"
                        _hover={{ cursor: 'pointer', color: '#42307D' }}
                    >
                        <Icon as={FiHome} mr="9px" fontSize="16px" />
                        Dashboard
                    </Heading>
                </Link>
                {!isEvent && (
                    <Link href="/dashboard/profile">
                        <Heading
                            fontWeight="500"
                            display="flex"
                            fontSize="15px"
                            color="#6941C6"
                            _hover={{ cursor: 'pointer', color: '#42307D' }}
                        >
                            <Icon as={FiHome} mr="9px" fontSize="16px" />
                            My Profile
                        </Heading>
                    </Link>
                )}
                {isEvent && (
                    <Link href={`/dashboard/${router.query.id}/teams`}>
                        <Heading
                            alignSelf="flex-start"
                            fontWeight="500"
                            display="flex"
                            fontSize="15px"
                            color="#6941C6"
                            _hover={{ cursor: 'pointer', color: '#42307D' }}
                        >
                            <Icon as={FiUser} mr="9px" fontSize="16px" />
                            Teams
                        </Heading>
                    </Link>
                )}
                <Link href="/dashboard/tickets">
                    <Heading
                        alignSelf="flex-start"
                        fontWeight="500"
                        display="flex"
                        fontSize="15px"
                        color="#6941C6"
                        _hover={{ cursor: 'pointer', color: '#42307D' }}
                    >
                        <Icon as={FiUser} mr="9px" fontSize="16px" />
                        My Tickets
                    </Heading>
                </Link>
            </Flex>
            <Link href="/events">
                <Heading
                    fontSize="12px"
                    mt="64px"
                    _hover={{ cursor: 'pointer', color: '#6941C6' }}
                    color="#42307D"
                >
                    <Icon as={FiArrowLeft} mr="9px" />
                    back
                </Heading>
            </Link>
        </Flex>
    );
};
