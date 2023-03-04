import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Textarea,
    Flex,
} from '@chakra-ui/react';
import { FileInput } from './File';

interface Prop {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateHackModal = ({ isOpen, onClose }: Prop) => (
    <Modal isOpen={isOpen} size="xl" onClose={onClose} scrollBehavior="outside">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
            <ModalHeader>
                <Heading as="h2" fontSize="30px">
                    Create a Hackathon
                </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody rowGap="30px" display="flex" flexDir="column">
                <FormControl>
                    <FormLabel fontSize="14px">Name of your Hackathon</FormLabel>
                    <Input type="string" placeholder="my hackathon" />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="14px">Slug</FormLabel>
                    <Input type="string" placeholder="my hackathon" />
                    <FormHelperText>fossfolio/event/ragam</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="14px">Start Date</FormLabel>
                    <Input type="date" placeholder="my hackathon" />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="14px">End date</FormLabel>
                    <Input type="date" placeholder="my hackathon" />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="14px">Registartion end Date</FormLabel>
                    <Input type="date" placeholder="my hackathon" />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="14px">Description</FormLabel>
                    <Textarea placeholder="Enter a description" />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="14px">Your cover image</FormLabel>
                    <FileInput />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="14px">Website</FormLabel>
                    <Input type="string" placeholder="mysite.com" />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="14px">Instagram</FormLabel>
                    <Input type="string" placeholder="mysite.com" />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="14px">Twitter</FormLabel>
                    <Input type="string" placeholder="mysite.com" />
                </FormControl>
            </ModalBody>

            <Flex justifyContent="space-around" mt="20px" mb="20px">
                <Button colorScheme="blue" w="40%" variant="outline" onClick={() => onClose()}>
                    Cancel
                </Button>
                <Button colorScheme="purple" w="40%">
                    Confirm
                </Button>
            </Flex>
        </ModalContent>
    </Modal>
);
