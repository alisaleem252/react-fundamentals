import { createContext, useContext, useState, ReactNode } from 'react';

/**
 * USECONTEXT HOOK
 *
 * Context provides a way to pass data through the component tree without
 * having to pass props down manually at every level (prop drilling).
 *
 * THREE STEPS TO USE CONTEXT:
 * 1. Create context: const MyContext = createContext(defaultValue)
 * 2. Provide context: <MyContext.Provider value={data}>...</MyContext.Provider>
 * 3. Consume context: const data = useContext(MyContext)
 *
 * WHEN TO USE:
 * - Theme (dark/light mode)
 * - User authentication
 * - Language/Localization
 * - Global application state
 *
 * AVOID:
 * - Overusing for everything (use props when simple)
 * - Frequent updates (can cause all consumers to re-render)
 */

// STEP 1: CREATE CONTEXTS
// Theme Context for dark/light mode
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// User Context for authentication
interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Settings Context for app preferences
interface SettingsContextType {
  fontSize: number;
  language: string;
  notifications: boolean;
  updateSettings: (settings: Partial<Omit<SettingsContextType, 'updateSettings'>>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

/**
 * STEP 2: CREATE PROVIDER COMPONENTS
 * Providers wrap your app/components and make context values available
 */

// Theme Provider
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// User Provider
function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Settings Provider
function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState({
    fontSize: 16,
    language: 'English',
    notifications: true
  });

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ ...settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

/**
 * STEP 3: CREATE CUSTOM HOOKS FOR CONSUMING CONTEXT
 * This is a best practice - makes consuming easier and provides error checking
 */

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}

/**
 * CONSUMER COMPONENTS
 * These components can access context from anywhere in the tree!
 */

// Component that uses Theme Context
function ThemeToggler() {
  // No props needed! Gets data from context
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-3">Theme Toggler Component</h3>
      <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black border'}`}>
        <p className="mb-2">Current theme: <strong>{theme}</strong></p>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        💡 This component accesses theme without receiving props!
      </p>
    </div>
  );
}

// Component that uses User Context
function UserProfile() {
  const { user, login, logout } = useUser();

  const handleLogin = () => {
    login({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    });
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-3">User Profile Component</h3>
      {user ? (
        <div className="bg-green-50 p-4 rounded">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button
            onClick={logout}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded">
          <p className="mb-3 text-gray-600">Not logged in</p>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Login as John Doe
          </button>
        </div>
      )}
      <p className="text-xs text-gray-500 mt-2">
        💡 User state is shared across all components using this context!
      </p>
    </div>
  );
}

// Another component that also uses User Context (demonstrates sharing)
function UserGreeting() {
  const { user } = useUser();
  const { theme } = useTheme();

  return (
    <div className={`border rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-700 text-white' : ''}`}>
      <h3 className="font-semibold mb-3">User Greeting Component</h3>
      <div className="p-3 bg-blue-50 rounded">
        {user ? (
          <p>👋 Welcome back, <strong>{user.name}</strong>!</p>
        ) : (
          <p>👋 Welcome, Guest!</p>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        💡 This component uses BOTH user and theme contexts!
      </p>
    </div>
  );
}

// Component that uses Settings Context
function SettingsPanel() {
  const { fontSize, language, notifications, updateSettings } = useSettings();

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-3">Settings Panel Component</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            Font Size: {fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Language</label>
          <select
            value={language}
            onChange={(e) => updateSettings({ language: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => updateSettings({ notifications: e.target.checked })}
            className="w-4 h-4"
          />
          <label className="text-sm">Enable notifications</label>
        </div>

        <div className="bg-purple-50 p-3 rounded mt-3">
          <p className="text-sm font-medium mb-1">Current Settings:</p>
          <pre className="text-xs">{JSON.stringify({ fontSize, language, notifications }, null, 2)}</pre>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        💡 Settings persist across all components!
      </p>
    </div>
  );
}

// Component that displays settings (demonstrates reading)
function SettingsDisplay() {
  const { fontSize, language, notifications } = useSettings();

  return (
    <div className="border rounded-lg p-4" style={{ fontSize: `${fontSize}px` }}>
      <h3 className="font-semibold mb-3">Settings Display Component</h3>
      <div className="bg-indigo-50 p-3 rounded">
        <p>Language: {language}</p>
        <p>Notifications: {notifications ? '🔔 Enabled' : '🔕 Disabled'}</p>
        <p className="text-xs text-gray-600 mt-2">
          This text size is controlled by the fontSize setting!
        </p>
      </div>
    </div>
  );
}

/**
 * MAIN DEMO COMPONENT
 * Shows all providers and consumers together
 */
export function UseContextDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">useContext Hook</h2>
        <p className="text-gray-600 mb-4">
          Context provides a way to share values between components without passing props.
          Perfect for global state like themes, auth, and settings!
        </p>
      </div>

      {/* Wrap components in providers */}
      <ThemeProvider>
        <UserProvider>
          <SettingsProvider>

            {/* All these components can access context! */}
            <div className="grid gap-4">
              <ThemeToggler />

              <div className="grid md:grid-cols-2 gap-4">
                <UserProfile />
                <UserGreeting />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <SettingsPanel />
                <SettingsDisplay />
              </div>
            </div>

          </SettingsProvider>
        </UserProvider>
      </ThemeProvider>

      {/* Code Examples */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold mb-3">📝 How It Works</h3>
        <div className="space-y-2 text-sm font-mono">
          <div className="bg-white p-2 rounded">
            <strong>1. Create:</strong> const MyContext = createContext(defaultValue)
          </div>
          <div className="bg-white p-2 rounded">
            <strong>2. Provide:</strong> &lt;MyContext.Provider value=&#123;data&#125;&gt;...&lt;/MyContext.Provider&gt;
          </div>
          <div className="bg-white p-2 rounded">
            <strong>3. Consume:</strong> const data = useContext(MyContext)
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="font-bold mb-2">✅ Benefits of Context</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Avoid prop drilling</strong> - No need to pass props through many levels</li>
          <li><strong>Global state management</strong> - Share state across entire app</li>
          <li><strong>Clean component API</strong> - Components only receive props they need</li>
          <li><strong>Easier refactoring</strong> - Change data without updating many components</li>
        </ul>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h3 className="font-bold mb-2">⚠️ Important Notes</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Re-renders</strong> - All consumers re-render when context value changes</li>
          <li><strong>Not for frequent updates</strong> - For high-frequency updates, consider other solutions</li>
          <li><strong>Create custom hooks</strong> - Makes consuming easier and safer (useTheme, useUser, etc.)</li>
          <li><strong>Split contexts</strong> - Don't put everything in one context; create separate ones</li>
          <li><strong>Use with useState</strong> - Combine with useState for stateful context</li>
        </ul>
      </div>

      {/* Exercise */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-bold mb-2">🎯 Exercise for You</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Create a CartContext for a shopping cart (add/remove items)</li>
          <li>Build a NotificationContext to show toast messages globally</li>
          <li>Add a LanguageContext and create a multi-language app</li>
          <li>Combine multiple contexts in a single component</li>
        </ol>
      </div>
    </div>
  );
}
