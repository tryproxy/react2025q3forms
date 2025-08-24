import { UIInput } from '@/shared/uikit/ui-input';
import { useState } from 'react';
import { useCountryStore } from './use-country-store';

export function CountryAutocomplete({
  type,
  value,
  id,
  name,
  onChange,
}: {
  type: string;
  value: string;
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [query, setQuery] = useState<string>(value);
  const [isDropDownOpened, setIsDropDownOpened] = useState<boolean>(false);
  const { filterByName } = useCountryStore();
  const searchResult = filterByName(query);

  return (
    <div className="relative">
      <UIInput
        value={query}
        type={type}
        id={id}
        name={name}
        placeholder="..."
        onChange={(e) => {
          setIsDropDownOpened(true);
          setQuery(e.target.value);
        }}
      />
      {isDropDownOpened && searchResult.length > 0 && (
        <ul className="bg-surface absolute z-10 mt-1 max-h-64 overflow-y-auto rounded border">
          {searchResult.map(({ code, name }) => (
            <li
              key={code}
              className="hover:bg-input cursor-pointer px-2 py-1"
              onClick={() => {
                setQuery(name);
                setIsDropDownOpened(false);
                onChange({
                  target: { value: code },
                } as unknown as React.ChangeEvent<HTMLInputElement>);
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
