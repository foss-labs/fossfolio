import { useRouter } from 'next/router';
import { Button } from '@app/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@app/ui/components/dialog';
import { apiHandler } from '@app/config';
import { toast } from 'sonner';

type IModal = {
    isOpen: boolean;
    onClose: () => void;
};

export const DeleteModal = ({ isOpen, onClose }: IModal) => {
    const router = useRouter();
    console.log(router);
    const handleDeleteClick = async () => {
        try {
            const { data } = await apiHandler.delete('/org/delete', {
                data: { organizationId: router.query?.id },
            });
            console.log(data);
            if (!data.ok) {
                throw new Error();
            }
            toast.success('org has been deleted');
        } catch {
            toast.error('could not delete org');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[325px] md:w-auto ">
                <DialogHeader>
                    Delete Org
                    <DialogDescription className="mt-3">
                        Are you sure? you can't undo this action afterwards.
                        <div className="flex justify-end space-x-2 mt-5">
                            <Button
                                className="text-[black] bg-[#F9F5FF]  border-[1.4px]  hover:text-[white] hover:bg-btn"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="text-[white] bg-[red]  border-[1.4px]  "
                                onClick={handleDeleteClick}
                            >
                                Delete
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
