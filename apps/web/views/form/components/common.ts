import * as yup from "yup";

export const NewFormValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required().max(25),
});

export type NewFormSchema = yup.InferType<typeof NewFormValidationSchema>;
