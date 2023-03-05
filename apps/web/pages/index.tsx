import { HomeLayout } from '@app/layout';
import { Box, Button, Center, Flex, Heading, HStack, Image } from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
    <Flex h="90vh" flexDir="row" justifyContent="space-between" p="7">
        <Center>
            <Box w="400px" ml="60px">
                <Heading fontSize="48px">
                    Discover,host and manage hackathons all in one place.
                </Heading>
                <HStack mt="40px">
                    <Button colorScheme="purple">Find a Hackathon</Button>
                    <Button colorScheme="purple" variant="outline">
                        Host a Hackathon
                    </Button>
                </HStack>
            </Box>
        </Center>
        <Center>
            <Image src="/main.png" />
        </Center>
    </Flex>
);

Home.getLayout = (page) => <HomeLayout>{page}</HomeLayout>;
export default Home;
