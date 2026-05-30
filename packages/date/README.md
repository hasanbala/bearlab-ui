# @bearlab/date

> Accessible, fully customizable Date Picker component for React applications — supports single, multiple, and range selection; day / month / year / weekday granularity; locale-aware labels; min/max date constraints; built-in time picker with range support; sixteen output formats; native `Date` object / ISO string input; and ISO 8601 output mode for database workflows. No external date library required.

[![npm version](https://img.shields.io/npm/v/@bearlab/date)](https://www.npmjs.com/package/@bearlab/date)
[![license](https://img.shields.io/npm/l/@bearlab/date)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Selection Modes](#selection-modes)
- [Granularity](#granularity)
- [Output Formats](#output-formats)
- [Output Type](#output-type)
- [Native Date Input](#native-date-input)
- [Locale Support](#locale-support)
- [Min / Max Date](#min--max-date)
- [Time Picker](#time-picker)
- [Value Format](#value-format)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)

---

## Features

- ✅ **Three selection modes** — `single`, `multiple`, and `range` via the `mode` prop.
- ✅ **Four selection granularities** — `day`, `month`, `year`, and `weekday` via the `granularity` prop.
- ✅ **Clickable calendar header** — Click the month or year label to jump directly to a month/year picker.
- ✅ **Min / max date constraints** — `minDate` and `maxDate` props disable out-of-range cells and grey out nav buttons.
- ✅ **Locale-aware** — Month names, weekday labels, and `aria-label` text respect the `locale` prop (BCP 47).
- ✅ **Sixteen output formats** — Control exactly how dates appear in the input and callback via `outputFormat`.
- ✅ **ISO output mode** — `outputType="iso"` makes `onDateChange` return ISO 8601 strings (`YYYY-MM-DD` / `YYYY-MM-DDTHH:MM:00`) regardless of display format — ideal for database storage.
- ✅ **Native Date input** — Pass ISO 8601 (`"1995-12-17T03:24:00"`), UTC (`"2020-06-15T00:00:00.000Z"`), or long date strings (`"December 17, 1995"`) directly as `value`. The component parses them automatically.
- ✅ **Time data preservation** — If the incoming `value` contains a time component, it is extracted and pre-selected in the time picker regardless of when `showTimePicker` is added.
- ✅ **Built-in time picker** — `showTimePicker` adds hour/minute selectors; `mode="range"` shows start + end time.
- ✅ **No external dependency** — Built entirely with native React; no flatpickr, date-fns, or Day.js required.
- ✅ **Portal-based calendar** — Rendered via `createPortal` to avoid overflow/z-index clipping issues.
- ✅ **Controlled** — `value` is required; pair with `onDateChange` to keep state in sync.
- ✅ **Slot-based `className` & `style` API** — Granular styling without CSS specificity issues.
- ✅ **Accessible by default** — `aria-expanded`, `aria-haspopup`, `aria-invalid`, `aria-required`, `aria-describedby`, `aria-selected`, `aria-disabled`, `aria-pressed`, and full keyboard support.
- ✅ **Dark mode support** — Natively responds to `[data-theme="dark"]` applied at any ancestor level.
- ✅ **TypeScript-first** — Fully typed props, slot interfaces, and callback signatures.

---

## Installation

```bash
# npm
npm install @bearlab/date

# yarn
yarn add @bearlab/date

# pnpm
pnpm add @bearlab/date
```

> **Peer dependencies:** `react >= 18.0.0` and `react-dom >= 18.0.0` must be installed in your project.

---

## Usage

### Basic

```tsx
import { useState } from "react";
import { Date } from "@bearlab/date";

export default function App() {
  const [value, setValue] = useState("25-05-2026"); // default outputFormat: "DD-MM-YYYY"

  return (
    <Date
      label="Date"
      value={value}
      onDateChange={(dates, str) => setValue(str)}
    />
  );
}
```

### Range mode

Selecting the first date opens the range; selecting the second closes the calendar. The default value format is `"DD-MM-YYYY - DD-MM-YYYY"`.

```tsx
import { useState } from "react";
import { Date } from "@bearlab/date";

export default function App() {
  const [range, setRange] = useState("");

  return (
    <Date
      label="Date Range"
      mode="range"
      value={range}
      placeholder="Select a date range"
      onDateChange={(dates, str) => setRange(str)}
    />
  );
}
```

### Multiple mode

Clicking a date toggles its selection. `value` is a `string[]` and `onDateChange` returns a `string[]`.

```tsx
import { useState } from "react";
import { Date } from "@bearlab/date";

export default function App() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Date
      label="Multiple Dates"
      mode="multiple"
      value={value}
      placeholder="Select dates"
      onDateChange={(_, val) => setValue(val)}
    />
  );
}
```

### Month selection (locale-aware)

```tsx
import { useState } from "react";
import { Date } from "@bearlab/date";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <Date
      label="Ay seç"
      granularity="month"
      locale="tr"
      mode="single"
      value={value}
      onDateChange={(_, str) => setValue(str)} // "2026-05"
    />
  );
}
```

### Year range

```tsx
import { useState } from "react";
import { Date } from "@bearlab/date";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <Date
      label="Year Range"
      granularity="year"
      mode="range"
      value={value}
      onDateChange={(_, str) => setValue(str)} // "2026 - 2030"
    />
  );
}
```

### Weekday picker (multiple)

`value` is a `number[]` of weekday indices (0 = Sun … 6 = Sat). `onDateChange` returns a `number[]`.

```tsx
import { useState } from "react";
import { Date } from "@bearlab/date";

export default function App() {
  const [value, setValue] = useState<number[]>([]);

  return (
    <Date
      label="Çalışma günleri"
      granularity="weekday"
      mode="multiple"
      locale="tr"
      value={value}
      onDateChange={(_, val) => setValue(val)} // [1, 3, 5]
    />
  );
}
```

### Weekday picker (single)

`value` is `number | undefined` (weekday index, or `undefined` when nothing is selected). `onDateChange` returns `number | undefined`.

```tsx
import { useState } from "react";
import { Date } from "@bearlab/date";

export default function App() {
  const [value, setValue] = useState<number | undefined>(undefined);

  return (
    <Date
      label="Gün seç"
      granularity="weekday"
      mode="single"
      locale="tr"
      value={value}
      onDateChange={(_, val) => setValue(val)} // 1 (Monday), or undefined when deselected
    />
  );
}
```

### With time picker

```tsx
import { useState } from "react";
import { Date } from "@bearlab/date";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <Date
      label="Appointment"
      showTimePicker
      minuteStep={15}
      outputFormat="DD MMM YYYY"
      value={value}
      onDateChange={(_, str) => setValue(str)} // "25 May 2026 16:30"
    />
  );
}
```

### Date + time range

```tsx
import { useState } from "react";
import { Date } from "@bearlab/date";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <Date
      label="Meeting window"
      mode="range"
      showTimePicker
      minuteStep={5}
      outputFormat="DD MMM YYYY"
      locale="tr"
      labels={{ time: "Saat", startTime: "Başlangıç", endTime: "Bitiş" }}
      value={value}
      onDateChange={(_, str) => setValue(str)}
      // "25 May 2026 16:30 - 27 May 2026 20:15"
    />
  );
}
```

### Database value (ISO input → ISO output)

```tsx
import { useState } from "react";
import { Date } from "@bearlab/date";

export default function App() {
  // value comes from DB as ISO 8601 — pass it directly, no conversion needed
  const [value, setValue] = useState("1995-12-17T03:24:00");

  return (
    <Date
      label="Kayıt tarihi"
      outputType="iso"
      showTimePicker
      value={value}
      onDateChange={(_, str) => setValue(str)}
      // after selection → "1995-12-25T09:00:00" (still ISO, DB-ready)
    />
  );
}
```

### Min / max date constraints

```tsx
import { useState } from "react";
import { Date } from "@bearlab/date";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <Date
      label="This year only"
      minDate="2026-01-01"
      maxDate="2026-12-31"
      value={value}
      onDateChange={(_, str) => setValue(str)}
    />
  );
}
```

### With error state

```tsx
import { useState } from "react";
import { Date } from "@bearlab/date";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <Date
      label="Date"
      placeholder="Select a date"
      isRequired
      value={value}
      error="Please select a date."
      onDateChange={(_, str) => setValue(str)}
    />
  );
}
```

### Disabled

```tsx
import { Date } from "@bearlab/date";

export default function App() {
  return <Date label="Date" value="2026-05-25" disabled />;
}
```

### With Formik

```tsx
import { Date } from "@bearlab/date";
import { useFormik } from "formik";

export default function App() {
  const formik = useFormik({
    initialValues: { appointmentDate: "" },
    onSubmit: (values) => console.log(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Date
        label="Appointment Date"
        value={formik.values.appointmentDate}
        onDateChange={(_, str) => formik.setFieldValue("appointmentDate", str)}
        error={formik.errors.appointmentDate}
        isRequired
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Props

| Prop             | Type                                | Default           | Required | Description                                                                                                       |
| ---------------- | ----------------------------------- | ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `label`          | `string`                            | —                 | ❌       | Label text rendered above the input                                                                               |
| `name`           | `string`                            | —                 | ❌       | Form field `name` attribute                                                                                       |
| `value`          | See table below                     | —                 | ✅       | Type depends on `mode` + `granularity`. See [Value Format](#value-format).                                        |
| `mode`           | `DateMode`                          | `"single"`        | ❌       | `"single"` \| `"multiple"` \| `"range"`                                                                           |
| `granularity`    | `DateGranularity`                   | `"day"`           | ❌       | `"day"` \| `"month"` \| `"year"` \| `"weekday"`                                                                   |
| `minDate`        | `string`                            | —                 | ❌       | Earliest selectable date — ISO `YYYY-MM-DD`                                                                       |
| `maxDate`        | `string`                            | —                 | ❌       | Latest selectable date — ISO `YYYY-MM-DD`                                                                         |
| `locale`         | `string`                            | `"en-US"`         | ❌       | BCP 47 locale tag (e.g. `"tr"`, `"de"`, `"fr"`)                                                                   |
| `outputFormat`   | `DateOutputFormat`                  | `"DD-MM-YYYY"`    | ❌       | Display/callback format for day-level dates (see [Output Formats](#output-formats))                               |
| `outputType`     | `DateOutputType`                    | `"formatted"`     | ❌       | `"formatted"` uses `outputFormat`; `"iso"` makes `onDateChange` return ISO 8601 (see [Output Type](#output-type)) |
| `showTimePicker` | `boolean`                           | `false`           | ❌       | Show hour/minute selectors below the calendar (`granularity="day"` only)                                          |
| `minuteStep`     | `number`                            | `1`               | ❌       | Minute interval for the time picker (e.g. `5`, `15`, `30`)                                                        |
| `labels`         | `DateLabels`                        | —                 | ❌       | Override UI text labels for i18n (see [Time Picker](#time-picker))                                                |
| `placeholder`    | `string`                            | `"Select a date"` | ❌       | Placeholder text shown when no value is selected                                                                  |
| `error`          | `string`                            | —                 | ❌       | Error message displayed below the input                                                                           |
| `disabled`       | `boolean`                           | `false`           | ❌       | Disables the input and prevents the calendar from opening                                                         |
| `isRequired`     | `boolean`                           | `false`           | ❌       | Marks the field as required (adds `*` to label and `aria-required`)                                               |
| `calendarZIndex` | `number`                            | `8888`            | ❌       | Z-index of the portal-rendered calendar                                                                           |
| `onDateChange`   | Typed per variant — see below       | —                 | ❌       | TypeScript infers the exact callback type from `mode` + `granularity`. No type assertion needed at call site.     |
| `className`      | [`DateClassNames`](#dateclassnames) | —                 | ❌       | Per-slot className overrides                                                                                      |
| `style`          | [`DateStyles`](#datestyles)         | —                 | ❌       | Per-slot inline style overrides                                                                                   |

---

## Selection Modes

| Mode         | Behavior                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------- |
| `"single"`   | Selects one item. Clicking a selected item deselects it. Calendar closes after selection. |
| `"multiple"` | Toggles each clicked item. Calendar stays open.                                           |
| `"range"`    | First click sets the start; second click sets the end and closes the calendar.            |

Range selection applies to all granularities. For example, `mode="range"` with `granularity="month"` lets users pick a start month and end month.

---

## Granularity

The `granularity` prop controls what the user selects and which picker is shown.

| Value       | Picker shown      | `value` format                                   |
| ----------- | ----------------- | ------------------------------------------------ |
| `"day"`     | Full calendar     | Matches `outputFormat` (default: `"DD-MM-YYYY"`) |
| `"month"`   | Month grid (3×4)  | `"YYYY-MM"` or `"MM-YYYY"` (e.g. `"2026-05"`)    |
| `"year"`    | Year grid (3×4)   | `"YYYY"` (e.g. `"2026"`)                         |
| `"weekday"` | 7 weekday buttons | Weekday index string (e.g. `"1"` or `"1,3,5"`)   |

For `mode="multiple"`, `value` is an array (`string[]` for day/month/year, `number[]` for weekday). For `mode="range"`, `value` is a string joined with `-`.

```tsx
// Month range
<Date granularity="month" mode="range" value="2026-03 - 2026-06" onDateChange={...} />

// Multiple weekdays (Mon=1, Wed=3, Fri=5) — val inferred as number[], no cast needed
<Date granularity="weekday" mode="multiple" value={[1, 3, 5]} onDateChange={(_, val) => setDays(val)} />

// Single weekday — val inferred as number | undefined
<Date granularity="weekday" value={day} onDateChange={(_, val) => setDay(val)} />

// Multiple days — val inferred as string[], no cast needed
<Date mode="multiple" value={["05-05-2026", "12-05-2026"]} onDateChange={(_, val) => setDates(val)} />
```

### Calendar header navigation

When `granularity="day"`, clicking the **month name** in the header switches the calendar to a month picker so you can navigate quickly. Clicking the **year** switches to a year picker. Selecting an entry drills back down to the day view.

---

## Output Formats

The `outputFormat` prop controls how the date appears in the input field, what the `value` prop expects, and what `onDateChange` returns as `currentDateString` when `outputType="formatted"`. It applies to `granularity="day"` only.

| Format                     | Example output |
| -------------------------- | -------------- |
| `"DD-MM-YYYY"` _(default)_ | `25-05-2026`   |
| `"YYYY-MM-DD"`             | `2026-05-25`   |
| `"MM-DD-YYYY"`             | `05-25-2026`   |
| `"YYYY-DD-MM"`             | `2026-25-05`   |
| `"DD MMM YYYY"`            | `25 May 2026`  |
| `"MMM DD YYYY"`            | `May 25 2026`  |
| `"YYYY MMM DD"`            | `2026 May 25`  |
| `"YYYY DD MMM"`            | `2026 25 May`  |
| `"DD/MM/YYYY"`             | `25/05/2026`   |
| `"MM/DD/YYYY"`             | `05/25/2026`   |
| `"YYYY/MM/DD"`             | `2026/05/25`   |
| `"YYYY/DD/MM"`             | `2026/25/05`   |
| `"DD.MM.YYYY"`             | `25.05.2026`   |
| `"MM.DD.YYYY"`             | `05.25.2026`   |
| `"YYYY.MM.DD"`             | `2026.05.25`   |
| `"YYYY.DD.MM"`             | `2026.25.05`   |

Month abbreviations in `MMM`-containing formats respect the `locale` prop.

```tsx
// Turkish locale → "25 May 2026" or "25 Oca 2026"
<Date locale="tr" outputFormat="DD MMM YYYY" />

// ISO-style but day before month
<Date outputFormat="YYYY-DD-MM" value="2026-25-05" />
```

> **Note:** `outputFormat` only affects `granularity="day"`. For `granularity="month"`, the display uses the full locale month name (e.g. `"May 2026"`). For `granularity="year"`, the display is the year number. These are not affected by `outputFormat`.

---

## Output Type

The `outputType` prop controls what the `onDateChange` callback returns. The **display** in the input field is always in `outputFormat` regardless of `outputType`.

| `outputType`              | `onDateChange` string (without time)        | `onDateChange` string (with `showTimePicker`) |
| ------------------------- | ------------------------------------------- | --------------------------------------------- |
| `"formatted"` _(default)_ | In `outputFormat` e.g. `"25-05-2026"`       | e.g. `"25-05-2026 16:30"`                     |
| `"iso"`                   | ISO 8601 `"YYYY-MM-DD"` e.g. `"2026-05-25"` | ISO with time `"2026-05-25T16:30:00"`         |

### When to use `outputType="iso"`

Use `"iso"` when your backend stores dates as ISO 8601 strings. This lets you pass the raw DB value directly as `value` and get a DB-ready string back from `onDateChange` — no conversion needed on either end.

```tsx
// DB record: { scheduledAt: "1995-12-17T03:24:00" }
const [value, setValue] = useState(record.scheduledAt);

<Date
  label="Scheduled at"
  outputType="iso"
  showTimePicker
  value={value}
  onDateChange={(_, str) => setValue(str)}
  // onDateChange → "1995-12-25T09:00:00"  (still ISO, save directly to DB)
/>;
```

### Range with ISO output

```tsx
<Date
  mode="range"
  outputType="iso"
  showTimePicker
  value="2026-05-10T09:00:00 - 2026-05-20T18:00:00"
  onDateChange={(_, str) => console.log(str)}
  // → "2026-05-10T09:00:00 - 2026-05-20T18:00:00"
/>
```

> **Note:** `outputType="iso"` does not affect `granularity="month"`, `"year"`, or `"weekday"` — those have their own fixed formats.

---

## Native Date Input

The `value` prop accepts any of the following string formats for `granularity="day"` — no manual conversion required:

| Input format                      | Example                               |
| --------------------------------- | ------------------------------------- |
| Component format (`outputFormat`) | `"25-05-2026"` (DD-MM-YYYY default)   |
| ISO 8601 with time                | `"1995-12-17T03:24:00"`               |
| ISO 8601 with UTC offset          | `"2020-06-15T00:00:00.000Z"`          |
| ISO date only                     | `"2026-05-25"`                        |
| Long date string                  | `"December 17, 1995"`                 |
| `new Date().toString()` output    | `"Sun Dec 17 1995 03:24:00 GMT+0300"` |

The component parses these automatically and re-displays them in `outputFormat`. If the incoming value contains a time component (`T03:24:00`, etc.), that time is pre-selected in the time picker when `showTimePicker` is enabled.

```tsx
// All of these work as initial values:
const [v1, setV1] = useState("1995-12-17T03:24:00");
const [v2, setV2] = useState("2020-06-15T00:00:00.000Z");
const [v3, setV3] = useState("December 17, 1995");

<Date value={v1} showTimePicker onDateChange={(_, s) => setV1(s)} />
// displays "17-12-1995 03:24", time picker pre-set to 03:24

<Date value={v2} showTimePicker onDateChange={(_, s) => setV2(s)} />
// displays "15-06-2020 00:00"

<Date value={v3} onDateChange={(_, s) => setV3(s)} />
// displays "17-12-1995"
```

> **Time state is always preserved.** Even when `showTimePicker` is not set, the time component is extracted from the incoming value and kept in internal state. Adding `showTimePicker` later will correctly display the pre-existing time — you won't lose it.

---

## Locale Support

Pass a BCP 47 language tag to `locale`. This affects:

- Month names in the calendar header and month picker
- Weekday labels in the day grid and weekday picker
- `aria-label` text on each day button
- Month abbreviations used by `MMM`-containing `outputFormat` values

```tsx
<Date locale="tr" />       // Türkçe aylar, günler
<Date locale="de" />       // Deutsch
<Date locale="fr-FR" />    // Français
<Date locale="ja" />       // 日本語
<Date locale="ar" />       // العربية
```

---

## Min / Max Date

`minDate` and `maxDate` accept ISO `YYYY-MM-DD` strings. Cells outside the allowed range are visually disabled (greyed out) and cannot be clicked. Navigation arrows are disabled when the adjacent period is fully outside the range.

```tsx
// Only 2026
<Date minDate="2026-01-01" maxDate="2026-12-31" />

// Only Q2 months
<Date granularity="month" minDate="2026-04-01" maxDate="2026-06-30" />

// Only years 2020–2030
<Date granularity="year" minDate="2020-01-01" maxDate="2030-12-31" />
```

---

## Time Picker

Add `showTimePicker` to display hour/minute selectors below the calendar. Only available for `granularity="day"`.

```tsx
// Single date + time
<Date showTimePicker minuteStep={15} outputFormat="DD MMM YYYY" />
// callback str → "25 May 2026 16:30"

// Date range + independent start and end times (default outputFormat)
<Date mode="range" showTimePicker minuteStep={5} />
// callback str → "25-05-2026 16:30 - 27-05-2026 20:15"
```

- **`minuteStep`** — Minute interval (default `1`). Use `5`, `15`, or `30` for coarser options.
- The calendar stays open after a date is selected so the user can pick the time before closing.
- For `mode="range"`, the end-time selector appears once both dates are chosen.
- If the incoming `value` contains a time component (e.g. from a DB field), it is automatically pre-selected.

### Customising labels

```tsx
<Date
  showTimePicker
  mode="range"
  labels={{
    time: "Saat",
    startTime: "Başlangıç",
    endTime: "Bitiş",
  }}
/>
```

### `DateLabels`

| Field         | Default          | Description                              |
| ------------- | ---------------- | ---------------------------------------- |
| `time`        | `"Time"`         | Label shown in single-date time picker   |
| `startTime`   | `"Start"`        | Label shown for start time in range mode |
| `endTime`     | `"End"`          | Label shown for end time in range mode   |
| `previous`    | `"Previous"`     | `aria-label` for the ← nav button        |
| `next`        | `"Next"`         | `aria-label` for the → nav button        |
| `selectMonth` | `"Select month"` | `aria-label` for the month button        |
| `selectYear`  | `"Select year"`  | `aria-label` for the year button         |

---

## Value Format

The `value` prop and the `currentDateString` argument of `onDateChange` follow these formats:

### `granularity="day"` — `outputType="formatted"` (default)

Both `value` and the callback use `outputFormat`. The examples below use the default `"DD-MM-YYYY"`.

| Mode         | `value` prop type | Example                                      |
| ------------ | ----------------- | -------------------------------------------- |
| `"single"`   | `string`          | `"25-05-2026"`                               |
| `"multiple"` | `string[]`        | `["05-05-2026", "12-05-2026", "20-05-2026"]` |
| `"range"`    | `string`          | `"10-05-2026 - 25-05-2026"`                  |

With `showTimePicker`:

| Mode       | Format example                          |
| ---------- | --------------------------------------- |
| `"single"` | `"25-05-2026 16:30"`                    |
| `"range"`  | `"25-05-2026 16:30 - 27-05-2026 20:15"` |

### `granularity="day"` — `outputType="iso"`

The callback value is always ISO 8601, independent of `outputFormat`.

| Mode         | `value` type | Without time                | With time (`showTimePicker`)                  |
| ------------ | ------------ | --------------------------- | --------------------------------------------- |
| `"single"`   | `string`     | `"2026-05-25"`              | `"2026-05-25T16:30:00"`                       |
| `"multiple"` | `string[]`   | `["2026-05-25", ...]`       | `["2026-05-25T16:30:00", ...]`                |
| `"range"`    | `string`     | `"2026-05-10 - 2026-05-25"` | `"2026-05-10T09:00:00 - 2026-05-25T18:00:00"` |

> The `value` prop also accepts ISO strings when `outputType="iso"` — pass the DB value directly.

### `granularity="month"`

| Mode         | `value` type | Example                             |
| ------------ | ------------ | ----------------------------------- |
| `"single"`   | `string`     | `"2026-05"`                         |
| `"multiple"` | `string[]`   | `["2026-03", "2026-05", "2026-07"]` |
| `"range"`    | `string`     | `"2026-03 - 2026-06"`               |

The display in the input uses locale-aware month names (e.g. `"May 2026"` or `"March 2026 - June 2026"`).

### `granularity="year"`

| Mode         | `value` type | Example                    |
| ------------ | ------------ | -------------------------- |
| `"single"`   | `string`     | `"2026"`                   |
| `"multiple"` | `string[]`   | `["2024", "2025", "2026"]` |
| `"range"`    | `string`     | `"2024 - 2028"`            |

### `granularity="weekday"`

| Mode         | `value` type          | Callback type         | Example     | Display (locale-aware long names)     |
| ------------ | --------------------- | --------------------- | ----------- | ------------------------------------- |
| `"single"`   | `number \| undefined` | `number \| undefined` | `1`         | `"Monday"` (or empty when deselected) |
| `"multiple"` | `number[]`            | `number[]`            | `[1, 3, 5]` | `"Monday, Wednesday, Friday"`         |

Weekday indices: 0 = Sunday, 1 = Monday … 6 = Saturday.

> Clicking an already-selected item in `"single"` mode deselects it. In `"range"` mode, clicking the start item again resets the selection.

---

## Slot-based Customization

The component follows the **Slot Pattern** to provide deep customization without CSS specificity issues.

### `DateClassNames`

| Slot           | Targets                              |
| -------------- | ------------------------------------ |
| `root`         | Outermost container `<div>`          |
| `label`        | Label `<label>`                      |
| `inputWrapper` | Wrapper `<div>` around the `<input>` |
| `input`        | The read-only `<input>` element      |
| `calendarIcon` | The calendar icon `<span>`           |
| `errorMessage` | The error message container `<div>`  |

```tsx
<Date
  label="Date"
  className={{
    root: "my-date-root",
    input: "my-custom-input",
    label: "my-label",
    errorMessage: "my-error",
  }}
/>
```

### `DateStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Date
  label="Date"
  style={{
    root: { maxWidth: "320px" },
    inputWrapper: { borderRadius: "12px" },
    label: { fontWeight: 700 },
  }}
/>
```

---

## Theme Management

The `Date` component features a built-in theme architecture. It natively responds to the **`[data-theme="dark"]`** attribute applied at any ancestor element (e.g., `<html>` or `<body>`). Both the input trigger and the portal-rendered calendar switch themes automatically.

```html
<html data-theme="dark">
  ...
</html>
```

In dark mode, the following tokens are automatically adjusted:

| Element                | Dark value                  |
| ---------------------- | --------------------------- |
| Input border           | `#1d2939`                   |
| Input focus ring       | `#465fff21`                 |
| Input background       | `#111827`                   |
| Input text             | `rgba(255, 255, 255, 0.9)`  |
| Label color            | `#98a2b3`                   |
| Calendar surface       | `#1a2231`                   |
| Calendar border        | `rgba(255, 255, 255, 0.05)` |
| Day text               | `rgba(255, 255, 255, 0.9)`  |
| Range background       | `rgba(255, 255, 255, 0.12)` |
| Disabled day text      | `rgba(255, 255, 255, 0.2)`  |
| Time select background | `#111827`                   |
| Time select border     | `#1d2939`                   |

---

## Design Tokens (Customization)

Beyond slots, the component uses a `--bearlab-date-*` CSS custom property system. Override any token in your own stylesheet — changes apply globally to all instances.

```css
/* Layout & sizing */
:root {
  --bearlab-date-height: 2.75rem; /* 44px — input height */
  --bearlab-date-border-radius: 0.5rem; /* 8px  — input border radius */
  --bearlab-date-border-width: 0.125rem; /* 2px  — input border width */
  --bearlab-date-padding-x: 1rem; /* 16px — input horizontal padding */
  --bearlab-date-font-size: 0.875rem; /* 14px — input font size */
  --bearlab-date-calendar-width: 18.75rem; /* 300px — calendar popup width */
  --bearlab-date-calendar-border-radius: 0.75rem; /* 12px */
  --bearlab-date-day-size: 2.25rem; /* 36px — day cell size */
  --bearlab-date-day-border-radius: 0.5rem; /* 8px  — day cell border radius */
  --bearlab-date-picker-cell-height: 2.5rem; /* 40px — month/year cell height */
}

/* Dark mode overrides */
[data-theme="dark"] {
  --bearlab-date-border-color: #1d2939;
  --bearlab-date-color: rgba(255, 255, 255, 0.9);
  --bearlab-date-background: #111827;
  --bearlab-date-calendar-bg: #1a2231;
  --bearlab-date-calendar-border-color: rgba(255, 255, 255, 0.05);
  --bearlab-date-day-color: rgba(255, 255, 255, 0.9);
  --bearlab-date-day-selected-bg: #465fff;
  --bearlab-date-range-bg: rgba(255, 255, 255, 0.12);
  --bearlab-date-day-disabled-color: rgba(255, 255, 255, 0.2);
  --bearlab-date-time-select-bg: #111827;
  --bearlab-date-time-select-border: #1d2939;
}
```

## Accessibility

This component adheres to **WCAG 2.1 AA** standards:

- **Semantic labeling** (`htmlFor` + `useId()`) — The `<label>` is correctly associated with the input via a stable generated ID. Screen readers announce the label on focus.
- **`aria-expanded`** — Set to `true` when the calendar is open, communicating the popup state to assistive technologies.
- **`aria-haspopup="true"`** — Signals that the input triggers a popup element.
- **`aria-invalid`** — Automatically set to `true` when the `error` prop is present, alerting assistive technologies to the invalid state.
- **`aria-required`** — Set when `isRequired` is `true`.
- **`aria-describedby`** — Dynamically links the error message container to the input so screen readers announce errors.
- **`role="status"` + `aria-live="polite"`** — The error container uses a live region so errors are announced non-intrusively.
- **`aria-selected`** — Day, month, year, and weekday cells report their selected state.
- **`aria-current="date"`** — Today's date is flagged for assistive technologies.
- **`aria-disabled`** — Dates outside the `minDate`/`maxDate` range are marked as disabled.
- **`aria-pressed`** — Weekday picker buttons use `aria-pressed` to communicate toggle state.
- **`aria-label`** on each day — Uses `date.toLocaleDateString(locale, { dateStyle: "long" })` so the spoken date respects the component's `locale`.
- **`role="dialog"`** on the calendar popup.
- **`role="grid"` / `role="gridcell"`** — The days grid uses semantic grid roles for screen reader navigation.
- **Keyboard support** — `Enter` / `Space` opens and closes the calendar; `Escape` dismisses it; `Tab` closes by moving focus away.
- **`aria-hidden="true"`** — Decorative icons are hidden from the accessibility tree.

---

## TypeScript

All public types are exported from the package:

```ts
import type {
  DateProps,
  DateClassNames,
  DateStyles,
  DateMode,
  DateGranularity,
  DateOutputFormat,
  DateOutputType,
} from "@bearlab/date";
```

### `DateMode`

```ts
type DateMode = "single" | "multiple" | "range";
```

### `DateGranularity`

```ts
type DateGranularity = "day" | "month" | "year" | "weekday";
```

### `DateOutputFormat`

```ts
type DateOutputFormat =
  | "DD-MM-YYYY" // 25-05-2026
  | "YYYY-MM-DD" // 2026-05-25
  | "MM-DD-YYYY" // 05-25-2026
  | "YYYY-DD-MM" // 2026-25-05
  | "DD MMM YYYY" // 25 May 2026
  | "MMM DD YYYY" // May 25 2026
  | "YYYY MMM DD" // 2026 May 25
  | "YYYY DD MMM" // 2026 25 May
  | "DD/MM/YYYY" // 25/05/2026
  | "MM/DD/YYYY" // 05/25/2026
  | "YYYY/MM/DD" // 2026/05/25
  | "YYYY/DD/MM" // 2026/25/05
  | "DD.MM.YYYY" // 25.05.2026
  | "MM.DD.YYYY" // 05.25.2026
  | "YYYY.MM.DD" // 2026.05.25
  | "YYYY.DD.MM"; // 2026.25.05
```

### `DateOutputType`

```ts
type DateOutputType =
  | "formatted" // onDateChange returns string in outputFormat (default)
  | "iso"; // onDateChange returns ISO 8601 string (YYYY-MM-DD or YYYY-MM-DDTHH:MM:00)
```

### `DateProps`

`DateProps` is a discriminated union — TypeScript automatically narrows `value` and the `onDateChange` callback type based on the `mode` and `granularity` props you pass. No type assertion (`as string[]`, `as number[]`, etc.) is ever needed.

```ts
// granularity="weekday" + mode="single" (default)
interface DatePropsWeekdaySingle {
  granularity: "weekday";
  mode?: "single";
  value: number | undefined;
  onDateChange?: (dates: Date[], value: number | undefined) => void;
  // ...shared props
}

// granularity="weekday" + mode="multiple"
interface DatePropsWeekdayMultiple {
  granularity: "weekday";
  mode: "multiple";
  value: number[];
  onDateChange?: (dates: Date[], value: number[]) => void;
  // ...shared props
}

// mode="multiple" (non-weekday)
interface DatePropsMultiple {
  granularity?: "day" | "month" | "year";
  mode: "multiple";
  value: string[];
  onDateChange?: (dates: Date[], value: string[]) => void;
  // ...shared props
}

// mode="single" | "range" (non-weekday, default)
interface DatePropsDefault {
  granularity?: "day" | "month" | "year";
  mode?: "single" | "range";
  value: string;
  onDateChange?: (dates: Date[], value: string) => void;
  // ...shared props
}

type DateProps =
  | DatePropsWeekdaySingle
  | DatePropsWeekdayMultiple
  | DatePropsMultiple
  | DatePropsDefault;
```

Usage — TypeScript infers the callback value type automatically:

```tsx
// val: string[]
<Date mode="multiple" value={dates} onDateChange={(_, val) => setDates(val)} />

// val: number[]
<Date granularity="weekday" mode="multiple" value={days} onDateChange={(_, val) => setDays(val)} />

// val: number | undefined
<Date granularity="weekday" value={day} onDateChange={(_, val) => setDay(val)} />

// val: string
<Date value={date} onDateChange={(_, val) => setDate(val)} />
```

### `DateClassNames`

```ts
interface DateClassNames {
  root?: string;
  label?: string;
  inputWrapper?: string;
  input?: string;
  calendarIcon?: string;
  errorMessage?: string;
}
```

### `DateStyles`

```ts
interface DateStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  inputWrapper?: React.CSSProperties;
  input?: React.CSSProperties;
  calendarIcon?: React.CSSProperties;
  errorMessage?: React.CSSProperties;
}
```

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
