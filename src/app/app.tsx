import { SignupFofmUncontrolled } from '@/features/auth/ui/SignupFormUncontrolled';
import { SignupFormControlled } from '@/features/auth/ui/SignupFormControlled';
import { cn } from '@/shared/lib/cn';
import { UIButton } from '@/shared/uikit/ui-button';
import { UIModal } from '@/shared/uikit/ui-modal';
import { useState } from 'react';

function App() {
  const [openForm, setOpenForm] = useState<
    'controlled' | 'uncontrolled' | null
  >(null);

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
          {openForm === 'controlled' ? 'Controlled Form' : 'Uncontrolled Form'}
        </UIModal.Header>

        <UIModal.Body>
          {openForm === 'controlled' ? (
            <SignupFormControlled />
          ) : (
            <SignupFofmUncontrolled />
          )}
        </UIModal.Body>

        <UIModal.Footer>lol</UIModal.Footer>
      </UIModal>

      <div className="flex gap-4">
        <UIButton variant="secondary" onClick={() => setOpenForm('controlled')}>
          controlled
        </UIButton>
        <UIButton variant="default" onClick={() => setOpenForm('uncontrolled')}>
          uncontrolled
        </UIButton>
      </div>
    </div>
  );
}

export default App;
