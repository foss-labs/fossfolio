import React from 'react';
import { DashLayout } from '@app/layout';
import {
    Badge,
    Box,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Icon,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { NextPageWithLayout } from 'next';

const Page: NextPageWithLayout = () => (
    <Flex flexDir="column" p="70px">
        <Flex flexDir="row" justifyContent="space-between">
            <Box>
                <Heading alignSelf="flex-start" fontSize="15px">
                    FOSS HACK 3.0
                </Heading>
                <Heading>Registred Teams</Heading>
            </Box>
            <Box>
                <Badge p="4" bg=" #E9D7FE" borderRadius="md">
                    Teams 69 Teams
                </Badge>
                <Badge p="4" bg=" #E9D7FE" ml="20px" borderRadius="md">
                    Particpinets 200 Peoples
                </Badge>
            </Box>
        </Flex>
        <InputGroup w="40%" ml="1px" mt="30px">
            <Input pr="4.5rem" type="text" placeholder="Find Your Team" />
            <InputRightElement width="4.5rem">
                <Icon as={FiSearch} />
            </InputRightElement>
        </InputGroup>
    </Flex>
);

Page.Layout = DashLayout;
Page.RequireAuth = true;
export default Page;
