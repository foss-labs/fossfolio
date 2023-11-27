import { MainNav } from '@app/layout/components/MainNav';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

import Flight from '@app/public/lottie/flight.json';

export const PageLoader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Flight,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    return (
        <>
            <MainNav />
            <div className="h-[90vh] w-full flex justify-center items-center">
                {typeof window !== undefined && (
                    <Lottie options={defaultOptions} height={400} width={400} />
                )}
            </div>
        </>
    );
};
