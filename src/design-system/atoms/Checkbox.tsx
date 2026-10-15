import type { InputHTMLAttributes } from 'react';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange' | 'type'> & {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
  hasError?: boolean;
};

export function Checkbox({ checked, label, onChange, hasError = false, ...props }: Props) {
  return (
    <input
      {...props}
      className={`checkbox-control${hasError ? ' checkbox-control--error' : ''}${props.className ? ` ${props.className}` : ''}`}
      type="checkbox"
      checked={checked}
      aria-label={props['aria-label'] ?? label}
      aria-invalid={hasError}
      onChange={(event) => onChange(event.target.checked)}
    />
  );
}
