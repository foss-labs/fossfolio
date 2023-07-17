import { HStack, Flex, Icon, Image, VStack, Text, Badge } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/router';

export const Event = () => {
    const router = useRouter();
    return (
        <VStack
            boxShadow="0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)"
            borderRadius="12px"
            width="280px"
            background="#FCFCFD"
            shadow="md"
            onClick={() => router.push('/dashboard/1')}
            _hover={{ cursor: 'pointer' }}
        >
            <Image src="/placeholder.png" borderTopRadius="12px" />
            <VStack width="100%" paddingInline="8px">
                <HStack width="100%" justifyContent="space-between">
                    <Text lineHeight="28px" fontSize="18px" fontWeight="600">
                        FOSSHack
                    </Text>
                    <Badge
                        textTransform="capitalize"
                        padding="6px"
                        borderRadius="18px"
                        backgroundColor="#F9F5FF"
                        color="#6941C6"
                    >
                        Ongoing
                    </Badge>
                </HStack>
                <Flex width="100%" alignItems="center">
                    <Text
                        fontWeight="400"
                        fontSize="13px"
                        style={{
                            marginTop: '0px',
                        }}
                    >
                        11 Dec 2020
                        <Icon as={FiArrowRight} marginInline="4px" />
                        13 Dec 2020
                    </Text>
                </Flex>
                <Flex flexWrap="wrap" width="100%" columnGap="5px" rowGap="5px">
                    <Badge
                        textTransform="capitalize"
                        backgroundColor="#F2F4F7"
                        textColor="#344054"
                        padding="3px"
                        borderRadius="18px"
                    >
                        45 Teams
                    </Badge>
                    <Badge
                        textTransform="capitalize"
                        backgroundColor="#F2F4F7"
                        textColor="#344054"
                        padding="3px"
                        borderRadius="18px"
                    >
                        $684 Revenue
                    </Badge>
                </Flex>
            </VStack>
        </VStack>
    );
};
