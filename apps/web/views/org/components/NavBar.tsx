import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/ui/components/tabs';

export const NavBar = () => {
    return (
        <Tabs defaultValue="account" className="w-[900px] justify-between">
            <TabsList>
                <TabsTrigger value="General">General</TabsTrigger>
                <TabsTrigger value="Teams">Teams</TabsTrigger>
                <TabsTrigger value="General">General</TabsTrigger>
                <TabsTrigger value="Teams">Teams</TabsTrigger>
            </TabsList>
            <TabsContent value="General">Make changes to your account here.</TabsContent>
            <TabsContent value="Teams">Change your password here.</TabsContent>
        </Tabs>
    );
};
