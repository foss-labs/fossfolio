import React, { useEffect, useRef } from 'react';
import { Child } from '@app/types';
import { MainNav } from './components/MainNav';

export const HomeLayout = ({ children }: Child) => {
    return (
        <>
            <MainNav />
            {children}
        </>
    );
};
