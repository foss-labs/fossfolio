import React from 'react';
import { Card, CardContent } from '@app/ui/components/card';
import { Button } from '@app/ui/components/button';

export const DeleteOrg = () => {
    return (
        <Card className="border-2 border-[red] max-w-2xl">
            <CardContent className="pt-6 ">
                <div className="space-y-2">
                    <p>
                        Deleting the org will delete its all members and all the events associated
                        with the org
                    </p>
                    <Button className="bg-[red] hover:bg-[#ff0000c2]">Delete Org</Button>
                </div>
            </CardContent>
        </Card>
    );
};
