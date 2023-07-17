import React from 'react';
import { Modal, ModalOverlay, ModalContent, Spinner } from '@chakra-ui/react';

export const PageLoader = ({ isOpen }: IModal) => (
    <Modal isOpen={isOpen} onClose={() => false}>
        <ModalOverlay />
        <ModalContent
            background="transparent"
            boxShadow="none"
            height="70vh"
            justifyContent="center"
            alignItems="center"
        >
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        </ModalContent>
    </Modal>
);

type IModal = {
    isOpen: boolean;
};
