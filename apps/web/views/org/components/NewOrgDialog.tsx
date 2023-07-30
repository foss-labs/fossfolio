import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@app/ui/components/dialog';
import { Button } from '@app/ui/components/button';
import { Input } from '@app/ui/components/input';

type IModal = {
    isOpen: boolean;
    onClose: () => void;
};

export const NewOrgDialog = ({ isOpen, onClose }: IModal) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-md">
                <DialogHeader>
                    <DialogTitle className="mb-4">New Org</DialogTitle>
                    <DialogDescription>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="org" className="text-start">
                                org name
                            </label>
                            <Input type="org" />
                        </div>
                        <div className="flex flex-col gap-3 mt-4">
                            <Button className="bg-[#7F56D9] px-5 py-2 rounded-md text-[white] hover:text-[#7F56D9] hover:bg-[#F9F5FF]  border-[1.4px] hover:border-[#7F56D9]">
                                Create organisation
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
