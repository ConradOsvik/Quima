import React from 'react'
import { render, screen } from '@testing-library/react'

import Button from '../components/Button'

describe('Button is working correctly', () => {
    test('Button renders properly', () => {
      render(<Button>test</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
    test('buttons content is correct', () => {
      render(<Button>test</Button>);
      expect(screen.getByRole('button').textContent).toEqual('test');
    });
});