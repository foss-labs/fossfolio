import { Button } from '@app/ui/components/button';
import { DialogHeader, Dialog, DialogContent, DialogDescription } from '@app/ui/components/dialog';
import { BiCopy } from 'react-icons/bi';
import { toast } from 'sonner';

/*
  this only works in local , inorder to prevent unwanted use of email sending when we 
  send user invite in local this modal will appear with the invite link u can copy paste this into amother
  icognito tab
*/

type ILink = {
    link: string;
    isOpen: boolean;
    onClose: () => void;
};

export const InviteModal = ({ link, isOpen, onClose }: ILink) => {
    const cpyToClipBoard = () => {
        navigator.clipboard.writeText(link);
        toast.success('link copied to clipboard');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[625px]">
                <DialogHeader>
                    Invite Link - DEV Environment
                    <DialogDescription className="mt-3">
                        <div className="border-red-500 border-2 p-4 rounded-md flex items-center justify-between gap-[2px]">
                            {link}
                            <BiCopy className="hover:cursor-pointer" onClick={cpyToClipBoard} />
                        </div>
                        <div className="flex justify-end space-x-2 mt-5">
                            <Button
                                className="text-[black] bg-[#F9F5FF] hover:bg-emerald-50 border-[1.4px]"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
