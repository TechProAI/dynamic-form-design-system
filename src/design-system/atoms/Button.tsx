import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight, LoaderCircle } from 'lucide-react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loading?: boolean;
};

export function Button({ children, loading = false, disabled, ...props }: Props) {
  return (
    <button {...props} className={`button${props.className ? ` ${props.className}` : ''}`} disabled={disabled || loading}>
      {loading ? <LoaderCircle size={18} className="spin" aria-hidden="true" /> : null}
      <span>{children}</span>
      {!loading ? <ArrowRight size={18} aria-hidden="true" /> : null}
    </button>
  );
}
