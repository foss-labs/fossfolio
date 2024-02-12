import { useLottie } from 'lottie-react';
import ComingSoo from '@app/public/lottie/coming.json';

export const ComingSoon = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: ComingSoo,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    const { View } = useLottie(defaultOptions);

    return (
        <div className="h-[90vh] w-full flex justify-center items-center">
            {typeof window !== undefined && <>{View}</>}
        </div>
    );
};
