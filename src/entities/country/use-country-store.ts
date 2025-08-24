import countriesData from '@/shared/data/countries.json';
import { create } from 'zustand';

export type CountryType = { name: string; code: string };

interface CountryState {
  countries: CountryType[];
  getByCode: (codeISO: string) => CountryType | undefined;
  filterByName: (query: string) => CountryType[];
}

export const useCountryStore = create<CountryState>((_, get) => ({
  countries: countriesData,
  getByCode: (codeISO: string) =>
    get().countries.find(({ code }) => code === codeISO),
  filterByName: (query: string) =>
    get().countries.filter(({ name }) =>
      name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    ),
}));
