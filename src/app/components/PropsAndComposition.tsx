import React, { ReactNode, useState } from 'react';

/**
 * PROPS AND COMPONENT COMPOSITION
 *
 * Props (properties) are how you pass data from parent to child components.
 * They are read-only and flow in one direction (top-down).
 *
 * KEY CONCEPTS:
 * - Props are arguments to components
 * - Props are immutable (read-only)
 * - Props enable component reusability
 * - TypeScript interfaces define prop shapes
 * - Children is a special prop for composition
 */

// ============================================
// BASIC PROPS EXAMPLES
// ============================================

/**
 * Example 1: Simple props with TypeScript interface
 */
interface GreetingProps {
  name: string;
  age?: number; // ? means optional
  isAdmin?: boolean;
}

function Greeting({ name, age, isAdmin = false }: GreetingProps) {
  return (
    <div className="bg-blue-50 p-3 rounded">
      <p>Hello, {name}!</p>
      {age && <p className="text-sm">Age: {age}</p>}
      {isAdmin && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">Admin</span>}
    </div>
  );
}

/**
 * Example 2: Props with objects and arrays
 */
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
}

function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-bold">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <div className="flex gap-2 mt-2">
        {onEdit && (
          <button
            onClick={() => onEdit(user)}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(user.id)}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Example 3: Props destructuring with default values
 */
interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

function CustomButton({
  text,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick
}: ButtonProps) {
  const baseClasses = 'rounded font-semibold transition-colors';

  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {text}
    </button>
  );
}

// ============================================
// CHILDREN PROP (COMPOSITION)
// ============================================

/**
 * The 'children' prop is special - it contains whatever is between component tags.
 * This enables powerful composition patterns.
 */

interface CardProps {
  title: string;
  children: ReactNode; // ReactNode accepts any valid React content
  footer?: ReactNode;
}

function Card({ title, children, footer }: CardProps) {
  return (
    <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-3 border-b-2 border-gray-300">
        <h3 className="font-bold">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="bg-gray-50 p-3 border-t-2 border-gray-300">
          {footer}
        </div>
      )}
    </div>
  );
}

/**
 * Container components for layout composition
 */
interface ContainerProps {
  children: ReactNode;
  maxWidth?: string;
}

function Container({ children, maxWidth = '1200px' }: ContainerProps) {
  return (
    <div className="mx-auto px-4" style={{ maxWidth }}>
      {children}
    </div>
  );
}

interface FlexBoxProps {
  children: ReactNode;
  direction?: 'row' | 'column';
  gap?: number;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end' | 'between';
}

function FlexBox({
  children,
  direction = 'row',
  gap = 4,
  align = 'start',
  justify = 'start'
}: FlexBoxProps) {
  const alignMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end'
  };

  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between'
  };

  return (
    <div className={`flex flex-${direction} gap-${gap} ${alignMap[align]} ${justifyMap[justify]}`}>
      {children}
    </div>
  );
}

// ============================================
// RENDER PROPS PATTERN
// ============================================

/**
 * Render props: A function prop that returns React elements
 * Useful for sharing logic between components
 */
interface MouseTrackerProps {
  render: (position: { x: number; y: number }) => ReactNode;
}

function MouseTracker({ render }: MouseTrackerProps) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="border-2 border-dashed border-blue-300 p-4 rounded min-h-[150px]"
    >
      {render(position)}
    </div>
  );
}

// ============================================
// EXERCISE 1: Alert Component with Variants
// ============================================
// 💡 Same component, different look — just change the `variant` prop!

interface AlertProps {
  message: string;
  variant?: 'success' | 'warning' | 'error';
}

const style = {
  success: 'bg-green-100 border-green-500 text-green-800',
  warning: 'bg-yellow-100 border-yellow-500 text-yellow-800',
  error: 'bg-red-100 border-red-500 text-red-800',
};

const icon = { success: '✅', warning: '⚠️', error: '❌' };

function Alert({ message, variant = 'success' }: AlertProps) {
  return (
    <div className={`border-l-4 p-3 rounded flex items-center gap-2 ${style[variant]}`}>
      <span>{icon[variant]}</span>
      <span className="text-sm">{message}</span>
    </div>
  );
}

// ============================================
// EXERCISE 2: Modal Component with Children
// ============================================
// 💡 Content between <Modal>...</Modal> tags becomes the `children` prop!

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

