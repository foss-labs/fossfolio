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
    FormErrorMessage,
} from '@chakra-ui/react';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EventValidator } from '@app/validators';
import { FileInput } from './File';

interface Prop {
    isOpen: boolean;
    onClose: () => void;
}

type Event = InferType<typeof EventValidator>;

export const CreateHackModal = ({ isOpen, onClose }: Prop) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Event>({
        mode: 'onSubmit',
        resolver: yupResolver(EventValidator),
    });

    const handleFormData: SubmitHandler<Event> = (data) => {
        console.log(data);
    };

    return (
        <Modal isOpen={isOpen} size="xl" onClose={onClose} scrollBehavior="outside">
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent>
                <form onSubmit={handleSubmit(handleFormData)}>
                    <ModalHeader>
                        <Heading as="h2" fontSize="30px">
                            Create a Hackathon
                        </Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody rowGap="30px" display="flex" flexDir="column">
                        <FormControl isInvalid={!!errors.title}>
                            <FormLabel fontSize="14px">Name of your Hackathon</FormLabel>
                            <Input
                                type="string"
                                placeholder="my hackathon"
                                {...register('title')}
                            />
                            <FormErrorMessage>title should not be empty</FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel fontSize="14px">Slug</FormLabel>
                            <Input type="string" placeholder="my hackathon" />
                            <FormHelperText>fossfolio/event/ragam</FormHelperText>
                            <FormErrorMessage>slug should not be empty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.startDate}>
                            <FormLabel fontSize="14px">Start Date</FormLabel>
                            <Input
                                type="date"
                                placeholder="my hackathon"
                                {...register('startDate')}
                            />
                            <FormErrorMessage>date should not be empty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.endDate}>
                            <FormLabel fontSize="14px">End date</FormLabel>
                            <Input
                                type="date"
                                placeholder="my hackathon"
                                {...register('endDate')}
                            />
                            <FormErrorMessage>date should not be empmty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.registrationEndDate}>
                            <FormLabel fontSize="14px">Registartion end Date</FormLabel>
                            <Input
                                type="date"
                                placeholder="my hackathon"
                                {...register('registrationEndDate')}
                            />
                            <FormErrorMessage>date should not be empty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.description}>
                            <FormLabel fontSize="14px">Description</FormLabel>
                            <Textarea
                                placeholder="Enter a description"
                                {...register('description')}
                            />
                            <FormErrorMessage>description should not be empty</FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel fontSize="14px">Your cover image</FormLabel>
                            <FileInput />
                            <FormErrorMessage>image should not be empmty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.website}>
                            <FormLabel fontSize="14px">Website</FormLabel>
                            <Input
                                type="string"
                                placeholder="mysite.com"
                                {...register('website')}
                            />
                            <FormErrorMessage>website should not be empty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.instgram}>
                            <FormLabel fontSize="14px">Instagram</FormLabel>
                            <Input
                                type="string"
                                placeholder="mysite.com"
                                {...register('instgram')}
                            />
                            <FormErrorMessage>url should not be empmty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.twitter}>
                            <FormLabel fontSize="14px">Twitter</FormLabel>
                            <Input
                                type="string"
                                placeholder="mysite.com"
                                {...register('twitter')}
                            />
                            <FormErrorMessage>url should not be empty</FormErrorMessage>
                        </FormControl>
                    </ModalBody>

                    <Flex justifyContent="space-around" mt="20px" mb="20px">
                        <Button
                            colorScheme="blue"
                            w="40%"
                            variant="outline"
                            onClick={() => onClose()}
                        >
                            Cancel
                        </Button>
                        <Button colorScheme="purple" w="40%" type="submit">
                            Confirm
                        </Button>
                    </Flex>
                </form>
            </ModalContent>
        </Modal>
    );
};
