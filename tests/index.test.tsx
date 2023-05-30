import { render, screen } from '@testing-library/react';
import Home from '../app/(site)/page';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading');

    expect(heading).toHaveTextContent('Obelisk');
  });
});