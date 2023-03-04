import * as Yup from 'yup';

export const EventValidator = Yup.object({
    title: Yup.string().required(),
    // slug: Yup.string()
    //     .matches(/^[a-z|0-9]+$/gi)
    //     .required('Slug is Required')
    //     .test('slug', 'url is already taken', async (value) => {
    //         new Promise((resolve) => {
    //             debounce(async () => {
    //                 const { data } = await api.get(`/api/events/slug/${value}`);
    //                 +resolve(data.data.success);
    //             }, 1000);
    //         });
    //     }),
    startDate: Yup.date().required(),
    endDate: Yup.date().required(),
    registrationEndDate: Yup.date().required(),
    description: Yup.string().required(),
    website: Yup.string().required(),
    instgram: Yup.string().required(),
    twitter: Yup.string().required(),
});
