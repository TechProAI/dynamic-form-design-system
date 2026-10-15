import type { ReactNode } from 'react';

type Props = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  fullWidth?: boolean;
  children: ReactNode;
};

export function Field({ id, label, required = false, hint, error, fullWidth = false, children }: Props) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={`field${fullWidth ? ' field--full' : ''}${error ? ' field--invalid' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}{required ? <span className="field__required" aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {hint && !error ? <p className="field__hint" id={hintId}>{hint}</p> : null}
      {error ? <p className="field__error" id={errorId} role="alert">{error}</p> : null}
      <span className="sr-only">
        {hintId ? `Hint: ${hint}.` : ''}{errorId ? `Error: ${error}.` : ''}
      </span>
    </div>
  );
}
