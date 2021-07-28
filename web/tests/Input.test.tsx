import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Input from '../components/Input'

describe('Input is working correctly', () => {
    test('Input renders properly', () => {
        render(<Input placeholder="input"/>);
        expect(screen.getByPlaceholderText('input')).toBeInTheDocument();
    });
    test('Input can be typed in', () => {
        render(<Input placeholder="input"/>);
        userEvent.type(screen.getByPlaceholderText('input'), 'test')
        expect(screen.getByPlaceholderText('input')).toHaveValue('test')
    });
    test('Input gets correct type', () => {
        render(<Input placeholder="input" type="text"/>);
        expect(screen.getByPlaceholderText('input')).toHaveAttribute('type', 'text');
    });
})
