import type { LeadField, LeadValues } from './leadConfig';
import { isFieldVisible } from './leadConfig';

export type ValidationErrors = Record<string, string>;

/**
 * Pure validation function: same config + values always returns the same errors.
 * Visibility conditions are evaluated before rules so hidden fields are not validated.
 */
export function validateLeadForm(config: LeadField[], values: LeadValues): ValidationErrors {
  const errors: ValidationErrors = {};

  for (const field of config) {
    if (!isFieldVisible(field, values)) continue;

    const rules = field.validations ?? {};
    const rawValue = values[field.name];
    const value = typeof rawValue === 'boolean' ? rawValue : String(rawValue ?? '').trim();

    if (rules.required && (field.type === 'checkbox' ? value !== true : value === '')) {
      errors[field.name] = field.type === 'checkbox'
        ? 'Please provide your consent to continue.'
        : `${field.label} is required.`;
      continue;
    }

    if (typeof value !== 'string' || value === '') continue;

    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      errors[field.name] = 'Enter a valid email address.';
      continue;
    }

    if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
      errors[field.name] = rules.patternMessage ?? `${field.label} has an invalid format.`;
      continue;
    }

    if (rules.maxLength !== undefined && value.length > rules.maxLength) {
      errors[field.name] = `${field.label} must be ${rules.maxLength} characters or fewer.`;
    }
  }

  return errors;
}
