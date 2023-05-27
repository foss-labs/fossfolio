import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from '@chakra-ui/react';
import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supaClient } from '@app/config/supabaseClient';
import { ThemeSupa } from '@supabase/auth-ui-shared';

type IModal = {
    isOpen: boolean;
    onClose: () => void;
};

export const AuthModal = ({ isOpen, onClose }: IModal) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader />
            <ModalCloseButton />
            <ModalBody>
                <Auth
                    supabaseClient={supaClient}
                    providers={['google', 'github']}
                    appearance={{ theme: ThemeSupa }}
                />
            </ModalBody>
        </ModalContent>
    </Modal>
);
