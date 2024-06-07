import type { Meta, StoryObj } from "@storybook/react";
import { Truncate } from "./Truncate";

const meta: Meta<typeof Truncate> = {
  title: "Components/Truncate",
  component: Truncate,
  tags: ["v2"],
};

export default meta;

type Story = StoryObj<typeof Truncate>;

export const Primary: Story = {
  args: {
    text: "This is a long long text",
  },
};
