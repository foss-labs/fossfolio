import { Button } from '@app/components/ui/Button';
import { useRoles } from '@app/hooks';
import { Card, CardContent } from '@app/ui/components/card';
import React from 'react';

interface DeleteEvent {
    deleteEvent: () => Promise<void>;
}

export const DeleteEvent = ({ deleteEvent }: DeleteEvent) => {
    const { canDeleteEvent } = useRoles();

    if (canDeleteEvent) {
        return (
            <Card className="border-2 border-[red] max-w-2xl">
                <CardContent className="pt-6 ">
                    <div className="space-y-2">
                        <p>Deleting the Events will delete its all data</p>
                        <Button className="!bg-[red] !hover:bg-[#ff0000c2]" onClick={deleteEvent}>
                            Delete Event
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return null;
};
