import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

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
    return (
        <div className="h-[90vh] w-full flex justify-center items-center">
            {typeof window !== undefined && (
                <Lottie options={defaultOptions} height={400} width={800} />
            )}
        </div>
    );
};
