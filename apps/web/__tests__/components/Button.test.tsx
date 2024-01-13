import { Button } from '@app/components/ui/Button';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Button Test in design system', () => {
    it('Button is disabled', () => {
        render(<Button isDisabled>Test</Button>);

        const btn = screen.getByText('Test').closest('button');

        expect(btn?.disabled).toBeTruthy();
    });
});
