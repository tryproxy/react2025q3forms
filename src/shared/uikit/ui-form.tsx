import { cn } from '../lib/cn';
import { UIButton } from './ui-button';

export function UIForm({
  className,
  children,
  onSubmit,
  onAction,
}: {
  className?: string;
  children?: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onAction?: (form: FormData) => void;
}) {
  return (
    <form
      className={cn('flex flex-col gap-2', className)}
      action={onAction}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

UIForm.Field = function UIFormField({
  label,
  name,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn('gap-2 py-2', className)}>
      <div className="grid grid-cols-[minmax(120px,200px)_1fr] items-start gap-2">
        <label htmlFor={name}>{label}</label>

        <div className="flex gap-2">
          {children}
          <span className="text-primary h-[1.25rem] text-sm">
            {error ?? ''}
          </span>
          {hint && <span>{hint}</span>}
        </div>
      </div>
    </div>
  );
};

UIForm.Submit = function UIFormSubmit({
  disabled = false,
  className,
  children,
}: {
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <UIButton
      variant="secondary"
      className={cn('', className)}
      type="submit"
      disabled={disabled}
    >
      {children}
    </UIButton>
  );
};

UIForm.Reset = function IUFormSubmit({
  className,
  children,
  onClick,
}: {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <UIButton
      variant="destructive"
      className={cn('', className)}
      type="reset"
      onClick={onClick}
    >
      {children}
    </UIButton>
  );
};
