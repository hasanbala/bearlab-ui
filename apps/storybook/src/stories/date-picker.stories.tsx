import type { Meta, StoryObj } from "@storybook/react-vite";
import { Date } from "@bearlab/date";

const meta: Meta<typeof Date> = {
  title: "Components/Date",
  component: Date,
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Date>;

export const Default: Story = {
  args: {
    label: "Date",
    value: "",
    placeholder: "Select a date",
  },
};

export const WithValue: Story = {
  args: {
    label: "Date with Default Value",
    value: "2025-05-20",
    placeholder: "Select a date",
  },
};

export const Required: Story = {
  args: {
    label: "Date",
    value: "",
    placeholder: "Select a date",
    isRequired: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Date",
    value: "",
    placeholder: "Select a date",
    isRequired: true,
    error: "Please select a date",
  },
};

export const Disabled: Story = {
  args: {
    label: "Date (Disabled)",
    value: "2025-05-20",
    placeholder: "Select a date",
    disabled: true,
  },
};

export const RangeMode: Story = {
  args: {
    label: "Date Range",
    placeholder: "Select a date range",
    mode: "range",
    value: "2025-05-10 to 2025-05-20",
  },
};

export const MultipleMode: Story = {
  args: {
    label: "Multiple Dates",
    placeholder: "Select dates",
    mode: "multiple",
    value: "2025-05-05, 2025-05-12, 2025-05-20",
  },
};
