import { HomeLayout } from "@app/layout";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AnimatedCharacters } from "@app/views/home";
import { NextPageWithLayout } from "next";
import { Button } from "@app/components/ui/Button";

const container = {
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};

const Head = ["Discover, host and manage Events, Hackathons all in one place."];

const Home: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col-reverse p-4 sm:justify-around md:flex-row space-between h-full">
      <div className="flex justify-center flex-col">
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
        <div className="flex gap-4 mt-3 ">
          <Button>
            <Link href="/events">Join Event</Link>
          </Button>
          <Button variant="outline" className="rounded-sm">
            <Link href="/org">Create Events</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Image
          src="/main.png"
          width="800"
          alt="an event card image"
          height="800"
        />
      </div>
    </div>
  );
};

Home.Layout = HomeLayout;
Home.RequireAuth = false;
export default Home;
