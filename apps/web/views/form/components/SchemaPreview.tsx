import { Button } from '@app/components/ui/Button';
import { MdDeleteOutline } from 'react-icons/md';
import { apiHandler } from '@app/config';
import { useFormSchema, useUserRegistrationStatus } from '@app/hooks/api/Events';
import { Iform } from '@app/types';
import { Card, CardContent, CardHeader, CardTitle } from '@app/ui/components/card';
import { Checkbox } from '@app/ui/components/checkbox';
import { Input } from '@app/ui/components/input';
import { Label } from '@app/ui/components/label';
import Multiselect from 'multiselect-react-dropdown';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@app/ui/components/select';
import { Textarea } from '@app/ui/components/textarea';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

type Prop = {
    data: Array<Iform>;
    isPublic: boolean;
    closeModal?: () => void;
    eventId: string;
    isAIgenerated?: boolean;
};

export const SchemaPreview = ({
    data,
    closeModal,
    isPublic = false,
    eventId,
    isAIgenerated = false,
}: Prop) => {
    const { refetch: refetchStatus } = useUserRegistrationStatus();
    const { refetch } = useFormSchema();
    const router = useRouter();
    const { pk, id } = router.query;

    const bulkDeleteFormPreview = async () => {
        try {
            await apiHandler.delete(`events/form/bulk-delete/${pk}`, {
                data: {
                    organizationId: id,
                },
            });
            toast.success('form deleted successfully');
        } catch {
            toast.error('error deleting form');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!isPublic) return;
        e.preventDefault();

        // key of the form will be the each fields primary key
        // this is done so that we can make the field editable from admin side form builder
        const formData: { [name: string]: string } = {};
        for (let i = 0; i < e.currentTarget.elements.length; i++) {
            const element = e.currentTarget.elements[i] as HTMLInputElement;
            if (element.name) {
                formData[element.name] = element.value;
            }
        }
        try {
            const { data } = await apiHandler.post(`/events/form/${eventId}`, formData);
            if (data.url) {
                // should use stripe js library to pass session id
                window.location.href = data.url;
            }
            toast.success('Form submitted successfully');
            refetchStatus();
            if (closeModal) {
                closeModal();
            }
        } catch {
            toast.error('Error submitting form');
        }
    };

    const { mutate } = useMutation(bulkDeleteFormPreview, {
        onSuccess: () => {
            refetch();
        },
    });

    return (
        <Card className="mt-10 w-[300px] group">
            <CardHeader>
                <CardTitle className="flex">
                    Please fill The form
                    {!isPublic && !isAIgenerated && (
                        <MdDeleteOutline
                            className="ml-2 w-4 hover:text-red-500 hover:cursor-pointer hidden group-hover:block"
                            onClick={() => mutate()}
                        />
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[calc(70svh)] pt-4 pb-8 overflow-auto">
                <form onSubmit={handleSubmit}>
                    {(data ?? []).map((el) => (
                        <div key={el.id}>
                            <Label>{el.label}</Label>
                            <div className="mt-3 mb-2">
                                {el.type === 'Number' && (
                                    <Input
                                        type="number"
                                        placeholder={el.placeholder}
                                        required={el.required}
                                        name={el.id}
                                    />
                                )}
                                {el.type === 'SingleLineText' && (
                                    <Input
                                        type="text"
                                        placeholder={el.placeholder}
                                        required={el.required}
                                        name={el.id}
                                    />
                                )}
                                {el.type === 'Checkbox' && (
                                    <Checkbox required={el.required} name={el.id} />
                                )}
                                {el.type === 'Email' && (
                                    <Input
                                        placeholder={el.placeholder}
                                        type="email"
                                        required={el.required}
                                        name={el.id}
                                    />
                                )}
                                {el.type === 'PhoneNumber' && (
                                    <Input
                                        placeholder={el.placeholder}
                                        type="phoneNumber"
                                        required={el.required}
                                        name={el.id}
                                    />
                                )}
                                {el.type === 'URL' && (
                                    <Input
                                        placeholder={el.placeholder}
                                        type="url"
                                        required={el.required}
                                        name={el.id}
                                    />
                                )}
                                {el.type === 'SingleSelect' && (
                                    <Select required={el.required} name={el.id}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={el.placeholder} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {el.selectOptions?.map((option) => (
                                                <SelectItem value={option.option}>
                                                    {option.option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                                {el.type === 'MultiSelect' && (
                                    <>
                                        <Multiselect
                                            options={el.selectOptions?.map((o) => ({
                                                name: o.option,
                                                id: o.option,
                                            }))}
                                            selectedValues={el.options}
                                            onSelect={(e) => el.options?.push(e)}
                                            onRemove={(e) =>
                                                el.options?.splice(el.options?.indexOf(e), 1)
                                            }
                                            displayValue="name"
                                        />
                                    </>
                                )}
                                {el.type === 'LongText' && (
                                    <Textarea
                                        placeholder={el.placeholder}
                                        required={el.required}
                                        name={el.id}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                    <Button type="submit" className="mt-5 w-full">
                        submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
