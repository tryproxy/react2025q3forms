import { create } from 'zustand';
import type { SignupData } from './signup.schema';

type Entry = SignupData & { mode: 'vanilla' | 'rhf' };

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
