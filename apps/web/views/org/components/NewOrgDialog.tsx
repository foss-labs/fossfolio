import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@app/ui/components/dialog';
import { Button } from '@app/ui/components/button';
import { Input } from '@app/ui/components/input';
import { ENV, apiHandler } from '@app/config';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAddOrg } from '@app/hooks/api/org';

type IModal = {
    isOpen: boolean;
    onClose: () => void;
};

// add page names here when ever
// new pages are created
const excludedSlug = ['org', 'events'];

const Schema = yup.object().shape({
    name: yup.string().required(),
    slug: yup
        .string()
        .test('checkslug', 'a url with same name already exist', (val) => {
            return new Promise((resolve, _reject) => {
                apiHandler
                    .get(`/org/find/${val}`)
                    .then((el) => {
                        const isPartOfDefaultPages = excludedSlug.some((elm) => elm === val);
                        // this is used to prevent user from saving the org name as same
                        // as the default page names
                        if (isPartOfDefaultPages) {
                            throw new Error();
                        }
                        if (!el.data.id) {
                            resolve(true);
                        }
                        throw new Error();

                        // TODO @sreehari2003
                        // add debouncing here
                    })
                    .catch(() => {
                        // already exist
                        resolve(false);
                    });
            });
        })
        .required(),
});

type ISchema = yup.InferType<typeof Schema>;

export const NewOrgDialog = ({ isOpen, onClose }: IModal) => {
    const { mutate } = useAddOrg();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ISchema>({
        mode: 'onSubmit',
        resolver: yupResolver(Schema),
        defaultValues: {
            slug: '',
            name: '',
        },
    });

    const onUserSubMit: SubmitHandler<ISchema> = async (val) => {
        mutate(val);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[400px] md:w-md-auto">
                <DialogHeader>
                    <DialogTitle className="mb-4">New Org</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={handleSubmit(onUserSubMit)}>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="org" className="text-start">
                                    org name
                                </label>
                                <Input type="org" {...register('name')} />
                                <label htmlFor="slug" className="text-start">
                                    domain url
                                </label>
                                <Input type="slug" {...register('slug')} />
                                {errors.slug && (
                                    <span className="text-[red] text-start">
                                        An org with same name already exist
                                    </span>
                                )}
                                <label className="text-start">{`${ENV.web_base_url}/${watch(
                                    'slug',
                                )}`}</label>
                            </div>
                            <div className="flex flex-col gap-3 mt-4">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting ? true : false}
                                    className="bg-[#7F56D9] px-5 py-2 rounded-md text-[white] hover:text-[#7F56D9] hover:bg-[#F9F5FF]  border-[1.4px] hover:border-[#7F56D9]"
                                >
                                    {isSubmitting ? '...' : 'Create organisation'}
                                </Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
