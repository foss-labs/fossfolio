import { Center, Heading, Icon } from '@chakra-ui/react';
import React from 'react';
import { FiPlus } from 'react-icons/fi';

export const AddEvent = () => (
    <Center
        border="1px dotted rgba(208, 213, 221, 1)"
        w="300px"
        h="auto"
        borderWidth="3px"
        borderRadius="2xl"
        flexDirection="column"
        position="relative"
        _hover={{ cursor: 'pointer', bg: '#f2f4f7' }}
    >
        <Icon
            as={FiPlus}
            fontSize="6xl"
            p="3"
            border="1px solid rgba(208, 213, 221, 1)"
            borderRadius="full"
            color="rgba(208, 213, 221, 1)"
        />
        <Heading size="sm" mt="140px" position="absolute" color="rgba(208, 213, 221, 1)">
            Create Your Hackathon
        </Heading>
    </Center>
);
