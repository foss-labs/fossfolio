import { DashLayout } from '@app/layout';
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    VStack,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { regEvent } from '@app/views/validators';
import { NextPageWithLayout } from 'next';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

type Eve = InferType<typeof regEvent>;

const Profile: NextPageWithLayout = () => {
    const userState = useSelector((state: any) => state.auth.user);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<Eve>({
        mode: 'onSubmit',
        resolver: yupResolver(regEvent),
    });

    useEffect(() => {
        if (userState) {
            setValue('email', userState?.payload.email);
            setValue('name', userState?.payload.full_name);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState]);

    const getUserInput: SubmitHandler<Eve> = (data) => {
        // eslint-disable-next-line no-console
        console.log(data);
    };
    return (
        <Flex p="6" flexDir="column">
            <Flex justifyContent="space-between">
                <form onSubmit={handleSubmit(getUserInput)}>
                    <VStack w="592px" spacing="40px" alignItems="center" mr="50px">
                        <Heading alignSelf="start" fontSize="38px">
                            Edit Your Profile
                        </Heading>
                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel fontSize="14px">Your name</FormLabel>
                            <Input type="string" placeholder="jhon doe" {...register('name')} />
                            <FormErrorMessage>name should not be empty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel fontSize="14px">Your Email</FormLabel>
                            <Input
                                type="string"
                                {...register('email')}
                                placeholder="jhondoe@hotmail.com"
                            />
                            <FormErrorMessage>Email should not be empty</FormErrorMessage>
                        </FormControl>
                        <Flex mt="20px" mb="20px" w="100%" justifyContent="space-between">
                            <Button colorScheme="blue" w="40%" variant="outline">
                                Cancel
                            </Button>
                            <Button colorScheme="purple" w="40%" type="submit">
                                Confirm
                            </Button>
                        </Flex>
                    </VStack>
                </form>
            </Flex>
        </Flex>
    );
};

Profile.Layout = DashLayout;
Profile.RequireAuth = true;

export default Profile;
