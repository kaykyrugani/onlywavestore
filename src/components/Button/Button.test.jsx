import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('applies primary variant by default', () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByText('Primary Button');
    expect(button).toHaveClass('primary');
  });

  test('applies secondary variant when specified', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByText('Secondary Button');
    expect(button).toHaveClass('secondary');
  });

  test('applies fullWidth class when fullWidth is true', () => {
    render(<Button fullWidth>Full Width Button</Button>);
    const button = screen.getByText('Full Width Button');
    expect(button).toHaveClass('fullWidth');
  });

  test('applies disabled class and attribute when disabled is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText('Disabled Button');
    expect(button).toHaveClass('disabled');
    expect(button).toBeDisabled();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    const button = screen.getByText('Clickable Button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick handler when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled Button</Button>);
    const button = screen.getByText('Disabled Button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
