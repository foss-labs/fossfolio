import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Flex,
    Image,
    Heading,
    Text,
    Button,
    VStack
} from '@chakra-ui/react';
import React from 'react';


type IModal = {
    isOpen: boolean;
    onClose: () => void;
};

export const AuthModal = ({ isOpen, onClose }: IModal) => (
    <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent minW="700px">
            <ModalBody>
                <Flex justifyContent="space-between">
                    <Flex flexDir="column" p="4" w="full">
                        <Heading>Welcome !</Heading>
                         <Text ml="20px">Sign in to continue</Text>
                         <VStack mt="40px" justifyContent="center">
                         <Button variant="outline" colorScheme='red'>Continue with Google</Button>
                         <Button variant="solid" colorScheme="facebook">Continue with Github</Button>
                         </VStack>
                    </Flex>
                   <Image src="/event.jpg" alt="a rave image" width="50%"/>
                </Flex>
            </ModalBody>
        </ModalContent>
    </Modal>
);
