import { useState } from 'react';

/**
 * CONDITIONAL RENDERING AND LISTS
 *
 * Two fundamental concepts in React:
 * 1. Conditional Rendering - Show/hide content based on state or props
 * 2. Lists and Keys - Render arrays of data efficiently
 *
 * CONDITIONAL RENDERING METHODS:
 * - if/else statements
 * - Ternary operator (condition ? true : false)
 * - Logical AND (condition && component)
 * - Logical OR (value || fallback)
 * - Switch statements for multiple conditions
 *
 * LISTS:
 * - map() to transform arrays into components
 * - Keys help React identify which items changed
 * - Keys must be unique among siblings
 */

export function ConditionalAndLists() {
  // ============================================
  // STATE FOR DEMOS
  // ============================================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'guest' | 'user' | 'admin'>('guest');
  const [showDetails, setShowDetails] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', category: 'Fruit', inStock: true, price: 1.99 },
    { id: 2, name: 'Banana', category: 'Fruit', inStock: true, price: 0.99 },
    { id: 3, name: 'Carrot', category: 'Vegetable', inStock: false, price: 1.49 },
    { id: 4, name: 'Broccoli', category: 'Vegetable', inStock: true, price: 2.49 }
  ]);
  const [filter, setFilter] = useState<'all' | 'fruit' | 'vegetable'>('all');
  const [newItemName, setNewItemName] = useState('');

  // ============================================
  // CONDITIONAL RENDERING EXAMPLES
  // ============================================

  /**
   * Method 1: if/else with early return
   * Good for simple show/hide entire component logic
   */
  function LoginMessage() {
    if (!isLoggedIn) {
      return (
        <div className="bg-red-50 p-3 rounded">
          <p className="text-red-700">❌ Please log in to continue</p>
        </div>
      );
    }

    return (
      <div className="bg-green-50 p-3 rounded">
        <p className="text-green-700">✅ Welcome! You are logged in</p>
      </div>
    );
  }

  /**
   * Method 2: Ternary operator
   * Good for inline conditional rendering
   */
  const TernaryExample = () => (
    <div className="bg-blue-50 p-3 rounded">
      {isLoggedIn ? (
        <p className="text-blue-700">You have access to premium features</p>
      ) : (
        <p className="text-blue-700">Login to unlock premium features</p>
      )}
    </div>
  );

  /**
   * Method 3: Logical AND (&&)
   * Good when you only want to show something if true (no else case)
   */
  const LogicalAndExample = () => (
    <div className="bg-purple-50 p-3 rounded">
      <p>Basic features available</p>
      {isLoggedIn && <p className="text-purple-700">✨ Plus premium features!</p>}
      {!isLoggedIn && <p className="text-gray-500">(Login to see premium features)</p>}
    </div>
  );

  /**
   * Method 4: Switch statement for multiple conditions
   * Good for many possible values
   */
  function RoleBasedContent() {
    let content;

    switch (userRole) {
      case 'admin':
        content = (
          <div className="bg-red-100 p-3 rounded border-2 border-red-500">
            <p className="font-bold text-red-800">👑 Admin Dashboard</p>
            <p className="text-sm">Full system access, can manage users</p>
          </div>
        );
        break;
      case 'user':
        content = (
          <div className="bg-blue-100 p-3 rounded border-2 border-blue-500">
            <p className="font-bold text-blue-800">👤 User Dashboard</p>
            <p className="text-sm">Standard user access</p>
          </div>
        );
        break;
      case 'guest':
      default:
        content = (
          <div className="bg-gray-100 p-3 rounded border-2 border-gray-500">
            <p className="font-bold text-gray-800">👥 Guest View</p>
            <p className="text-sm">Limited access, please register</p>
          </div>
        );
    }

    return content;
  }

  /**
   * Method 5: Element variables
   * Good for complex conditional logic
   */
  function ComplexConditional() {
    let badge;
    let message;

    if (isLoggedIn && userRole === 'admin') {
      badge = <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">ADMIN</span>;
      message = 'You have full access';
    } else if (isLoggedIn && userRole === 'user') {
      badge = <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">USER</span>;
      message = 'You have standard access';
    } else {
      badge = <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs">GUEST</span>;
      message = 'You have limited access';
    }

    return (
      <div className="bg-yellow-50 p-3 rounded">
        <div className="flex items-center gap-2">
          {badge}
          <p className="text-sm">{message}</p>
        </div>
      </div>
    );
  }

  // ============================================
  // LISTS AND KEYS EXAMPLES
  // ============================================

  /**
   * Filtering lists
   */
  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.category.toLowerCase() === filter;
  });

  /**
   * Adding items to list
   */
  const addItem = () => {
    if (!newItemName.trim()) return;

    const newItem = {
      id: Date.now(), // Simple way to generate unique ID
      name: newItemName,
      category: 'Fruit',
      inStock: true,
      price: Math.random() * 3 + 1
    };

    setItems([...items, newItem]);
    setNewItemName('');
  };

  /**
   * Removing items from list
   */
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  /**
   * Toggling item property
   */
  const toggleStock = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, inStock: !item.inStock } : item
    ));
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Conditional Rendering & Lists</h2>
        <p className="text-gray-600 mb-4">
          Learn how to show/hide content dynamically and render lists of data efficiently.
        </p>
      </div>

      {/* Control Panel */}
      <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
        <h3 className="font-semibold mb-3">🎮 Control Panel (Change state to see effects below)</h3>
        <div className="space-y-3">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className={`px-4 py-2 rounded font-semibold ${
                isLoggedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
            <span className="text-sm">Current: {isLoggedIn ? 'Logged In ✅' : 'Logged Out ❌'}</span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">Role:</span>
            {(['guest', 'user', 'admin'] as const).map(role => (
              <button
                key={role}
                onClick={() => setUserRole(role)}
                className={`px-3 py-1 rounded text-sm ${
                  userRole === role ? 'bg-blue-600 text-white' : 'bg-white'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conditional Rendering Examples */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">1. Conditional Rendering Methods</h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-600 mb-1">Method 1: if/else with early return</p>
            <LoginMessage />
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-1">Method 2: Ternary operator (? :)</p>
            <TernaryExample />
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-1">Method 3: Logical AND (&&)</p>
            <LogicalAndExample />
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-1">Method 4: Switch statement</p>
            <RoleBasedContent />
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-1">Method 5: Element variables</p>
            <ComplexConditional />
          </div>
        </div>
      </div>

      {/* Toggle Example */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">2. Show/Hide Details Toggle</h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          {showDetails ? '🔼 Hide' : '🔽 Show'} Details
        </button>

        {/* Conditional rendering with animation-friendly approach */}
        {showDetails && (
          <div className="mt-3 p-4 bg-indigo-50 rounded border-2 border-indigo-200">
            <h4 className="font-semibold mb-2">Detailed Information</h4>
            <p className="text-sm">This content is conditionally rendered based on state.</p>
            <p className="text-sm">When showDetails is false, this component is not in the DOM.</p>
          </div>
        )}
      </div>

      {/* Lists and Keys */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">3. Lists and Keys</h3>

        {/* Add Item */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add new item..."
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={addItem}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-3">
          <span className="text-sm font-medium py-2">Filter:</span>
          {(['all', 'fruit', 'vegetable'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded text-sm capitalize ${
                filter === f ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List Rendering */}
        <div className="space-y-2">
          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="text-center p-6 bg-gray-50 rounded border-2 border-dashed">
              <p className="text-gray-500">No items to display</p>
            </div>
          )}

          {/* Map over array to create list */}
          {filteredItems.map((item) => (
            // KEY IS ESSENTIAL! Should be unique and stable
            <div
              key={item.id}
              className={`p-3 rounded border-2 ${
                item.inStock ? 'bg-white border-green-300' : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{item.name}</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    {!item.inStock && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleStock(item.id)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Toggle Stock
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-3">
          💡 Total items: {items.length} | Showing: {filteredItems.length}
        </p>
      </div>

      {/* List Methods Reference */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold mb-3">📚 Common Array Methods for Lists</h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="bg-white p-3 rounded">
            <strong className="text-blue-600">.map()</strong>
            <p className="text-xs text-gray-600">Transform each item, return new array</p>
            <code className="text-xs block mt-1">items.map(item =&gt; &lt;div&gt;&#123;item.name&#125;&lt;/div&gt;)</code>
          </div>

          <div className="bg-white p-3 rounded">
            <strong className="text-green-600">.filter()</strong>
            <p className="text-xs text-gray-600">Keep only items that match condition</p>
            <code className="text-xs block mt-1">items.filter(item =&gt; item.inStock)</code>
          </div>

          <div className="bg-white p-3 rounded">
            <strong className="text-purple-600">.find()</strong>
            <p className="text-xs text-gray-600">Get first item matching condition</p>
            <code className="text-xs block mt-1">items.find(item =&gt; item.id === 1)</code>
          </div>

          <div className="bg-white p-3 rounded">
            <strong className="text-orange-600">.sort()</strong>
            <p className="text-xs text-gray-600">Sort items (creates new array)</p>
            <code className="text-xs block mt-1">[...items].sort((a,b) =&gt; a.price - b.price)</code>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h3 className="font-bold mb-2">⚠️ Important Rules</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Always use keys in lists</strong> - Helps React identify which items changed</li>
          <li><strong>Keys must be unique among siblings</strong> - Use IDs, not array indices</li>
          <li><strong>Don't use array index as key</strong> - Only if list never reorders</li>
          <li><strong>Avoid inline functions in lists</strong> - Can hurt performance in large lists</li>
          <li><strong>Use && carefully</strong> - Watch out for 0 or "" (use ternary instead)</li>
        </ul>
      </div>

      {/* Exercise */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-bold mb-2">🎯 Exercise for You</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Add a search feature to filter items by name</li>
          <li>Create a sorting feature (by name, price, category)</li>
          <li>Build a pagination component to show 5 items per page</li>
          <li>Add conditional styling based on price (highlight expensive items)</li>
          <li>Create a select all/deselect all checkbox for the list</li>
        </ol>
      </div>
    </div>
  );
}
