import { createPortal } from 'react-dom';
import { cn } from '../lib/cn';
import { UIButton } from './ui-button';

export function UIModal({
  width = 'md',
  className,
  children,
  isOpen = false,
  onClose,
}: {
  width?: 'md' | 'full';
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  if (!isOpen) return null;
  const modal = (
    <div
      className={cn(
        'bg-opacity-50 bg-overlay fixed inset-0 overflow-y-auto pt-10 pb-10 backdrop-blur',
        className
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          'bg-surface relative mx-auto flex min-h-[900px] flex-col rounded-lg',
          { md: 'w-full max-w-[720px]', full: 'mx-5' }[width]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <UIButton
          className="group absolute -right-10 p-2"
          variant="ghost"
          onClick={onClose}
        >
          <CrosIconSVG />
        </UIButton>
        {children}
      </div>
    </div>
  );

  return createPortal(
    modal,
    document.querySelector('#modals') ?? document.body
  );
}

UIModal.Header = function UiModalHeader({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <div className={cn('p-4 text-2xl', className)}>{children}</div>;
};

UIModal.Body = function UiModalHeader({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <div className={cn('px-4 py-2', className)}>{children}</div>;
};

UIModal.Footer = function UiModalHeader({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn('mt-auto flex justify-end gap-4 p-4', className)}>
      {children}
    </div>
  );
};

function CrosIconSVG() {
  return (
    <svg
      className="text-surface-foreground/30 group-hover:text-surface-foreground/50 h-4 w-4 transition-colors"
      fill="currentColor"
      height="16px"
      width="16px"
      viewBox="0 0 371.23 371.23"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <polygon points="371.23,21.213 350.018,0 185.615,164.402 21.213,0 0,21.213 164.402,185.615 0,350.018 21.213,371.23 185.615,206.828 350.018,371.23 371.23,350.018 206.828,185.615 "></polygon>
      </g>
    </svg>
  );
}
