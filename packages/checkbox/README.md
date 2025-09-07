# Checkbox Component

A fully accessible and customizable checkbox component with support for labels, error states, and tooltips.

## Installation

```bash
npm install @bearlab/checkbox
```

## Usage

```tsx
import { Checkbox } from '@bearlab/checkbox';

// Basic checkbox
<Checkbox
  checked={isChecked}
  onChange={handleChange}
/>

// Checkbox with label
<Checkbox
  checked={acceptTerms}
  onChange={setAcceptTerms}
  label="I accept the terms and conditions"
/>

// Required checkbox with error
<Checkbox
  checked={isRequired}
  onChange={setIsRequired}
  label="This field is required"
  isRequired={true}
  error={validationError}
/>
```

## Props

| Prop         | Type                                                   | Default      | Description                     |
| ------------ | ------------------------------------------------------ | ------------ | ------------------------------- |
| `checked`    | `boolean`                                              | **Required** | Whether the checkbox is checked |
| `onChange`   | `(event: React.ChangeEvent<HTMLInputElement>) => void` | **Required** | Change handler function         |
| `label`      | `string`                                               | `undefined`  | Label text for the checkbox     |
| `disabled`   | `boolean`                                              | `false`      | Disables the checkbox           |
| `error`      | `any`                                                  | `undefined`  | Error message to display        |
| `isRequired` | `boolean`                                              | `false`      | Shows required asterisk (\*)    |
| `popover`    | `string`                                               | `undefined`  | Tooltip text                    |
| `className`  | `string`                                               | `undefined`  | Additional CSS classes          |
| `name`       | `string`                                               | `undefined`  | Input name attribute            |

Plus all standard HTML input attributes (excluding `popover`).

## Examples

### Basic Usage

```tsx
const [isChecked, setIsChecked] = useState(false);

<Checkbox
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
  label="Enable notifications"
/>;
```

### Form Integration

```tsx
const [formData, setFormData] = useState({
  newsletter: false,
  terms: false,
  privacy: false,
});

<form>
  <Checkbox
    name="newsletter"
    checked={formData.newsletter}
    onChange={(e) =>
      setFormData({
        ...formData,
        newsletter: e.target.checked,
      })
    }
    label="Subscribe to newsletter"
  />

  <Checkbox
    name="terms"
    checked={formData.terms}
    onChange={(e) =>
      setFormData({
        ...formData,
        terms: e.target.checked,
      })
    }
    label="I accept the terms of service"
    isRequired={true}
  />
</form>;
```

### With Error Handling

```tsx
const [agreed, setAgreed] = useState(false);
const [error, setError] = useState("");

const handleSubmit = () => {
  if (!agreed) {
    setError("You must agree to the terms");
    return;
  }
  setError("");
  // Proceed with submission
};

<Checkbox
  checked={agreed}
  onChange={(e) => {
    setAgreed(e.target.checked);
    if (e.target.checked) setError("");
  }}
  label="I agree to the terms and conditions"
  isRequired={true}
  error={error}
/>;
```

### Disabled State

```tsx
<Checkbox
  checked={true}
  onChange={() => {}}
  label="This option is disabled"
  disabled={true}
/>

<Checkbox
  checked={false}
  onChange={() => {}}
  label="This option is also disabled"
  disabled={true}
/>
```

### With Tooltip

```tsx
<Checkbox
  checked={receiveEmails}
  onChange={setReceiveEmails}
  label="Email notifications"
  popover="Receive email updates about your account activity"
/>
```

### Multiple Checkboxes

```tsx
const [permissions, setPermissions] = useState({
  read: true,
  write: false,
  delete: false,
  admin: false,
});

const handlePermissionChange =
  (permission: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPermissions({
      ...permissions,
      [permission]: e.target.checked,
    });
  };

<div>
  <Checkbox
    checked={permissions.read}
    onChange={handlePermissionChange("read")}
    label="Read access"
  />

  <Checkbox
    checked={permissions.write}
    onChange={handlePermissionChange("write")}
    label="Write access"
  />

  <Checkbox
    checked={permissions.delete}
    onChange={handlePermissionChange("delete")}
    label="Delete access"
    popover="Allows deletion of resources"
  />

  <Checkbox
    checked={permissions.admin}
    onChange={handlePermissionChange("admin")}
    label="Admin access"
    isRequired={true}
    popover="Full administrative privileges"
  />
</div>;
```

### Checkbox Group with Validation

```tsx
const [interests, setInterests] = useState<string[]>([]);
const [error, setError] = useState("");

const interestOptions = [
  { id: "tech", label: "Technology" },
  { id: "sports", label: "Sports" },
  { id: "music", label: "Music" },
  { id: "travel", label: "Travel" },
];

const handleInterestChange =
  (interestId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setInterests([...interests, interestId]);
    } else {
      setInterests(interests.filter((id) => id !== interestId));
    }

    if (interests.length >= 1 || e.target.checked) {
      setError("");
    }
  };

const validate = () => {
  if (interests.length === 0) {
    setError("Please select at least one interest");
    return false;
  }
  return true;
};

<fieldset>
  <legend>Select your interests:</legend>
  {interestOptions.map((option) => (
    <Checkbox
      key={option.id}
      checked={interests.includes(option.id)}
      onChange={handleInterestChange(option.id)}
      label={option.label}
      error={error && interests.length === 0 ? error : undefined}
    />
  ))}
</fieldset>;
```

## Visual States

The checkbox component supports several visual states:

- **Unchecked**: Default state
- **Checked**: Shows check mark icon
- **Disabled**: Grayed out and non-interactive
- **Error**: Red border and error message
- **Required**: Shows asterisk (\*) next to label

## Accessibility

- Semantic `<input type="checkbox">` element
- Proper `<label>` association
- ARIA attributes for error states
- Keyboard navigation support (Space to toggle)
- Screen reader friendly
- Focus management
- High contrast support

## Styling

Uses CSS modules with these classes:

- `.container` - Main wrapper element
- `.checkboxWrapper` - Checkbox input container
- `.iconChecked` - Checked state icon
- `.iconDisabled` - Disabled state icon
- `.label` - Label text styling
- `.disabled` - Disabled state styling
- `.popover` - Tooltip positioning

## Icons

The component uses icons from `@bearlab/core`:

- `IconChecked` - Displayed when checked
- `IconDisabled` - Displayed when disabled

## TypeScript Support

Full TypeScript support with proper type definitions extending HTML input element props.

## Dependencies

- `@bearlab/core` - Icon components
- `@bearlab/view-error` - Error display component
- `@bearlab/popover` - Tooltip component

## License

MIT
