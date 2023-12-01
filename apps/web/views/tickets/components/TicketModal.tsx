import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@app/ui/components/dialog';
import { Button } from '@app/ui/components/button';

type IModal = {
    isOpen: boolean;
    onClose: () => void;
};

export const TicketModal = ({ isOpen, onClose }: IModal) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[450px] h-[500px]">
                <DialogHeader>
                    <DialogDescription className="mt-3" />
                    <div className="border border-gray-400 rounded p-4 h-full">
                        <div className="flex items-center mb-4 rounded h-[100px]">
                            <div className="w-1/2 h-full bg-gray-100 rounded">
                                <img alt="Event Preview" className="w-full h-full object-cover" />
                            </div>

                            <div className="w-1/2 pl-4">
                                <p className="text-lg font-bold">UI HACKATHON</p>
                                <p className="text-sm">14/11/2023-16/11/2023 </p>
                                <p className="text-sm">VENUE: MDIT </p>
                            </div>
                        </div>

                        <div className="w-full h-1/2 bg-gray-100 rounded mb-4">
                            <div className="flex items-center h-full">
                                <div className="w-1/2">
                                    <p>Scan the QR code</p>
                                </div>

                                <div className="w-1/2 pl-4">
                                    <p>TICKET ID: 11RTMDIT </p>
                                    <p className="text-sm">ATTENDEE: SURYA </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 bg-gray-100 rounded ">
                            <p className="text-sm">TOTAL AMOUNT </p>
                        </div>
                    </div>

                    <div className="flex justify-between gap-2 mt-2">
                        <Button variant="outline" className="flex-1 rounded-sm ">
                            Print
                        </Button>
                        <Button className="flex-1">Download</Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
