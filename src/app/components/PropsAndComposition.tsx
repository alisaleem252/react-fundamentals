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
// MAIN DEMO COMPONENT
// ============================================

export function PropsAndComposition() {
  const [users] = useState<User[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' }
  ]);

  const handleEdit = (user: User) => {
    alert(`Editing ${user.name}`);
  };

  const handleDelete = (id: number) => {
    alert(`Deleting user with ID: ${id}`);
  };

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
        </ol>
      </div>
    </div>
  );
}
