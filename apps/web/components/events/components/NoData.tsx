import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

import Empty from '@app/public/lottie/empty.json';

export const NoData = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Empty,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    return (
        <div className="h-[90vh] w-full flex justify-center items-center">
            {typeof window !== undefined && (
                <Lottie options={defaultOptions} height={400} width={400} />
            )}
        </div>
    );
};
