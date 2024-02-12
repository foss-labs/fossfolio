import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@app/ui/components/dialog';
import Qrcode from 'qrcode';
import { useAuth } from '@app/hooks';
import { Button } from '@app/components/ui/Button';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type IModal = {
    isOpen: boolean;
    onClose: () => void;
};

export const QrTokenModal = ({ isOpen, onClose }: IModal) => {
    const { user } = useAuth();
    const [qrCode, setQrCode] = useState('');

    const generateQRCode = async () => {
        try {
            console.log(document.cookie);
            const dataUrl = await Qrcode.toDataURL(user?.refreshToken || '');
            setQrCode(dataUrl);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    useEffect(() => {
        generateQRCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[325px] md:w-auto">
                <DialogHeader>
                    <DialogTitle>Login with mobile</DialogTitle>
                </DialogHeader>
                {qrCode && <Image src={qrCode} alt="QR Code" height={400} width={400} />}
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
