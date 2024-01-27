import { useRouter } from 'next/router';
import { Button } from '@app/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@app/ui/components/dialog';
import { apiHandler } from '@app/config';
import { toast } from 'sonner';

type IModal = {
    isOpen: boolean;
    onClose: () => void;
    MemberName: string;
    MemberId: string;
};

export const RemoveMemberModal = ({ isOpen, onClose, MemberName, MemberId }: IModal) => {
    const router = useRouter();

    const handleRemoveClick = async () => {
        try {
            const { data } = await apiHandler.patch('/org/member/remove', {
                data: { organizationId: router.query?.id, memberId: MemberId },
            });
            if (!data.ok) {
                throw new Error();
            }
            onClose();
            toast.success('Team member has been removed');
        } catch {
            toast.error('could not remove team member');
        } finally {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[325px] md:w-auto ">
                <DialogHeader>
                    Remove Team Member
                    <DialogDescription className="mt-3">
                        Are you sure you want to remove {MemberName}?
                        <div className="flex justify-end space-x-2 mt-5">
                            <Button
                                className="text-[black] bg-[#F9F5FF] hover:bg-emerald-50 border-[1.4px]"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-[red]  border-1.4 hover:bg-[#ff0000c2]"
                                onClick={handleRemoveClick}
                            >
                                Remove
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
