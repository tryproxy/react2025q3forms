import { cn } from '../lib/cn';

export function UIButton({
  type = 'button',
  variant = 'default',
  disabled = false,
  className,
  children,
  onClick,
}: {
  type?: 'button' | 'submit' | 'reset';
  variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'link'
    | 'ghost';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-sm p-2 transition-colors',
        {
          default:
            'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs',
          destructive:
            'bg-destructive hover:bg-destructive/90 text-white shadow-xs',
          outline:
            'bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs',
          secondary:
            'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs',
          ghost: 'bg-surface/40 hover:bg-surface/20',
          link: 'text-primary underline-offset-4 hover:underline',
        }[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
