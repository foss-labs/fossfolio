import api from '@app/api';
import { debounce } from '@app/utils';
import * as Yup from 'yup';

export const EventValidator = Yup.object({
    title: Yup.string().required(),
    slug: Yup.string()
        .matches(/^[a-z|0-9]+$/gi)
        .required('Slug is Required')
        .test(
            'slug',
            'url is already taken',
            async (value) =>
                new Promise((resolve) => {
                    debounce(async () => {
                        const { data } = await api.get(`/events/slug/${value}`);
                        resolve(data.data.success);
                    }, 1000);
                }) as boolean | Promise<boolean> | Promise<Yup.ValidationError>,
        ),
    image: Yup.string().required(),
    description: Yup.string().required(),
    guidelines: Yup.string().required(),
    mode: Yup.object({
        label: Yup.string().required(),
        value: Yup.string().required(),
    }),

    registrationStart: Yup.date().required(),
    registrationEnd: Yup.date().required(),
    eventStarting: Yup.date().required(),
    eventEnding: Yup.date().required(),

    email: Yup.string().required(),
    website: Yup.string().required(),
    twitter: Yup.string(),
    instgram: Yup.string(),
    linkedin: Yup.string(),
    discord: Yup.string(),
});

export const TeamValidator = Yup.object({
    name: Yup.string().required('Enter a Valid Team Name'),
    repo: Yup.string()
        .required()
        .matches(/^https:\/\/github.com\/[^/]+\/[^/]+$/g),
    description: Yup.string().required('Enter a Valid Description'),
});

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const userInfo = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required(),
    phoneNumber: Yup.string()
        .required()
        .min(10)
        .max(10)
        .matches(phoneRegExp, 'Phone number is not valid'),
    bio: Yup.string(),
});

export const regEvent = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required(),
});
