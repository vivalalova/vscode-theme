/**
 * React TSX Example
 * Demonstrates syntax highlighting for React with TypeScript
 */

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  createContext,
  useContext,
  type ReactNode,
  type FC,
  type MouseEvent,
  type ChangeEvent,
} from "react";

// Constants
const MAX_ITEMS = 100;
const API_URL = "https://api.example.com";

// Types
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user" | "guest";
}

interface ThemeContextValue {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

// Props types
interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface CardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

interface UserListProps {
  users: User[];
  onSelect: (user: User) => void;
  selectedId?: number;
}

// Context
const ThemeContext = createContext<ThemeContextValue | null>(null);

const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

// Custom Hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
}

// Components
const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
}) => {
  const baseClasses = "btn";
  const variantClasses = `btn--${variant}`;
  const sizeClasses = `btn--${size}`;

  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses} ${sizeClasses}`}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
    >
      {loading ? (
        <span className="spinner" aria-hidden="true" />
      ) : null}
      {children}
    </button>
  );
};

const Card: FC<CardProps> = ({
  title,
  description,
  children,
  className = "",
}) => (
  <article className={`card ${className}`.trim()}>
    <header className="card__header">
      <h2 className="card__title">{title}</h2>
      {description && (
        <p className="card__description">{description}</p>
      )}
    </header>
    <div className="card__content">{children}</div>
  </article>
);

const UserCard: FC<{ user: User; onEdit: (id: number) => void }> = ({
  user,
  onEdit,
}) => {
  const { theme } = useTheme();

  const roleColors: Record<User["role"], string> = {
    admin: "#F92672",
    user: "#A6E22E",
    guest: "#66D9EF",
  };

  return (
    <div className={`user-card user-card--${theme}`}>
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="user-card__avatar"
        />
      ) : (
        <div className="user-card__avatar-placeholder">
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="user-card__info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <span
          className="user-card__role"
          style={{ color: roleColors[user.role] }}
        >
          {user.role}
        </span>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onEdit(user.id)}
      >
        Edit
      </Button>
    </div>
  );
};

const UserList: FC<UserListProps> = ({ users, onSelect, selectedId }) => {
  const listRef = useRef<HTMLUListElement>(null);

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  );

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>No users found</p>
      </div>
    );
  }

  return (
    <ul ref={listRef} className="user-list" role="listbox">
      {sortedUsers.map((user) => (
        <li
          key={user.id}
          className={`user-list__item ${
            selectedId === user.id ? "user-list__item--selected" : ""
          }`}
          role="option"
          aria-selected={selectedId === user.id}
          onClick={() => onSelect(user)}
        >
          <span className="user-list__name">{user.name}</span>
          <span className="user-list__email">{user.email}</span>
        </li>
      ))}
    </ul>
  );
};

// Form Component
const SearchForm: FC<{
  onSearch: (query: string) => void;
}> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Search users..."
        className="search-form__input"
        aria-label="Search users"
      />
      <Button type="submit" variant="primary">
        Search
      </Button>
    </form>
  );
};

// Provider Component
const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">(
    "theme",
    "dark"
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, [setTheme]);

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

// Main App Component
const App: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/users`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = (await response.json()) as User[];
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = useCallback((query: string) => {
    console.log("Searching for:", query);
  }, []);

  const handleSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  const handleEditUser = useCallback((id: number) => {
    console.log("Editing user:", id);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <span className="spinner" />
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error" role="alert">
        <h2>Error</h2>
        <p>{error}</p>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <main className="app">
        <header className="app__header">
          <h1>User Management</h1>
          <SearchForm onSearch={handleSearch} />
        </header>

        <div className="app__content">
          <aside className="app__sidebar">
            <Card title="Users" description={`${users.length} total`}>
              <UserList
                users={users}
                onSelect={handleSelectUser}
                selectedId={selectedUser?.id}
              />
            </Card>
          </aside>

          <section className="app__main">
            {selectedUser ? (
              <UserCard user={selectedUser} onEdit={handleEditUser} />
            ) : (
              <p className="placeholder">Select a user to view details</p>
            )}
          </section>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default App;
export { Button, Card, UserCard, UserList, ThemeProvider, useTheme };
export type { User, ButtonProps, CardProps, UserListProps };
