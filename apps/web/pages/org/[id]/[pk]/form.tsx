import { useState } from 'react';
import { NextPageWithLayout } from 'next';
import { DashboardLayout } from '@app/layout';
import { Button } from '@app/components/ui/Button';
import { Input } from '@app/ui/components/input';
import { Separator } from '@app/ui/components/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@app/ui/components/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@app/ui/components/select';
import {
    Form as FormProvider,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@app/ui/components/form';
import { Checkbox } from '@app/ui/components/checkbox';
import { InputOption, IFormInput } from '@app/views/form';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label } from '@app/ui/components/label';

type Iform = {
    label: string;
    plceholder?: string;
    options?: string;
    required: boolean;
    type: IFormInput;
};

const builderSchema = yup.object({
    label: yup.string().required('Label is required'),
    placeHolder: yup.string(),
    required: yup.boolean().optional().default(false),
    type: yup.string().required('Question type is required') as yup.StringSchema<IFormInput>,
});

type FormValidator = yup.InferType<typeof builderSchema>;

const Form: NextPageWithLayout = () => {
    const [formData, setFormData] = useState<Iform[]>([]);

    const form = useForm<FormValidator>({
        mode: 'onSubmit',
        resolver: yupResolver(builderSchema),
    });

    const handleUpdates: SubmitHandler<FormValidator> = async (data) => {
        setFormData((prev) => [...prev, data]);
    };

    const handleCancel = () => {
        form.reset();
    };

    return (
        <div className="pt-5">
            <div className="flex justify-center  h-screen  p-5">
                <div className="gap-20 flex justify-center">
                    <section>
                        <h3 className="text-3xl font-semibold mt-4">Form Builder</h3>
                        <p className="text-sm text-gray-400 mt-3">
                            Create Custom forms with various question types
                        </p>
                        <FormProvider {...form}>
                            <form className="space-y-4" onSubmit={form.handleSubmit(handleUpdates)}>
                                <Card className="mt-10">
                                    <CardHeader>
                                        <CardTitle>Create a new question</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <FormField
                                                control={form.control}
                                                name="label"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Question</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Enter your question"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="space-y-2 mt-2">
                                            <FormField
                                                control={form.control}
                                                name="placeHolder"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Placeholder (optional)
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Enter Placeholder"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="space-y-2 mt-2">
                                            <FormField
                                                control={form.control}
                                                name="type"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel htmlFor="type">
                                                            Question Type
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger id="type">
                                                                    <SelectValue placeholder="Select" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent position="popper">
                                                                {InputOption.map((el) => (
                                                                    <SelectItem
                                                                        key={el.value as string}
                                                                        value={el.value as string}
                                                                    >
                                                                        {el.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2 mt-3">
                                            <FormField
                                                control={form.control}
                                                name="required"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel>Required</FormLabel>
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline" onClick={handleCancel}>
                                            Cancel
                                        </Button>
                                        <Button type="submit">Add Question</Button>
                                    </CardFooter>
                                </Card>
                            </form>
                        </FormProvider>
                    </section>
                    <Separator orientation="vertical" />
                    <section>
                        <h3 className="text-3xl font-semibold mt-4">Preview</h3>
                        <p className="text-sm text-gray-400 mt-3">
                            This is how your form will look like
                        </p>

                        {formData.length > 0 && (
                            <Card className="mt-10 w-[300px]">
                                <CardHeader>
                                    <CardTitle>Please fill The form</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {formData.map((el) => (
                                        <div>
                                            <Label className="mb-4">{el.label}</Label>
                                            {el.type === 'SingleLineText' && (
                                                <Input placeholder={el.options} />
                                            )}
                                            {el.type === 'Checkbox' && (
                                                <Checkbox placeHolder={el.plceholder} />
                                            )}
                                            {el.type === 'Email' && (
                                                <Input placeholder={el.plceholder} type="email" />
                                            )}
                                            {el.type === 'SingleSelect' && (
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder={el.plceholder} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">Light</SelectItem>
                                                        <SelectItem value="dark">Dark</SelectItem>
                                                        <SelectItem value="system">
                                                            System
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </div>
                                    ))}
                                    <Button type="submit" className="mt-5 w-full">
                                        submit
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

Form.Layout = DashboardLayout;
Form.RequireAuth = true;
export default Form;
