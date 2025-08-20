import { cn } from '@/shared/lib/cn';
import { UIButton } from '@/shared/uikit/ui-button';
import { UIModal } from '@/shared/uikit/ui-modal';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      data-theme="dark"
      className={cn(
        'bg-background text-surface-foreground flex h-screen flex-col items-center justify-center'
      )}
    >
      <div id="modals"></div>
      <UIModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <UIModal.Header>HEADER</UIModal.Header>
        <UIModal.Body>TEXT</UIModal.Body>
        <UIModal.Footer>
          <UIButton variant="secondary">Submit</UIButton>
        </UIModal.Footer>
      </UIModal>
      <div className="flex gap-4">
        <UIButton variant="default" onClick={() => setIsOpen(true)}>
          controlled
        </UIButton>
        <UIButton variant="secondary" onClick={() => setIsOpen(true)}>
          uncontrolled
        </UIButton>
      </div>
    </div>
  );
}

export default App;
