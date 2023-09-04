import React from 'react'
import Lottie from 'react-lottie';
import { MainNav } from '@app/layout/components/MainNav'
import Flight from "@app/public/lottie/flight.json"


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
            <div className='h-[90vh] w-full flex justify-center items-center'>
                <Lottie
                    options={defaultOptions}
                    height={400}
                    width={400} />
            </div>
        </>
    )
}
