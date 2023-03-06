/* eslint-disable react/no-array-index-key */
import { HomeLayout } from '@app/layout';
import { Box, Button, Center, Flex, HStack, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AnimatedCharacters } from '@app/views/home';
import { NextPageWithLayout } from './_app';

const container = {
    visible: {
        transition: {
            staggerChildren: 0.025,
        },
    },
};

const Head = ['Discover,host and manage hackathons all in one place.'];

const Home: NextPageWithLayout = () => (
    <Flex
        minH="90vh"
        flexDir={{ sm: 'column-reverse', md: 'row' }}
        justifyContent="space-between"
        p="7"
        flex="1"
    >
        <Center>
            <Box w="400px" ml="60px">
                <motion.div
                    className="App"
                    initial="hidden"
                    // animate="visible"
                    animate="visible"
                    variants={container}
                >
                    {Head.map((el) => (
                        <AnimatedCharacters text={el} />
                    ))}
                </motion.div>
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
