import React from 'react';
import { Child } from '@app/types';
import { MainNav } from './components/MainNav';

export const HomeLayout = ({ children }: Child) => (
    <>
        <MainNav />
        {children}
    </>
);
