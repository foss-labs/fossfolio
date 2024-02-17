import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@app/ui/components/dialog';
import { Button } from '@app/components/ui/Button';
import { useAuth } from '@app/hooks';
import { Iform } from '@app/types';
import { SchemaPreview } from './SchemaPreview';

type IModal = {
    isOpen: boolean;
    onClose: () => void;
    schema: Iform[];
};

export const PublicFormModal = ({ isOpen, onClose, schema }: IModal) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="!w-[350px] shadow-md">
                <SchemaPreview data={schema} />
            </DialogContent>
        </Dialog>
    );
};
