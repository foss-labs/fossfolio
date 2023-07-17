import { Button } from '@app/ui/components/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@app/ui/components/dialog';
import React from 'react';

type IModal = {
    isOpen: boolean;
    onClose: () => void;
};

export const AuthModal = ({ isOpen, onClose }: IModal) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle className="mb-4">Login/SignUp</DialogTitle>
                <DialogDescription>
                    Login With
                    <div className="flex flex-col gap-3 mt-4">
                        <Button type="submit" className="bg-red-700">
                            Google
                        </Button>
                        <Button type="submit">Github</Button>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
);
