import { Button, Flex, Heading, useDisclosure, forwardRef } from '@chakra-ui/react';
import React, { useImperativeHandle } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiOutlineLogout } from 'react-icons/ai';
import { AuthModal} from "../AuthModal"


export const MainNav = forwardRef((_props, ref) => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();


    const login = () => {
        onOpen();
    };


    useImperativeHandle(ref, () => ({
        redirectLogin() {
            login();
        },
    }));

    return (
        <Flex
            p="4"
            alignItems="center
    "
            justifyContent="space-between"
        >
            <Flex alignItems="center">
                <AuthModal isOpen={isOpen} onClose={onClose} />
                <Heading fontSize="29px">FossFolio</Heading>
                <Flex
                    ml={{ sm: '0', md: '60px' }}
                    w={{ sm: 'none', md: '300px' }}
                    justifyContent="space-around"
                >
                    <Link href="/">
                        <Heading
                            as="nav"
                            fontSize="15px"
                            _hover={{ cursor: 'pointer' }}
                            color="#667085"
                            onClick={() => router.push('/')}
                        >
                            Home
                        </Heading>
                    </Link>
                    <Link href="/events">
                        <Heading
                            as="nav"
                            fontSize="15px"
                            _hover={{ cursor: 'pointer' }}
                            color="#667085"
                        >
                            Events
                        </Heading>
                    </Link>
                    <Link href="/dashboard">
                        <Heading
                            as="nav"
                            fontSize="15px"
                            _hover={{ cursor: 'pointer' }}
                            color="#667085"
                        >
                            Dashboard
                        </Heading>
                    </Link>
                   
                </Flex>
            </Flex>
            <Flex alignItems="center">
                {/* {authState ? (
                    <Button
                        mr="30px"
                        fontSize="15px"
                        _hover={{ cursor: 'pointer' }}
                        color="#667085"
                        colorScheme="purple"
                        variant="outline"
                        rightIcon={<BsGithub />}
                        onClick={async () => {
                            await logout();
                        }}
                    >
                        Logout
                    </Button>
                ) : ( */}
                    <Button
                        mr="30px"
                        fontSize="15px"
                        _hover={{ cursor: 'pointer' }}
                        color="#667085"
                        colorScheme="purple"
                        variant="outline"
                        rightIcon={<AiOutlineLogout />}
                        onClick={async () => {
                            await login();
                        }}
                    >
                        Login
                    </Button>
                {/* )} */}
            </Flex>
        </Flex>
    );
});
