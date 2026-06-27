import { createContext, useContext, useState, ReactNode } from 'react';
// React se zaroori cheezein import kar rahe hain: createContext, useContext, useState, ReactNode

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
// Yeh React ka useContext hook hai. Context ki madad se hum components ke beech
// data share kar sakte hain bina props ko har level par pass kiye (prop drilling se bachna).

// STEP 1: CREATE CONTEXTS
// Pehla qadam: Contexts create karna
// Theme Context for dark/light mode -- Ye theme (dark/light mode) ke liye context hai
interface ThemeContextType {
  // ThemeContextType: theme 'light' ya 'dark' ho sakta hai, aur toggleTheme function hai
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
// ThemeContext create kiya, jisme theme aur toggleTheme ka function hoga.
// Iska default value undefined hai.

// User Context for authentication -- User authentication ke liye context
interface User {
  // User interface: user ke naam, email aur role ki information
  name: string;
  email: string;
  role: 'admin' | 'user'; // role admin ya user ho sakta hai
}

interface UserContextType {
  // UserContextType: user (null bhi ho sakta hai), login aur logout functions
  user: User | null;  // agar koi logged in nahi to null
  login: (user: User) => void;  // login karte waqt user data dete hain
  logout: () => void;  // logout karte waqt user null ho jata hai
}

const UserContext = createContext<UserContextType | undefined>(undefined);
// UserContext create kiya, jisme user data, login aur logout hoga.

// Settings Context for app preferences -- App settings ke liye context
interface SettingsContextType {
  // SettingsContextType: app ki settings ka type
  fontSize: number;     // font size (number mein)
  language: string;     // language (string mein)
  notifications: boolean; // notifications on/off (true/false)
  updateSettings: (settings: Partial<Omit<SettingsContextType, 'updateSettings'>>) => void;
  // updateSettings: kisi bhi setting ko update karne ka function
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
// SettingsContext create kiya, jisme fontSize, language, notifications hain.

/**
 * STEP 2: CREATE PROVIDER COMPONENTS
 * Providers wrap your app/components and make context values available
 * Doosra qadam: Provider components banana.
 * Ye components apne app ko wrap karte hain aur context values provide karte hain.
 */

// Theme Provider -- Theme provide karne wala component
function ThemeProvider({ children }: { children: ReactNode }) {
  // ThemeProvider: theme state ko manage karta hai
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // initially 'light'

  const toggleTheme = () => {
    // toggleTheme: theme ko light se dark ya dark se light karta hai
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    // ThemeContext.Provider ke through sab child components ko theme aur toggleTheme milta hai
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// User Provider -- User provide karne wala component
function UserProvider({ children }: { children: ReactNode }) {
  // UserProvider: user state ko manage karta hai
  const [user, setUser] = useState<User | null>(null); // initially null (koi user logged in nahi)

  const login = (userData: User) => {
    // login function: user ko set karta hai jab wo login kare
    setUser(userData);
  };

  const logout = () => {
    // logout function: user ko null karta hai jab wo logout kare
    setUser(null);
  };

  return (
    // UserContext.Provider ke through user, login aur logout sabko available hai
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Settings Provider -- Settings provide karne wala component
function SettingsProvider({ children }: { children: ReactNode }) {
  // SettingsProvider: settings state ko manage karta hai
  const [settings, setSettings] = useState({
    fontSize: 16,       // default font size 16px
    language: 'English', // default language English
    notifications: true  // notifications on hain
  });

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    // updateSettings: purani settings ke saath naye settings merge karta hai
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    // SettingsContext.Provider ke through settings aur updateSettings sabko available hai
    <SettingsContext.Provider value={{ ...settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

/**
 * STEP 3: CREATE CUSTOM HOOKS FOR CONSUMING CONTEXT
 * This is a best practice - makes consuming easier and provides error checking
 * Teen qadam: Custom hooks banana context consume karne ke liye.
 * Ye best practice hai - isse error checking bhi asaan ho jati hai.
 */

function useTheme() {
  // useTheme custom hook: ThemeContext ko access karne ka asaan tareeka
  const context = useContext(ThemeContext);
  if (!context) {
    // Agar ThemeProvider ke bahar use kiya to error throw karega
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

function useUser() {
  // useUser custom hook: UserContext ko access karne ka asaan tareeka
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

function useSettings() {
  // useSettings custom hook: SettingsContext ko access karne ka asaan tareeka
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}

/**
 * CONSUMER COMPONENTS
 * These components can access context from anywhere in the tree!
 * Ab aate hain consumer components par. Ye components tree mein kahin se bhi context access kar sakte hain!
 */

// Component that uses Theme Context -- Theme context use karne wala component
function ThemeToggler() {
  // No props needed! Gets data from context -- Is component ko koi props nahi chahiye, ye context se data le raha hai
  const { theme, toggleTheme } = useTheme(); // useTheme hook se theme aur toggleTheme mil raha hai

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

// Component that uses User Context -- User context use karne wala component
function UserProfile() {
  // UserProfile: useUser hook se user, login aur logout le raha hai
  const { user, login, logout } = useUser();

  const handleLogin = () => {
    // handleLogin: jab user login kare to ye function call hota hai
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
        // Agar user logged in hai to ye UI dikhega (name, email, role aur logout button)
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
        // Agar user logged in nahi hai to login button dikhega
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
// Ek aur component jo UserContext use kar raha hai - ye sharing ko demonstrate karta hai
function UserGreeting() {
  // UserGreeting: ye component do contexts use kar raha hai - user aur theme
  const { user } = useUser();   // user context se user data le raha hai
  const { theme } = useTheme(); // theme context se current theme le raha hai

  return (
    <div className={`border rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-700 text-white' : ''}`}>
      <h3 className="font-semibold mb-3">User Greeting Component</h3>
      <div className="p-3 bg-blue-50 rounded">
        {user ? (
          // Agar user logged in hai to uske naam se welcome karega
          <p>👋 Welcome back, <strong>{user.name}</strong>!</p>
        ) : (
          // Agar nahi hai to Guest kahega
          <p>👋 Welcome, Guest!</p>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        💡 This component uses BOTH user and theme contexts!
      </p>
    </div>
  );
}

// Component that uses Settings Context -- Settings context use karne wala component
function SettingsPanel() {
  // SettingsPanel: useSettings hook se settings aur updateSettings function le raha hai
  const { fontSize, language, notifications, updateSettings } = useSettings();

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-3">Settings Panel Component</h3>
      <div className="space-y-3">
        <div>
          {/* Font size slider - is range input se font size change kar sakte hain */}
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
          {/* Language dropdown - yahan se language select kar sakte hain */}
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
          {/* Notifications toggle checkbox */}
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => updateSettings({ notifications: e.target.checked })}
            className="w-4 h-4"
          />
          <label className="text-sm">Enable notifications</label>
        </div>

        <div className="bg-purple-50 p-3 rounded mt-3">
          {/* Current settings show kar raha hai JSON format mein */}
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
// Settings display karne wala component - ye sirf read karta hai, edit nahi
function SettingsDisplay() {
  // SettingsDisplay: ye sirf settings read kar raha hai (fontSize, language, notifications)
  const { fontSize, language, notifications } = useSettings();

  return (
    // style={{ fontSize }} -- yahan font size context se aa raha hai!
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
 * Yeh main demo component hai jo sab providers aur consumers ko ek saath dikhata hai.
 */
export function UseContextDemo() {
  // Yeh main demo component hai jo sab kuch ek saath dikhata hai
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">useContext Hook</h2>
        <p className="text-gray-600 mb-4">
          Context provides a way to share values between components without passing props.
          Perfect for global state like themes, auth, and settings!
          {/* Context ki madad se components props ke bina data share kar sakte hain.
              Ye theme, auth aur settings jaise global state ke liye perfect hai! */}
        </p>
      </div>

      {/* Wrap components in providers -- Sab components ko providers mein wrap kiya */}
      {/* ThemeProvider sabse bahar hai, phir UserProvider, phir SettingsProvider */}
      <ThemeProvider>
        <UserProvider>
          <SettingsProvider>

            {/* All these components can access context!
                In sab components ko ab context access kar sakte hain bina props ke! */}
            <div className="grid gap-4">
              <ThemeToggler />  {/* Theme context use kar raha hai */}

              <div className="grid md:grid-cols-2 gap-4">
                <UserProfile />   {/* User context use kar raha hai */}
                <UserGreeting />  {/* User + Theme dono contexts use kar raha hai */}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <SettingsPanel />  {/* Settings context read + write kar raha hai */}
                <SettingsDisplay /> {/* Settings context sirf read kar raha hai */}
              </div>
            </div>

          </SettingsProvider>
        </UserProvider>
      </ThemeProvider>

      {/* Code Examples -- Context ke 3 basic steps */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold mb-3">📝 How It Works</h3>
        <div className="space-y-2 text-sm font-mono">
          <div className="bg-white p-2 rounded">
            <strong>1. Create:</strong> const MyContext = createContext(defaultValue)
            {/* Pehle context create karo */}
          </div>
          <div className="bg-white p-2 rounded">
            <strong>2. Provide:</strong> &lt;MyContext.Provider value=&#123;data&#125;&gt;...&lt;/MyContext.Provider&gt;
            {/* Phir provider se data provide karo */}
          </div>
          <div className="bg-white p-2 rounded">
            <strong>3. Consume:</strong> const data = useContext(MyContext)
            {/* Phir useContext hook se data consume karo */}
          </div>
        </div>
      </div>

      {/* Benefits -- Context ke fayde */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="font-bold mb-2">✅ Benefits of Context</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Avoid prop drilling</strong> - No need to pass props through many levels
            {/* Prop drilling se bachta hai - baar baar props pass nahi karne padte */}</li>
          <li><strong>Global state management</strong> - Share state across entire app
            {/* Poori app mein state share kar sakte hain */}</li>
          <li><strong>Clean component API</strong> - Components only receive props they need
            {/* Components ko sirf wohi props milte hain jo unhe chahiye */}</li>
          <li><strong>Easier refactoring</strong> - Change data without updating many components
            {/* Data change karna asaan hai - har component mein nahi jana padta */}</li>
        </ul>
      </div>

      {/* Important Notes -- Zaroori baatein */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h3 className="font-bold mb-2">⚠️ Important Notes</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Re-renders</strong> - All consumers re-render when context value changes
            {/* Jab context value change hoti hai to saare consumer re-render hote hain */}</li>
          <li><strong>Not for frequent updates</strong> - For high-frequency updates, consider other solutions
            {/* Baar baar update hone wali cheezon ke liye Context acha nahi */}</li>
          <li><strong>Create custom hooks</strong> - Makes consuming easier and safer (useTheme, useUser, etc.)
            {/* Custom hooks banayein - jaise useTheme, useUser - ye safe aur easy hain */}</li>
          <li><strong>Split contexts</strong> - Don't put everything in one context; create separate ones
            {/* Sab kuch ek context mein mat dalo, alag alag contexts banayo */}</li>
          <li><strong>Use with useState</strong> - Combine with useState for stateful context
            {/* useState ke saath context use karo stateful context banane ke liye */}</li>
        </ul>
      </div>

      {/* Exercise -- Mashq (practice) ke liye */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-bold mb-2">🎯 Exercise for You</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Create a CartContext for a shopping cart (add/remove items)
            {/* Shopping cart ke liye CartContext banayein */}</li>
          <li>Build a NotificationContext to show toast messages globally
            {/* Notifications dikhane ke liye NotificationContext banayein */}</li>
          <li>Add a LanguageContext and create a multi-language app
            {/* Multi-language app ke liye LanguageContext banayein */}</li>
          <li>Combine multiple contexts in a single component
            {/* Ek component mein multiple contexts combine karein */}</li>
        </ol>
      </div>
    </div>
  );
}
