import { MainNav } from '@app/layout/components/MainNav';
import { useLottie } from 'lottie-react';

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

    const { View } = useLottie(defaultOptions);
    return (
        <>
            <MainNav />
            <div className="h-[90vh] w-full flex justify-center items-center">
                {typeof window !== undefined && <>{View}</>}
            </div>
        </>
    );
};
