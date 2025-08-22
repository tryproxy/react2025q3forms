import { SignupForm } from '@/features/auth/ui/SignupForm';
import { SignupFormRHF } from '@/features/auth/ui/SignupFormRHF';
import { cn } from '@/shared/lib/cn';
import { UIButton } from '@/shared/uikit/ui-button';
import { UIModal } from '@/shared/uikit/ui-modal';
import { useState } from 'react';

function App() {
  const [openForm, setOpenForm] = useState<'rhf' | 'vanilla' | null>(null);

  return (
    <div
      data-theme="dark"
      className={cn(
        'bg-background text-surface-foreground flex h-screen flex-col items-center justify-center'
      )}
    >
      <div id="modals"></div>
      <UIModal isOpen={!!openForm} onClose={() => setOpenForm(null)}>
        <UIModal.Header>
          {openForm === 'rhf' ? 'React Hook Form' : 'Uncontrolled Form'}
        </UIModal.Header>

        <UIModal.Body>
          {openForm === 'rhf' ? <SignupFormRHF /> : <SignupForm />}
        </UIModal.Body>

        <UIModal.Footer>lol</UIModal.Footer>
      </UIModal>

      <div className="flex gap-4">
        <UIButton variant="secondary" onClick={() => setOpenForm('rhf')}>
          controlled
        </UIButton>
        <UIButton variant="default" onClick={() => setOpenForm('vanilla')}>
          uncontrolled
        </UIButton>
      </div>
    </div>
  );
}

export default App;
