import type { SelectHTMLAttributes } from 'react';

export interface SelectOption { label: string; value: string; }

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> & {
  value: string;
  label: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  hasError?: boolean;
};

export function Select({ value, label, options, onChange, hasError = false, ...props }: Props) {
  return (
    <select
      {...props}
      className={`control control--select${hasError ? ' control--error' : ''}${props.className ? ` ${props.className}` : ''}`}
      value={value}
      aria-label={props['aria-label'] ?? label}
      aria-invalid={hasError}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="" disabled>Select {label.toLowerCase()}</option>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  );
}
