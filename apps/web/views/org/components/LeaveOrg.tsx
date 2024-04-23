import { Card, CardContent } from '@app/ui/components/card';
import { Button } from '@app/ui/components/button';
import { useToggle } from '@app/hooks';
import { LeaveModal } from './LeaveModal';
import { FormDescription } from '@app/ui/components/form';

export const LeaveOrg = () => {
    const [isOpen, triggerModal] = useToggle(false);
    return (
        <Card className="border border-[red] w-full max-w-2xl">
            <LeaveModal isOpen={isOpen} onClose={triggerModal.off} />
            <CardContent className="pt-6 ">
                <div className="space-y-2">
                    <p>Leave this Organization</p>
                    <p className="text-sm text-muted-foreground">
                        You are about to leave this organization. This action is irreversible. Are
                        you sure you want to leave?
                    </p>
                    <Button className="bg-[red] hover:bg-[#ff0000c2]" onClick={triggerModal.on}>
                        Leave Organization
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
