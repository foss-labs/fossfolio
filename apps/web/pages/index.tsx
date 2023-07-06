/* eslint-disable react/no-array-index-key */
import { HomeLayout } from '@app/layout';
import { Box, Button, Center, Flex, HStack, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AnimatedCharacters } from '@app/views/home';
import { NextPageWithLayout } from 'next';

const container = {
    visible: {
        transition: {
            staggerChildren: 0.025,
        },
    },
};

const Head = ['Discover,host and manage Events,Hackathons all in one place.'];

const Home: NextPageWithLayout = () => (
    <Flex
        maxH="90vh"
        flexDir={{ base: 'column-reverse', md: 'row' }}
        justifyContent={{ base: 'space-around', md: 'space-between' }}
        p="7"
        flex="1"
    >
        <Center>
            <Box w={{ base: '300px', md: '600px' }}>
                <motion.div
                    className="App"
                    initial="hidden"
                    // animate="visible"
                    animate="visible"
                    variants={container}
                >
                    {Head.map((el, key) => (
                        <AnimatedCharacters text={el} key={key + 5} />
                    ))}
                </motion.div>
                <HStack mt="40px">
                    <Button colorScheme="purple">Join Event</Button>
                    <Button colorScheme="purple" variant="outline">
                        Create Events
                    </Button>
                </HStack>
            </Box>
        </Center>
        <Center>
            <Image src="/main.png" width="800px" />
        </Center>
    </Flex>
);

Home.Layout = HomeLayout;
Home.RequireAuth = false;
export default Home;
