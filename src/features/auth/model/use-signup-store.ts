import { create } from 'zustand';
import type { SignupFormData } from './signup.schema';

type Entry = Omit<SignupFormData, 'pfp'> & {
  mode: 'uncontrolled' | 'controlled';
  pfp: string | null;
};

interface SignupState {
  entries: Entry[];
  addEntry: (entry: Entry) => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  entries: [],
  addEntry: (entry: Entry) =>
    set(({ entries }) => ({
      entries: [...entries, entry],
    })),
}));
