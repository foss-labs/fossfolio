import { HomeLayout } from '@app/layout';
import { Center, Heading } from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
    <Center h="90vh" flexDir="column">
        <Heading mr="200px">Never Miss a Hackathon Again!</Heading>
        <Heading ml="200px" mt="20px">
            Build for developer by Developers
        </Heading>
    </Center>
);

Home.getLayout = (page) => <HomeLayout>{page}</HomeLayout>;
export default Home;
