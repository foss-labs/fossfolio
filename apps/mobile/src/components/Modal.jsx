import {
    Button,
    ButtonText,
    Center,
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@gluestack-ui/themed';
import { X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';

export function MoreInfo() {
    const [showModal, setShowModal] = useState(false);
    const ref = React.useRef(null);
    return (
        <Center h={300}>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
                finalFocusRef={ref}
            >
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <Text size="lg">Engage with Modals</Text>
                        <ModalCloseButton>
                            <X />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <WebView
                            source={{
                                uri: 'http://localhost:3000/events',
                            }}
                            style={{ flex: 1 }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            size="sm"
                            action="positive"
                            borderWidth="$0"
                            onPress={() => {
                                setShowModal(false);
                            }}
                        >
                            <ButtonText>Close</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>
    );
}
