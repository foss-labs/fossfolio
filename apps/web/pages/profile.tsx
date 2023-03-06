import { HomeLayout } from '@app/layout';
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
import { Card } from '@app/views/events';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { regEvent } from '@app/views/validators';
import { NextPageWithLayout } from 'next';

type Eve = InferType<typeof regEvent>;

const Profile: NextPageWithLayout = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Eve>({
        mode: 'onSubmit',
        resolver: yupResolver(regEvent),
    });

    const getUserInput: SubmitHandler<Eve> = (data) => {
        console.log(data);
    };
    return (
        <Flex p="6" flexDir="column">
            <Flex justifyContent="space-between">
                <Flex columnGap="25px" flexWrap="wrap" flexDir="column">
                    <Heading textAlign="start" fontSize="38px">
                        Your Registrations
                    </Heading>
                    <Flex columnGap="25px" flexWrap="wrap">
                        <Card />
                        <Card />
                    </Flex>
                </Flex>
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

Profile.Layout = HomeLayout;

export default Profile;
