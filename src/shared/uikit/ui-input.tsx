import { cn } from '../lib/cn';

export function UIInput({
  className,
  ...props
}: { className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input className={cn('bg-input rounded px-2 py-1', className)} {...props} />
  );
}
