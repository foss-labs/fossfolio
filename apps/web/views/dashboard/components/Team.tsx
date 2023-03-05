import { Avatar, Flex, Heading, VStack } from '@chakra-ui/react';
import React from 'react';

interface User {
    dp: string;
    name: string;
    email: string;
}

interface Data {
    name: string;
    users: User[];
}

export const Team = ({ name, users }: Data) => (
    <VStack bg="#f9f5ff" h="300px" w="250px" borderRadius="lg" p="6" boxShadow="sm">
        <Flex flexDirection="column" mt="12px" alignSelf="flex-start">
            <Heading fontSize="12px" fontWeight="400">
                Team
            </Heading>
            <Heading fontSize="18px" fontWeight="700" lineHeight="28px">
                {name}
            </Heading>
        </Flex>
        <VStack alignSelf="flex-start" spacing="24px" mt="50px">
            {users.map((el) => (
                <Flex columnGap="4px">
                    <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                        w="32px"
                        h="32px"
                    />
                    <VStack alignItems="center" ml="10px" spacing={0}>
                        <Heading
                            fontSize="14px"
                            alignSelf="start"
                            fontWeight="600"
                            color="rgba(52, 64, 84, 1)"
                        >
                            {el.name}
                        </Heading>
                        <Heading fontSize="12px" color="rgba(102, 112, 133, 1)" fontWeight="400">
                            {el.email}
                        </Heading>
                    </VStack>
                </Flex>
            ))}
        </VStack>
    </VStack>
);
