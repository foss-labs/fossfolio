type Iinput =
    | 'SingleLineText'
    | 'LongText'
    | 'SingleSelect'
    | 'MultiSelect'
    | 'Checkbox'
    | 'Number'
    | 'Email'
    | 'URL'
    | 'PhoneNumber'
    | 'AttachMent';

// v0 does not support attachment
export type IFormInput = Omit<Iinput, 'AttachMent'>;

type IinputOption = {
    label: string;
    value: IFormInput;
};

export const InputOption: IinputOption[] = [
    {
        label: 'Single line text',
        value: 'SingleLineText',
    },
    {
        label: 'Long text',
        value: 'LongText',
    },
    {
        label: 'SingleSelect',
        value: 'SingleSelect',
    },
    {
        label: 'Multi select',
        value: 'MultiSelect',
    },
    {
        label: 'Checkbox',
        value: 'Checkbox',
    },
    {
        label: 'Email',
        value: 'Email',
    },
    {
        label: 'URL',
        value: 'URL',
    },
    {
        label: 'PhoneNumber',
        value: 'PhoneNumber',
    },
];
