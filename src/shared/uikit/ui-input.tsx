import { cn } from '../lib/cn';

export function UIInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('bg-input rounded', className)} {...props} />;
}
