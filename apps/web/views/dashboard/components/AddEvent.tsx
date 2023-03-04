import { Center, Heading, Icon, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { CreateHackModal } from './Modal';

export const AddEvent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <CreateHackModal isOpen={isOpen} onClose={onClose} />
            <Center
                border="1px dotted rgba(208, 213, 221, 1)"
                w="300px"
                h="auto"
                borderWidth="3px"
                borderRadius="2xl"
                flexDirection="column"
                position="relative"
                _hover={{ cursor: 'pointer', bg: '#f2f4f7' }}
                onClick={() => onOpen()}
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
        </>
    );
};