function Modal({ isOpen, title, children, onClose }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ============================================
// EXERCISE 3: ProductCard Component
// ============================================
// 💡 Pass full product data as a single prop + callback functions

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const btn = product.inStock
    ? 'bg-blue-500 text-white hover:bg-blue-600'
    : 'bg-gray-200 text-gray-400 cursor-not-allowed';

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h4 className="font-semibold">{product.name}</h4>
      <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">{product.category}</span>
      <div className="flex justify-between items-center my-2">
        <span className="font-bold text-green-700">${product.price}</span>
        <span className={`text-xs ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
          {product.inStock ? '✓ In Stock' : '✕ Out of Stock'}
        </span>
      </div>
      <button onClick={() => onAddToCart(product)} disabled={!product.inStock}
        className={`w-full py-2 rounded text-sm font-semibold ${btn}`}>
        {product.inStock ? 'Add to Cart' : 'Unavailable'}
      </button>
    </div>
  );
}

// ============================================
// EXERCISE 4: Form with onChange Handlers
// ============================================
// 💡 Child calls `onChange(newValue)` → Parent updates state → New value flows back down as prop

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function FormField({ label, value, onChange }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400" />
    </div>
  );
}

function SimpleForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="space-y-3">
      <FormField label="Name" value={name} onChange={setName} />
      <FormField label="Email" value={email} onChange={setEmail} />
      <button onClick={() => alert(`Submitted: ${name} (${email})`)}
        className="px-4 py-2 bg-blue-500 text-white rounded text-sm">Submit</button>
      <p className="text-xs text-gray-500">Live: {name || '...'} | {email || '...'}</p>
    </div>
  );
}

// ============================================
// EXERCISE 5: Tab Component with Render Props
// ============================================
// 💡 `renderTabContent` lets the PARENT decide HOW each tab looks

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  renderTabContent?: (tab: Tab) => ReactNode;
}

function Tabs({ tabs, renderTabContent }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? '');
  const current = tabs.find(t => t.id === active);

  return (
    <div>
      <div className="flex border-b">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)}
            className={`px-4 py-2 text-sm font-medium ${active === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white border rounded-b">
        {current && (renderTabContent ? renderTabContent(current) : current.content)}
      </div>
    </div>
  );
}

// ============================================
// MAIN DEMO COMPONENT
// ============================================

export function PropsAndComposition() {
  const [users] = useState<User[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleEdit = (user: User) => {
    alert(`Editing ${user.name}`);
  };

  const handleDelete = (id: number) => {
    alert(`Deleting user with ID: ${id}`);
  };

  const products: Product[] = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, inStock: true, category: 'Electronics' },
    { id: 2, name: 'Organic Coffee Beans', price: 14.99, inStock: true, category: 'Food' },
    { id: 3, name: 'Yoga Mat', price: 29.99, inStock: false, category: 'Sports' },
  ];

  const icons: Record<string, string> = { preview: '👁️', details: '📋', reviews: '⭐' };
  const tabs: Tab[] = [
    { id: 'preview', label: 'Preview', content: <p>Preview content here.</p> },
    { id: 'details', label: 'Details', content: <p>Detailed specs and info.</p> },
    { id: 'reviews', label: 'Reviews', content: <p>Customer reviews and ratings.</p> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Props and Component Composition</h2>
        <p className="text-gray-600 mb-4">
          Learn how to pass data between components and compose complex UIs from simple pieces.
        </p>
      </div>

      {/* Basic Props */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">1. Basic Props</h3>
        <div className="space-y-2">
          <Greeting name="John" />
          <Greeting name="Sarah" age={25} />
          <Greeting name="Admin User" age={30} isAdmin={true} />
        </div>
        <div className="mt-3 bg-gray-100 p-2 rounded text-sm font-mono">
          &lt;Greeting name="John" age=&#123;25&#125; isAdmin=&#123;true&#125; /&gt;
        </div>
      </div>

      {/* Object Props and Event Handlers */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">2. Object Props and Event Handlers</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Functions can be passed as props to handle events in child components
        </p>
      </div>

      {/* Props with Variants */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">3. Props for Variants and Styles</h3>
        <div className="flex flex-wrap gap-3">
          <CustomButton text="Primary" variant="primary" />
          <CustomButton text="Secondary" variant="secondary" />
          <CustomButton text="Danger" variant="danger" />
          <CustomButton text="Small" size="small" />
          <CustomButton text="Medium" size="medium" />
          <CustomButton text="Large" size="large" />
          <CustomButton text="Disabled" disabled />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Same component, different appearances based on props!
        </p>
      </div>

      {/* Children Prop - Composition */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">4. Children Prop (Composition)</h3>
        <div className="space-y-3">
          <Card title="User Information">
            <p>This content is passed as children!</p>
            <p className="text-sm text-gray-600">You can put anything here.</p>
          </Card>

          <Card
            title="Card with Footer"
            footer={
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                  Save
                </button>
                <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                  Cancel
                </button>
              </div>
            }
          >
            <p>This card has both children and a footer!</p>
          </Card>
        </div>
        <div className="mt-3 bg-gray-100 p-2 rounded text-sm font-mono">
          &lt;Card title="..."&gt;<br/>
          &nbsp;&nbsp;Children content here<br/>
          &lt;/Card&gt;
        </div>
      </div>

      {/* Layout Composition */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">5. Layout Composition</h3>
        <Container maxWidth="600px">
          <FlexBox direction="column" gap={3}>
            <div className="bg-purple-100 p-3 rounded">Item 1</div>
            <div className="bg-purple-100 p-3 rounded">Item 2</div>
            <div className="bg-purple-100 p-3 rounded">Item 3</div>
          </FlexBox>
        </Container>
        <p className="text-xs text-gray-500 mt-2">
          💡 Build complex layouts by composing simple container components
        </p>
      </div>

      {/* Render Props Pattern */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">6. Render Props Pattern</h3>
        <MouseTracker
          render={({ x, y }) => (
            <div className="text-center">
              <p className="font-bold text-lg">Move your mouse here!</p>
              <p className="text-sm">Mouse position: ({x}, {y})</p>
            </div>
          )}
        />
        <p className="text-xs text-gray-500 mt-2">
          💡 Render props let you share behavior by passing a function that returns elements
        </p>
      </div>

      {/* ===== EXERCISE SOLUTIONS ===== */}
      <div className="border-2 border-blue-400 rounded-lg p-4 bg-blue-50/30">
        <h3 className="font-bold mb-4 text-lg text-blue-800">🎯 Exercise Solutions</h3>

        {/* Ex 1 */}
        <div className="mb-5">
          <h4 className="font-semibold mb-2 text-sm text-blue-700">1. Alert — variant prop</h4>
          <div className="space-y-1">
            <Alert message="Success! Your changes were saved." variant="success" />
            <Alert message="Warning! Please double-check your input." variant="warning" />
            <Alert message="Error! Something went wrong." variant="error" />
          </div>
        </div>

        {/* Ex 2 */}
        <div className="mb-5">
          <h4 className="font-semibold mb-2 text-sm text-blue-700">2. Modal — children prop</h4>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded text-sm">
            Open Modal
          </button>
          <Modal isOpen={isModalOpen} title="Welcome!" onClose={() => setIsModalOpen(false)}>
            <p>This content goes inside <strong>children</strong>!</p>
          </Modal>
        </div>

        {/* Ex 3 */}
        <div className="mb-5">
          <h4 className="font-semibold mb-2 text-sm text-blue-700">3. ProductCard — product + callback props</h4>
          <div className="grid md:grid-cols-3 gap-3">
            {products.map(p => (
              <ProductCard key={p.id} product={p}
                onAddToCart={() => { setCartCount(c => c + 1); alert(`${p.name} added!`); }} />
            ))}
          </div>
          <p className="text-xs mt-1">🛒 Cart: {cartCount} item{cartCount !== 1 ? 's' : ''}</p>
        </div>

        {/* Ex 4 */}
        <div className="mb-5">
          <h4 className="font-semibold mb-2 text-sm text-blue-700">4. Form — onChange handler prop</h4>
          <div className="max-w-sm"><SimpleForm /></div>
        </div>

        {/* Ex 5 */}
        <div className="mb-2">
          <h4 className="font-semibold mb-2 text-sm text-blue-700">5. Tabs — render props</h4>
          <Tabs tabs={tabs}
            renderTabContent={(tab) => (
              <div className="flex items-center gap-3">
                <span className="text-2xl">{icons[tab.id]}</span>
                <div><p className="font-semibold">{tab.label}</p>{tab.content}</div>
              </div>
            )}
          />
        </div>
      </div>

      {/* Props Flow Diagram */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold mb-3">📊 Props Flow</h3>
        <div className="space-y-2 text-sm">
          <div className="bg-white p-3 rounded border-l-4 border-blue-500">
            <strong>Parent Component</strong> → Passes props (data + functions)
          </div>
          <div className="ml-6 bg-white p-3 rounded border-l-4 border-green-500">
            <strong>Child Component</strong> → Receives props (read-only)
          </div>
          <div className="ml-12 bg-white p-3 rounded border-l-4 border-purple-500">
            <strong>Grandchild Component</strong> → Receives props from child
          </div>
        </div>
        <p className="text-xs mt-3 text-gray-600">
          Data flows in ONE DIRECTION: from parent to child (top-down)
        </p>
      </div>

      {/* Important Rules */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h3 className="font-bold mb-2">⚠️ Props Rules</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Props are READ-ONLY</strong> - Never modify props inside component</li>
          <li><strong>Props flow DOWN</strong> - Parent to child, not reverse</li>
          <li><strong>Use TypeScript interfaces</strong> - Define prop shapes for type safety</li>
          <li><strong>Destructure props</strong> - Makes code cleaner and clearer</li>
          <li><strong>Provide defaults</strong> - Use default values for optional props</li>
          <li><strong>Validate props</strong> - TypeScript helps catch errors at compile time</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="font-bold mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Keep components small</strong> - Single responsibility principle</li>
          <li><strong>Compose, don't inherit</strong> - Use composition over inheritance</li>
          <li><strong>Use children for flexibility</strong> - Makes components more reusable</li>
          <li><strong>Lift state up</strong> - Keep state in common parent when shared</li>
          <li><strong>Name props clearly</strong> - onUserClick, isLoading, userName (be specific)</li>
        </ul>
      </div>
  {/* Exercise */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-bold mb-2">🎯 Exercise for You</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Create a reusable Alert component with variants (success, warning, error)</li>
          <li>Build a Modal component that uses children prop for content</li>
          <li>Make a ProductCard component that takes product data as props</li>
          <li>Create a form component that passes onChange handlers as props</li>
          <li>Build a Tab component using composition and render props</li>
          <h3 className="font-bold text-green-800">🎉 All 5 Exercises Solved!</h3>
        </ol>
      </div>
    </div>
  );
}
 