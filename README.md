# Dynamic Form · Design System

A responsive lead-capture form built with React, TypeScript, and plain CSS. The form is generated from a typed config; validation is centralized and pure. No component library or backend is used.

## Requirements

- Node.js 18.18+ (Node 20 LTS recommended)
- npm

## Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build:

```bash
npm run typecheck
npm run build
npm run preview
```

## Folder layout

```text
src/
├── app/
│   └── App.tsx
├── design-system/
│   ├── tokens.css
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Select.tsx
│   │   └── TextInput.tsx
│   └── molecules/
│       └── Field.tsx
├── features/
│   └── lead/
│       ├── leadConfig.ts
│       ├── leadValidation.ts
│       ├── DynamicLeadForm.tsx
│       ├── LeadPage.tsx
│       └── lead.css
├── main.tsx
└── styles.css
```

## Where things live

- **Tokens:** `src/design-system/tokens.css` defines colors, spacing, type, radii, shadows, and breakpoints.
- **Atoms:** `src/design-system/atoms/` contains reusable text input, select, checkbox, and button controls. They only handle generic values and events.
- **Field molecule:** `src/design-system/molecules/Field.tsx` composes a label, control, hint, and accessible error message.
- **Form renderer:** `src/features/lead/DynamicLeadForm.tsx` maps each config field type to the appropriate atom.
- **Field config:** `src/features/lead/leadConfig.ts` declares field names, types, labels, options, hints, and validation metadata.
- **Validation:** `src/features/lead/leadValidation.ts` contains the pure `validateLeadForm(config, values)` function. It does not mutate state or render UI.
- **Desktop/mobile layout:** `src/features/lead/lead.css` owns the form grid, responsive breakpoints, and mobile sticky submit bar. `src/styles.css` contains global reset and page shell styling.

## Behavior

- Validates fields on blur and validates the complete form on submit.
- Lead type `Company` reveals Company name and makes it required; switching back to `Individual` removes it from active validation and clears its value.
- On invalid submit, every current error is displayed and focus moves to the first invalid field.
- A successful submission displays a formatted JSON preview on the page; no backend is called.
- All controls have labels, visible focus states, and error associations for assistive technology.
