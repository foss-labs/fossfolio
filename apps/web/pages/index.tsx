import { HomeLayout } from '@app/layout';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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

const Head = ['Discover, host and manage Events, Hackathons all in one place.'];

const Home: NextPageWithLayout = () => {
    return (
        <div className="flex flex-col-reverse p-4 sm:justify-around md:flex-row space-between h-full">
            <div className="flex justify-center items-center">
                <div className="">
                    <motion.div
                        className="App"
                        initial="hidden"
                        animate="visible"
                        variants={container}
                    >
                        {Head.map((el, key) => (
                            <AnimatedCharacters text={el} key={key + 5} />
                        ))}
                    </motion.div>
                    <div className="flex gap-4 mt-3">
                        <Button className="bg-[#7F56D9] px-5 py-2 rounded-sm text-[white] hover:text-[#7F56D9] hover:bg-[#F9F5FF]  border-[1.4px] hover:border-[#7F56D9]">
                            <Link href="/events">Join Event</Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-[#F9F5FF] px-5 py-2 rounded-sm text-[#7F56D9] border-1 hover:text-[#7F56D9] hover:bg-[#F9F5FF]  border-[1.4px] hover:border-[#7F56D9]"
                        >
                            <Link href="/">Create Events</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <Image src="/main.png" width="800" alt="an event card image" height="800" />
            </div>
        </div>
    );
};

Home.Layout = HomeLayout;
Home.RequireAuth = false;
export default Home;
