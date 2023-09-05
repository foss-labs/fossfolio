import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    tags: ["v2"],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
    args: {
        children: "Hello Fossfolio"
    }
};

export const Secondary: Story = {
    args: {
        children: "Hello Fossfolio",
        variant: "outline"
    }
};

export const Star: Story = {
    args: {
        children: "Hello Fossfolio",
        variant: "outline"

    }
};

export const Danger: Story = {
    args: {
        children: "Hello Fossfolio",
        variant: "outline"

    }
};

export const Plain: Story = {
    args: {
        children: "Hello Fossfolio",
        variant: "outline"
    }
};

export const Disabled: Story = {
    args: {
        children: "Hello Fossfolio",
        disabled: true
    }
};

export const FullWidth: Story = {
    args: {
        children: "Hello Fossfolio",
    }
};

export const Loading: Story = {
    args: {
        children: "Hello Fossfolio",
        isLoading: true
    }
};

// export const LeftIcon: Story = {
//     args: {
//         children: "Hello Fossfolio",
//         leftIcon: <FontAwesomeIcon icon={faPlus} className="pr-0.5" />
//     }
// };

// export const RightIcon: Story = {
//     args: {
//         children: "Hello Fossfolio",
//         rightIcon: <FontAwesomeIcon icon={faPlus} className="pr-0.5" />
//     }
// };