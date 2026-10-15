export type FieldType = 'text' | 'email' | 'select' | 'textarea' | 'checkbox';

export type ValidationRules = {
  required?: boolean;
  email?: boolean;
  pattern?: string;
  patternMessage?: string;
  maxLength?: number;
};

export type LeadField = {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  hint?: string;
  options?: { label: string; value: string }[];
  validations?: ValidationRules;
  condition?: { field: string; equals: string };
  fullWidth?: boolean;
};

export const leadFormConfig: LeadField[] = [
  {
    name: 'fullName', type: 'text', label: 'Full name',
    placeholder: 'e.g. Alex Morgan', validations: { required: true },
  },
  {
    name: 'email', type: 'email', label: 'Work email',
    placeholder: 'you@company.com', validations: { required: true, email: true },
  },
  {
    name: 'leadType', type: 'select', label: 'Lead type',
    options: [{ label: 'Individual', value: 'Individual' }, { label: 'Company', value: 'Company' }],
    validations: { required: true }, hint: 'Choose who this request is for.',
  },
  {
    name: 'companyName', type: 'text', label: 'Company name',
    placeholder: 'Your company', validations: { required: true },
    condition: { field: 'leadType', equals: 'Company' },
  },
  {
    name: 'phone', type: 'text', label: 'Phone number',
    placeholder: '10-digit mobile number',
    hint: 'Enter a 10-digit phone number without the country code.',
    validations: { required: true, pattern: '^\\d{10}$', patternMessage: 'Enter exactly 10 digits.' },
  },
  {
    name: 'notes', type: 'textarea', label: 'Notes',
    placeholder: 'Tell us a little about what you need…',
    hint: 'Optional · Up to 200 characters.', validations: { maxLength: 200 }, fullWidth: true,
  },
  {
    name: 'consent', type: 'checkbox', label: 'I agree to be contacted about this request.',
    validations: { required: true }, fullWidth: true,
  },
];

export type LeadValues = Record<string, string | boolean>;

export const initialLeadValues: LeadValues = {
  fullName: '',
  email: '',
  leadType: '',
  companyName: '',
  phone: '',
  notes: '',
  consent: false,
};

export function isFieldVisible(field: LeadField, values: LeadValues): boolean {
  if (!field.condition) return true;
  return String(values[field.condition.field] ?? '') === field.condition.equals;
}
