/* eslint-disable react/no-array-index-key */
import { HomeLayout } from '@app/layout';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
            <div className="sm:w-[300px] md:w-[600px]">
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
                <div className="flex gap-4 mt-3">
                    <Button className="bg-[#7F56D9] px-5 py-2 rounded-sm text-white">
                        Join Event
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-[#F9F5FF] px-5 py-2 rounded-sm text-[#7F56D9] border-1"
                    >
                        Create Events
                    </Button>
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center">
            <Image src="/main.png" width="800" alt="an event card image" height="800" />
        </div>
    </div>
);

Home.Layout = HomeLayout;
Home.RequireAuth = false;
export default Home;
