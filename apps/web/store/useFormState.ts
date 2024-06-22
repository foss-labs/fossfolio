import { create } from "zustand";
import { IFormInput } from "@app/views/form";

// Define the interfaces as described above
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
}

type UseFormState = FormState & FormActions;

// Create the Zustand store
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
}));
