import { Flex, Heading, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { FiArrowLeft, FiHome, FiUser } from 'react-icons/fi';

export const DashNav = () => (
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
            <Heading
                fontWeight="500"
                display="flex"
                fontSize="15px"
                color="#6941C6"
                _hover={{ cursor: 'pointer', color: '#42307D' }}
            >
                <Icon as={FiHome} mr="9px" fontSize="16px" />
                DashBoard
            </Heading>
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
        </Flex>
        <Heading
            fontSize="12px"
            mt="64px"
            _hover={{ cursor: 'pointer', color: '#6941C6' }}
            color="#42307D"
        >
            <Icon as={FiArrowLeft} mr="9px" />
            Your Hackthons
        </Heading>
    </Flex>
);
