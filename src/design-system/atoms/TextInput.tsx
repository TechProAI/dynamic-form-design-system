import type { InputHTMLAttributes } from 'react';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> & {
  value: string;
  label: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel';
  hasError?: boolean;
};

export function TextInput({ value, label, onChange, type = 'text', hasError = false, ...props }: Props) {
  return (
    <input
      {...props}
      className={`control${hasError ? ' control--error' : ''}${props.className ? ` ${props.className}` : ''}`}
      type={type}
      value={value}
      aria-label={props['aria-label'] ?? label}
      aria-invalid={hasError}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
