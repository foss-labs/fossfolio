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
  // id will be there for fields which are already in db
  id: string | null;
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
  setOptions: (newOption: string[]) => void;
  setId: (id: string) => void;
  resetFormState: () => void;
  setFormState: (data: Partial<FormState>) => void;
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
  id: null,

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
  setId: (id: string) => set({ id }),
  setOptions: (newOption) => set({ options: [...newOption] }),
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
      id: null,
    }),
  setFormState: (newState) =>
    set((state) => ({
      ...state,
      doesTemporaryFieldExist: newState.doesTemporaryFieldExist,
      activeField: newState.activeField,
      label: newState.label,
      placeHolder: newState.placeHolder,
      defaultValue: newState.defaultValue,
      type: newState.type,
      textColor: newState.textColor,
      borderColor: newState.borderColor,
      borderRadius: newState.borderRadius,
      isRequired: newState.isRequired,
      options: newState.options,
      id: newState.id,
    })),
}));
