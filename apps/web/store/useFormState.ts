import { create } from "zustand";
import { IFormInput } from "@app/views/form";

interface FormState {
  doesTemporaryFieldExist: boolean;
  activeField: IFormInput | null;
  label: string;
  placeHolder: string;
  defaultValue: string;
  type: string;
  textColor: string;
  borderColor: string;
  borderRadius: string;
  isRequired: boolean;
  options: string[];
}

interface FormActions {
  setDoesTemporaryFieldExist: (exists: boolean) => void;
  setActiveField: (field: IFormInput | null) => void;
  setLabel: (label: string) => void;
  setPlaceHolder: (placeHolder: string) => void;
  setDefaultValue: (defaultValue: string) => void;
  setType: (type: string) => void;
  setTextColor: (textColor: string) => void;
  setBorderColor: (borderColor: string) => void;
  setBorderRadius: (borderRadius: string) => void;
  setIsRequired: (isRequired: boolean) => void;
  setOptions: (options: string[], newOption: string) => void;
  resetFormState: () => void;
}

type UseFormState = FormState & FormActions;

export const useFormState = create<UseFormState>((set) => ({
  // Initial state
  doesTemporaryFieldExist: false,
  activeField: null,
  label: "",
  placeHolder: "",
  defaultValue: "",
  type: "",
  textColor: "",
  borderColor: "",
  borderRadius: "",
  isRequired: false,
  options: [],

  // Actions
  setDoesTemporaryFieldExist: (exists) =>
    set({ doesTemporaryFieldExist: exists }),
  setActiveField: (field) => set({ activeField: field }),
  setLabel: (label) => set({ label }),
  setPlaceHolder: (placeHolder) => set({ placeHolder }),
  setDefaultValue: (defaultValue) => set({ defaultValue }),
  setType: (type) => set({ type }),
  setTextColor: (textColor) => set({ textColor }),
  setBorderColor: (borderColor) => set({ borderColor }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setIsRequired: (isRequired) => set({ isRequired }),
  setOptions: (option, newOption) => set({ options: [...option, newOption] }),
  resetFormState: () =>
    set({
      doesTemporaryFieldExist: false,
      activeField: null,
      label: "",
      placeHolder: "",
      defaultValue: "",
      type: "",
      textColor: "",
      borderColor: "",
      borderRadius: "",
      isRequired: false,
      options: [],
    }),
}));
