import type { Meta, StoryObj } from '@storybook/react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['v2'],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
    args: {
        children: 'Hello Fossfolio',
    },
};

export const Outline: Story = {
    args: {
        children: 'Hello Fossfolio',
        variant: 'outline',
    },
};

export const leftIcon: Story = {
    args: {
        children: 'Hello Fossfolio',
        leftIcon: <AiFillCaretLeft />,
    },
};
export const rightIcon: Story = {
    args: {
        children: 'Hello Fossfolio',
        rightIcon: <AiFillCaretRight />,
    },
};
