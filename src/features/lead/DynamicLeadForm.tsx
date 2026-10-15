import { useMemo, useState } from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../../design-system/atoms/Button';
import { Checkbox } from '../../design-system/atoms/Checkbox';
import { Select } from '../../design-system/atoms/Select';
import { TextInput } from '../../design-system/atoms/TextInput';
import { Field } from '../../design-system/molecules/Field';
import { isFieldVisible, type LeadField, type LeadValues } from './leadConfig';
import { validateLeadForm, type ValidationErrors } from './leadValidation';

type Props = {
  config: LeadField[];
  initialValues: LeadValues;
};

function controlDescription(field: LeadField): string {
  if (field.type === 'checkbox') return field.label;
  return field.label;
}

export function DynamicLeadForm({ config, initialValues }: Props) {
  const [values, setValues] = useState<LeadValues>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submittedValues, setSubmittedValues] = useState<LeadValues | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const visibleFields = useMemo(() => config.filter((field) => isFieldVisible(field, values)), [config, values]);

  function updateValue(name: string, value: string | boolean) {
    setValues((current) => {
      const next = { ...current, [name]: value };
      // A dependent field is removed from the active form as soon as its condition becomes false.
      if (name === 'leadType' && value !== 'Company') next.companyName = '';
      return next;
    });
    setSubmittedValues(null);
    setErrors((currentErrors) => {
      const next = { ...currentErrors };
      delete next[name];
      if (name === 'leadType' && value !== 'Company') delete next.companyName;
      return next;
    });
  }

  function validateField(field: LeadField, nextValues = values) {
    const fieldErrors = validateLeadForm(config, nextValues);
    setErrors((current) => {
      const next = { ...current };
      if (fieldErrors[field.name]) next[field.name] = fieldErrors[field.name];
      else delete next[field.name];
      // Refresh dependent visibility validation when the lead type changes.
      if (field.name === 'leadType' && !isFieldVisible(config.find((item) => item.name === 'companyName')!, nextValues)) {
        delete next.companyName;
      }
      return next;
    });
  }

  function handleBlur(field: LeadField) {
    setTouched((current) => ({ ...current, [field.name]: true }));
    validateField(field);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);
    const nextErrors = validateLeadForm(config, values);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(visibleFields.map((field) => [field.name, true])));
    if (Object.keys(nextErrors).length > 0) {
      setSubmittedValues(null);
      const firstInvalid = visibleFields.find((field) => nextErrors[field.name]);
      if (firstInvalid) {
        window.requestAnimationFrame(() => document.getElementById(firstInvalid.name)?.focus());
      }
      return;
    }
    setSubmittedValues({ ...values });
  }

  const activeErrors = submitAttempted ? errors : errors;

  return (
    <>
      <form className="lead-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {visibleFields.map((field) => {
            const error = (touched[field.name] || submitAttempted) ? activeErrors[field.name] : undefined;
            const describedBy = [
              field.hint && !error ? `${field.name}-hint` : '',
              error ? `${field.name}-error` : '',
            ].filter(Boolean).join(' ') || undefined;
            const common = {
              id: field.name,
              name: field.name,
              value: String(values[field.name] ?? ''),
              label: controlDescription(field),
              placeholder: field.placeholder,
              required: Boolean(field.validations?.required),
              hasError: Boolean(error),
              'aria-describedby': describedBy,
              onBlur: () => handleBlur(field),
              onChange: (value: string) => updateValue(field.name, value),
            };

            return (
              <Field
                key={field.name}
                id={field.name}
                label={field.label}
                required={field.validations?.required}
                hint={field.hint}
                error={error}
                fullWidth={field.fullWidth || field.type === 'checkbox' || field.type === 'textarea'}
              >
                {field.type === 'text' || field.type === 'email' ? (
                  <TextInput
                    {...common}
                    type={field.type === 'email' ? 'email' : 'text'}
                    autoComplete={field.name === 'fullName' ? 'name' : field.name === 'email' ? 'email' : field.name === 'phone' ? 'tel-national' : 'organization'}
                    inputMode={field.name === 'phone' ? 'numeric' : undefined}
                    maxLength={field.validations?.maxLength}
                  />
                ) : null}
                {field.type === 'select' ? (
                  <Select
                    {...common}
                    options={field.options ?? []}
                  />
                ) : null}
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    className={`control control--textarea${error ? ' control--error' : ''}`}
                    value={String(values[field.name] ?? '')}
                    placeholder={field.placeholder}
                    maxLength={field.validations?.maxLength}
                    aria-label={field.label}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    onChange={(event) => updateValue(field.name, event.target.value)}
                    onBlur={() => handleBlur(field)}
                    rows={4}
                  />
                ) : null}
                {field.type === 'checkbox' ? (
                  <div className="consent-row">
                    <Checkbox
                      id={field.name}
                      name={field.name}
                      checked={Boolean(values[field.name])}
                      label={field.label}
                      hasError={Boolean(error)}
                      aria-describedby={describedBy}
                      onChange={(checked) => updateValue(field.name, checked)}
                      onBlur={() => handleBlur(field)}
                    />
                    <span className="consent-copy">{field.label}</span>
                  </div>
                ) : null}
              </Field>
            );
          })}
        </div>

        <div className="form-footer">
          <div className="privacy-note"><ShieldCheck size={17} aria-hidden="true" /><span>Your information stays private and secure.</span></div>
          <Button type="submit">Submit request</Button>
        </div>
      </form>

      {submittedValues ? (
        <section className="success-panel" aria-live="polite">
          <div className="success-panel__icon"><CheckCircle2 size={22} aria-hidden="true" /></div>
          <div className="success-panel__content">
            <h2>Request ready to send</h2>
            <p>Validation passed. This demo has no backend, so your submitted values are shown below.</p>
            <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
          </div>
        </section>
      ) : null}
    </>
  );
}
