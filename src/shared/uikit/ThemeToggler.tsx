import { cn } from '../lib/cn';
import SunIcon from '../assets/theme_sun.svg?react';
import SaturnIcon from '../assets/theme_saturn.svg?react';
import { UIButton } from './ui-button';

export function ThemeToggler({
  className,
  content,
  onClick,
}: {
  className?: string;
  content?: 'light' | 'dark';
  onClick?: () => void;
}) {
  return (
    <div className="">
      <UIButton variant="ghost" className={cn('', className)} onClick={onClick}>
        {content === 'light' ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <SaturnIcon className="h-6 w-6" />
        )}
      </UIButton>
    </div>
  );
}
