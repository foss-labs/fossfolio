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

export const AuthModal = ({ isOpen, onClose }: IModal) => {
    const router = useRouter();
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[325px] md:w-auto">
                <DialogHeader>
                    <DialogTitle className="mb-4">Login</DialogTitle>
                    <DialogDescription>
                        By Signing in, you agree to our Terms and Services
                        <div className="flex flex-col gap-3 mt-4">
                            <Button
                                className="text-[#7F56D9] bg-[#F9F5FF]  border-[1.4px] border-[#7F56D9]"
                                onClick={() => {
                                    router.push(ENV.api_base + '/auth/google');
                                }}
                            >
                                Google
                            </Button>
                            <Button
                                className="bg-btn  text-[white] hover:text-[#7F56D9]   border-[1.4px] "
                                onClick={() => {
                                    router.push(ENV.api_base + '/auth/github');
                                }}
                            >
                                Github
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
