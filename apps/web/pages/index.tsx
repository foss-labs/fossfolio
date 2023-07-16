/* eslint-disable react/no-array-index-key */
import { HomeLayout } from '@app/layout';
import { Box, Center, Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AnimatedCharacters } from '@app/views/home';
import { NextPageWithLayout } from 'next';
import { Button } from '@app/ui/components/button';

const container = {
    visible: {
        transition: {
            staggerChildren: 0.025,
        },
    },
};

const Head = ['Discover,host and manage Events,Hackathons all in one place.'];

const Home: NextPageWithLayout = () => (
    <div className="flex min-h-[90vh] p-7 sm:justify-around md:row space-between">
        <div className="flex justify-center items-center">
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
                <div className="flex gap-4">
                    <Button className="bg-grey-900">Join Event</Button>
                    <Button variant="outline">Create Events</Button>
                </div>
            </Box>
        </div>
        <Center>
            <Image src="/main.png" width="800px" />
        </Center>
    </div>
);

Home.Layout = HomeLayout;
Home.RequireAuth = false;
export default Home;
