import { useState } from 'react';

/**
 * USESTATE HOOK
 *
 * useState is the most fundamental React hook. It allows you to add state to functional components.
 *
 * SYNTAX: const [stateValue, setStateFunction] = useState(initialValue);
 *
 * - stateValue: Current value of the state
 * - setStateFunction: Function to update the state
 * - initialValue: The starting value
 *
 * IMPORTANT: When state changes, React re-renders the component!
 */

export function UseStateDemo() {
  // Example 1: Simple counter with number state
  const [count, setCount] = useState(0); // Initial value is 0

  // Example 2: String state for user input
  const [name, setName] = useState(''); // Initial value is empty string

  // Example 3: Boolean state for toggling
  const [isVisible, setIsVisible] = useState(false); // Initial value is false

  // Example 4: Object state (more complex)
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    age: 0
  });

  // Example 5: Array state
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  // ── Exercise states ──

  // Ex 2: Color picker
  const [bgColor, setBgColor] = useState('#ffeb3b');

  // Ex 3: Calculator
  const [calcNum1, setCalcNum1] = useState(0);
  const [calcNum2, setCalcNum2] = useState(0);
  const [calcOp, setCalcOp] = useState('+');

  // Ex 4: Edit todo
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  /**
   * UPDATING STATE - Different Methods
   */

  // Method 1: Direct value
  const increment = () => {
    setCount(count + 1); // Set new value directly
  };

  // Method 2: Functional update (recommended when new state depends on previous)
  const decrement = () => {
    setCount(prevCount => prevCount - 1); // Use previous value
  };

  // Method 3: Multiple rapid updates (functional form ensures correct sequence)
  const incrementByFive = () => {
    // WRONG: All will use the same initial count value
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);

    // CORRECT: Each uses the updated value
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  // Updating object state (must create new object!)
  const updateUser = (field: string, value: string | number) => {
    setUser(prevUser => ({
      ...prevUser, // Spread previous values
      [field]: value // Update specific field
    }));
  };

  // Updating array state
  const addItem = () => {
    if (newItem.trim()) {
      setItems(prevItems => [...prevItems, newItem]); // Create new array with new item
      setNewItem(''); // Clear input
    }
  };

  const removeItem = (index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index)); // Create new array without item
  };

  // Ex 1: Clear All
  const clearAll = () => {
    setItems([]);
  };

  // Ex 4: Edit todo
  const startEdit = (index: number) => {
    setEditIndex(index);
    setEditText(items[index]);
  };

  const saveEdit = (index: number) => {
    if (editText.trim()) {
      setItems(prev => prev.map((item, i) => (i === index ? editText : item)));
    }
    setEditIndex(null);
    setEditText('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">useState Hook</h2>
        <p className="text-gray-600 mb-4">
          The useState hook lets you add React state to function components. State causes re-renders when updated!
        </p>
      </div>

      {/* Demo 1: Counter (Number State) */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">1. Counter (Number State)</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            - Decrement
          </button>
          <div className="text-3xl font-bold min-w-[100px] text-center">
            {count}
          </div>
          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            + Increment
          </button>
          <button
            onClick={incrementByFive}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            +5 (Functional Updates)
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          💡 Current count value: {count}
        </p>
      </div>

      {/* Demo 2: Input Field (String State) */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">2. Text Input (String State)</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update state on every keystroke
          placeholder="Type your name..."
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-sm text-gray-600 mt-2">
          💡 You typed: <strong>{name || '(nothing yet)'}</strong>
        </p>
        <p className="text-sm text-gray-600">
          Character count: {name.length}
        </p>
      </div>

      {/* Demo 3: Toggle (Boolean State) */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">3. Toggle (Boolean State)</h3>
        <button
          onClick={() => setIsVisible(!isVisible)} // Toggle between true/false
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          {isVisible ? 'Hide' : 'Show'} Secret Message
        </button>
        {isVisible && ( // Conditional rendering based on state
          <div className="mt-3 p-4 bg-purple-100 rounded">
            🎉 This is a secret message! State value is: {isVisible.toString()}
          </div>
        )}
      </div>

      {/* Demo 4: Form (Object State) */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">4. Form (Object State)</h3>
        <div className="grid gap-3">
          <input
            type="text"
            value={user.firstName}
            onChange={(e) => updateUser('firstName', e.target.value)}
            placeholder="First Name"
            className="px-3 py-2 border rounded"
          />
          <input
            type="text"
            value={user.lastName}
            onChange={(e) => updateUser('lastName', e.target.value)}
            placeholder="Last Name"
            className="px-3 py-2 border rounded"
          />
          <input
            type="number"
            value={user.age || ''}
            onChange={(e) => updateUser('age', parseInt(e.target.value) || 0)}
            placeholder="Age"
            className="px-3 py-2 border rounded"
          />
        </div>
        <div className="mt-3 p-3 bg-gray-100 rounded">
          <strong>User Object State:</strong>
          <pre className="text-sm mt-1">{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>

      {/* Demo 5: Todo List (Array State) + Exercise 1 & 4 */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">
          5. Todo List (Array State)
          <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Ex 1 &amp; 4</span>
        </h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add new item..."
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={addItem}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
          {items.length > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="space-y-2">
          {items.length === 0 ? (
            <p className="text-gray-400 text-sm">No items yet. Add some above!</p>
          ) : (
            items.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded group">
                {editIndex === index ? (
                  <div className="flex gap-2 flex-1">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit(index)}
                      className="flex-1 px-2 py-1 border rounded text-sm"
                      autoFocus
                    />
                    <button onClick={() => saveEdit(index)} className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">Save</button>
                    <button onClick={() => setEditIndex(null)} className="px-2 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500">Cancel</button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{item}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEdit(index)}
                        className="px-2 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeItem(index)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
        <p className="text-sm text-gray-600 mt-2">
          💡 Total items: {items.length}
        </p>
      </div>

      {/* Exercise 2: Color Picker */}
      <div className="border-2 rounded-lg p-4 border-pink-400 bg-pink-50 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🎨</span>
          <h3 className="font-semibold text-lg">
            Color Picker
          </h3>
          <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full font-medium">Exercise 2</span>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Pick a color to change the background below
        </p>
        <div className="flex items-center gap-3 mb-3">
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-12 h-12 cursor-pointer border rounded"
          />
          <span className="text-sm font-mono bg-white px-2 py-1 rounded border">{bgColor}</span>
        </div>
        <div
          className="h-24 rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-200"
          style={{ backgroundColor: bgColor }}
        >
          {bgColor === '#ffeb3b' ? '🟡 Default yellow' : `✨ ${bgColor}`}
        </div>
      </div>

      {/* Exercise 3: Simple Calculator */}
      <div className="border-2 rounded-lg p-4 border-indigo-400 bg-indigo-50 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🔢</span>
          <h3 className="font-semibold text-lg">
            Simple Calculator
          </h3>
          <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full font-medium">Exercise 3</span>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Enter two numbers and pick an operation
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="number"
            value={calcNum1}
            onChange={(e) => setCalcNum1(Number(e.target.value))}
            className="w-24 px-3 py-2 border rounded text-center"
          />
          <select
            value={calcOp}
            onChange={(e) => setCalcOp(e.target.value)}
            className="px-3 py-2 border rounded bg-white"
          >
            <option value="+">➕ +</option>
            <option value="-">➖ -</option>
            <option value="*">✖️ ×</option>
            <option value="/">➗ ÷</option>
          </select>
          <input
            type="number"
            value={calcNum2}
            onChange={(e) => setCalcNum2(Number(e.target.value))}
            className="w-24 px-3 py-2 border rounded text-center"
          />
          <span className="text-2xl font-bold">=</span>
          <span className="text-2xl font-bold text-indigo-600 min-w-[60px]">
            {calcOp === '+' ? calcNum1 + calcNum2 :
             calcOp === '-' ? calcNum1 - calcNum2 :
             calcOp === '*' ? calcNum1 * calcNum2 :
             calcNum2 !== 0 ? calcNum1 / calcNum2 : '∞'}
          </span>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h3 className="font-bold mb-2">⚠️ Important Rules</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Never mutate state directly</strong> - Always use the setter function</li>
          <li><strong>State updates are asynchronous</strong> - Don't rely on immediate updates</li>
          <li><strong>Use functional updates</strong> - When new state depends on previous state</li>
          <li><strong>Objects and arrays need new references</strong> - Use spread operator (...)</li>
          <li><strong>State changes trigger re-renders</strong> - This is how React updates the UI</li>
        </ul>
      </div>

      {/* Exercise */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="font-bold mb-2">✅ All 4 Exercises Solved!</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li><strong>Clear All</strong> — Added button next to "Add" (appears when items exist)</li>
          <li><strong>Color Picker</strong> — Pick any color and see the background change live</li>
          <li><strong>Calculator</strong> — Two numbers + operation selector = live result</li>
          <li><strong>Edit Todo</strong> — Hover over any item and click "Edit" to change its text</li>
        </ol>
      </div>
    </div>
  );
}
