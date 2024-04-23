import { Card, CardContent } from '@app/ui/components/card';
import { Button } from '@app/ui/components/button';
import { useToggle } from '@app/hooks';
import { DeleteModal } from './DeleteModal';

export const DeleteOrg = () => {
    const [isOpen, triggerModal] = useToggle(false);
    return (
        <Card className="border border-[red] max-w-2xl">
            <DeleteModal isOpen={isOpen} onClose={triggerModal.off} />
            <CardContent className="pt-6 ">
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                        Deleting the organisation will delete its all members and all the events
                        associated with the organization
                    </p>
                    <Button className="bg-[red] hover:bg-[#ff0000c2]" onClick={triggerModal.on}>
                        Delete Organization
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
