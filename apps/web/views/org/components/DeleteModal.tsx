import { useRouter } from 'next/router';
import { Button } from '@app/ui/components/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@app/ui/components/dialog';
import { ENV } from '@app/config';

type IModal = {
    isOpen: boolean;
    onClose: () => void;
};

export const DeleteModal = ({ isOpen, onClose }: IModal) => {
    const router = useRouter();
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
                                onClick={() => {}}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="text-[white] bg-[red]  border-[1.4px]  "
                                onClick={() => {}}
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
