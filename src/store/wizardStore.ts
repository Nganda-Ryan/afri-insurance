import { create } from "zustand";

interface WizardStoreState {
  wizardInProgress: boolean;
  setWizardInProgress: (value: boolean) => void;
}

export const useWizardStore = create<WizardStoreState>((set) => ({
  wizardInProgress: false,
  setWizardInProgress: (value) => set({ wizardInProgress: value }),
}));
