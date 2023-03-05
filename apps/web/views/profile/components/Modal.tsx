import {
    Button,
    FormControl,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Flex,
    FormErrorMessage,
    FormLabel,
    InputGroup,
    VStack,
    InputRightAddon,
} from '@chakra-ui/react';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { regEvent } from '@app/validators';

interface Prop {
    isOpen: boolean;
    onClose: () => void;
}

type Event = InferType<typeof regEvent>;

export const RegisterHack = ({ isOpen, onClose }: Prop) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Event>({
        resolver: yupResolver(regEvent),
    });
    const { fields, append, remove } = useFieldArray({
        control,
        // @ts-ignore
        name: 'members',
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
                            Create Team
                        </Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody rowGap="30px" display="flex" flexDir="column">
                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel fontSize="14px">Enter Team Name</FormLabel>
                            <Input type="string" placeholder="SlashZero" {...register('name')} />
                            <FormErrorMessage>Team Name should not be empty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.repo}>
                            <FormLabel fontSize="14px">Repository</FormLabel>
                            <Input
                                type="string"
                                placeholder="https://github.com/fossfolio/fossfolio"
                                {...register('repo')}
                            />
                            <FormErrorMessage>Enter a Valid Repo</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.lead}>
                            <FormLabel fontSize="14px">Enter your Email ID</FormLabel>
                            <Input
                                type="string"
                                placeholder="example@gmail.com"
                                {...register('lead')}
                            />
                            <FormErrorMessage>Enter a Valid Email</FormErrorMessage>
                        </FormControl>
                        <VStack>
                            <FormControl {...register('members')}>
                                <FormLabel color="white">Team Members</FormLabel>
                                {fields.map((member: any, index: number) => (
                                    <Controller
                                        name={`members.${index}`}
                                        key={member.id}
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <FormLabel fontSize="14px">
                                                    Enter your Team mate Email ID
                                                </FormLabel>
                                                <InputGroup
                                                    key={member[0]}
                                                    width="100%"
                                                    marginBottom="20px"
                                                >
                                                    <Input
                                                        ref={field.ref}
                                                        placeholder="Email ID"
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                        name={`members.${index}.value`}
                                                        value={field.value as string}
                                                    />
                                                    <InputRightAddon
                                                        onClick={() => remove(index)}
                                                        _hover={{ cursor: 'pointer' }}
                                                    >
                                                        Remove
                                                    </InputRightAddon>
                                                </InputGroup>
                                            </>
                                        )}
                                    />
                                ))}
                                <FormErrorMessage>Enter a Valid Email</FormErrorMessage>
                            </FormControl>

                            {fields.length < 3 && (
                                <Button
                                    colorScheme="purple"
                                    fontSize="14px"
                                    onClick={() => {
                                        append('');
                                    }}
                                >
                                    ADD Team Member
                                </Button>
                            )}
                        </VStack>
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
