import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@bearlab/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    label: "Button",
    buttonType: "justText",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Button",
    buttonType: "justText",
  },
};
