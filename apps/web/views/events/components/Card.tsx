import React from 'react';
import { Badge, Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useToggle } from '@app/hooks';

export const Card = () => {
    const [isOpen, changeOpenState] = useToggle(false);
    return (
        <Box
            borderRadius="md"
            _hover={{ cursor: 'pointer', shadow: 'xl' }}
            width="280px"
            mt="40px"
            shadow="sm"
            transition="0.4s"
            borderEndRadius="0px 12px 12px 0px"
            onClick={changeOpenState.on}
        >
            <Image
                src="/foss.png"
                alt="foss"
                width="280px"
                height="140px"
                objectFit="cover"
                borderRadius="12px 12px 0 0"
            />
            <Box>
                <Flex justifyContent="space-between" mt="16px" p="2">
                    <Heading fontSize="18px" fontWeight="600">
                        FOSS 2023
                    </Heading>
                    <Badge
                        color="rgba(105, 65, 198, 1)"
                        bg="#F9F5FF"
                        borderRadius="md"
                        fontSize="12px"
                        fontWeight="400"
                    >
                        Ongoing
                    </Badge>
                </Flex>
                <Text p="2" color="#6941C6">
                    11 Dec 2023 -{'>'} 15 Dec 2023
                </Text>
                <Flex p="2" flexDir="row" columnGap="15px" flexWrap="wrap" rowGap="10px" mt="10px">
                    <Badge
                        color="rgba(105, 65, 198, 1)"
                        bg="#F9F5FF"
                        borderRadius="md"
                        fontSize="16px"
                        fontWeight="400"
                        textTransform="unset"
                    >
                        Register Before 5 dec 2023
                    </Badge>
                    <Badge
                        color="rgba(105, 65, 198, 1)"
                        bg="#F9F5FF"
                        borderRadius="md"
                        fontSize="16px"
                        fontWeight="400"
                        textTransform="unset"
                    >
                        Price pool of $25000
                    </Badge>
                    <Badge
                        color="rgba(105, 65, 198, 1)"
                        bg="#F9F5FF"
                        borderRadius="md"
                        fontSize="16px"
                        fontWeight="400"
                        textTransform="unset"
                    >
                        OnLine
                    </Badge>
                </Flex>
            </Box>
        </Box>
    );
};
