import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { authService } from '@/services';

// Mock do authService
jest.mock('@/services', () => ({
  authService: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    getCurrentUser: jest.fn(),
  },
}));

// Componente de teste
const TestComponent = () => {
  const { user, login, logout, register } = useAuth();
  const [error, setError] = React.useState(null);

  const handleLogin = async () => {
    try {
      await login('test@example.com', 'password');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {user && <div data-testid="user">{user.name}</div>}
      {error && <div data-testid="error">{error}</div>}
      <button onClick={handleLogin} data-testid="login-button">
        Login
      </button>
      <button onClick={handleRegister} data-testid="register-button">
        Register
      </button>
      <button onClick={logout} data-testid="logout-button">
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful login', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    authService.login.mockResolvedValueOnce({ user: mockUser, token: 'test-token' });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    });
  });

  it('should handle login error', async () => {
    authService.login.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Invalid credentials');
    });
  });

  it('should handle successful registration', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    authService.register.mockResolvedValueOnce({ user: mockUser, token: 'test-token' });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId('register-button'));

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    });
  });

  it('should handle logout', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    authService.login.mockResolvedValueOnce({ user: mockUser, token: 'test-token' });
    authService.logout.mockResolvedValueOnce();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Login first
    fireEvent.click(screen.getByTestId('login-button'));
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    });

    // Then logout
    fireEvent.click(screen.getByTestId('logout-button'));
    await waitFor(() => {
      expect(screen.queryByTestId('user')).not.toBeInTheDocument();
    });
  });
}); 