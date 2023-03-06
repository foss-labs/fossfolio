import { Button, Center, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import { HomeLayout } from '@app/layout';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'next';

const Error: NextPageWithLayout = () => {
    const router = useRouter();
    return (
        <Center
            flexDirection="column"
            justifyContent="space-between"
            minH="90vh"
            p={{ base: '20px', sm: '30px', md: '74px' }}
            pt={{ base: '40px', md: '50px' }}
        >
            <Image src="/404.svg" height="400" width="300" alt="A 404 IMAGE" />
            <Heading textAlign="center" color="#407BFF" size="2xl">
                Looks Like You&apos;re Lost
            </Heading>
            <Heading textAlign="center" size="md" fontWeight="300" mt="20px">
                Here&apos;s is your way back to home
            </Heading>
            <Flex justifyContent="center" mt="10px">
                <Button
                    variant="outline"
                    mr="10px"
                    outline="1px solid #407BFF"
                    onClick={() => router.push('/')}
                >
                    Home
                </Button>
            </Flex>
        </Center>
    );
};

Error.Layout = HomeLayout;

export default Error;
