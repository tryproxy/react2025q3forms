import { useCountryStore } from '@/entities/country/use-country-store';
import { useSignupStore } from '@/features/auth/model/use-signup-store';
import { SignupFormControlled } from '@/features/auth/ui/SignupFormControlled';
import { SignupFormUncontrolled } from '@/features/auth/ui/SignupFormUncontrolled';
import { cn } from '@/shared/lib/cn';
import { useThemeContext } from '@/shared/model/context/useThemeContext';
import { ThemeToggler } from '@/shared/uikit/ThemeToggler';
import { UIButton } from '@/shared/uikit/ui-button';
import { UIModal } from '@/shared/uikit/ui-modal';
import { useState } from 'react';

function App() {
  const { theme, toggleTheme } = useThemeContext();
  const [openForm, setOpenForm] = useState<
    'controlled' | 'uncontrolled' | null
  >(null);
  const entries = useSignupStore(({ entries }) => entries);
  const getCountry = useCountryStore(({ getByCode }) => getByCode);
  return (
    <div
      className={cn(
        'bg-background text-surface-foreground flex h-screen flex-col items-center py-2'
      )}
    >
      <header className="flex w-full justify-end p-2">
        <ThemeToggler content={theme} onClick={toggleTheme} />
      </header>
      <main className="flex flex-col items-center gap-2">
        <div className="flex gap-4">
          <UIButton
            variant="secondary"
            onClick={() => setOpenForm('controlled')}
          >
            Controlled Form
          </UIButton>
          <UIButton
            variant="default"
            onClick={() => setOpenForm('uncontrolled')}
          >
            Uncontrolled Form
          </UIButton>
        </div>
        <div className="flex flex-col items-center">
          <ul className="flex w-full max-w-xl flex-col gap-4">
            {entries.map(
              ({ name, age, country, email, gender, pfp, mode }, idx) => {
                const countryName = getCountry(country);
                const parsedCountry = countryName ? countryName.name : '';
                return (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="border-border bg-surface flex items-center gap-2 rounded border p-2">
                      <img
                        src={pfp ?? ''}
                        alt={name}
                        className="h-22 w-22 rounded-full object-cover object-center"
                      />
                      <div
                        className={cn(
                          'text-secondary-foreground rounded-2xl px-4 py-2 text-sm shadow-lg',
                          `${mode === 'uncontrolled' ? 'bg-primary' : 'bg-secondary'}`
                        )}
                      >
                        <h2>Name: {name}</h2>
                        <p>Age: {age}</p>
                        <p>Gender: {gender}</p>
                        <p>From: {parsedCountry}</p>
                        <p>Contact: {email}</p>
                      </div>
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </main>

      <UIModal isOpen={!!openForm} onClose={() => setOpenForm(null)}>
        <UIModal.Header>
          {openForm === 'controlled' ? 'Controlled Form' : 'Uncontrolled Form'}
        </UIModal.Header>
        <UIModal.Body>
          {openForm === 'controlled' && (
            <SignupFormControlled onSuccess={() => setOpenForm(null)} />
          )}
          {openForm === 'uncontrolled' && (
            <SignupFormUncontrolled onSuccess={() => setOpenForm(null)} />
          )}
        </UIModal.Body>
      </UIModal>
      <div id="modals"></div>
    </div>
  );
}

export default App;
