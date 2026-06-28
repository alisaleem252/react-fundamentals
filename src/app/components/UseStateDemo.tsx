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

  // Example 6: Color picker (string state for background color)
  const [bgColor, setBgColor] = useState('#87CEEB');

  // Example 7: Calculator (multiple number & string states)
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcFirstValue, setCalcFirstValue] = useState<number | null>(null);
  const [calcOperator, setCalcOperator] = useState<string | null>(null);
  const [calcWaiting, setCalcWaiting] = useState(false);

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

  const clearAllItems = () => {
    setItems([]); // Reset array to empty
  };

  // Edit functionality for todo list
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditText(items[index]);
  };

  const saveEdit = (index: number) => {
    if (editText.trim()) {
      setItems(prevItems =>
        prevItems.map((item, i) => (i === index ? editText : item))
      );
    }
    setEditingIndex(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditText('');
  };

  // Calculator functions
  const inputDigit = (digit: string) => {
    if (calcWaiting) {
      setCalcDisplay(digit);
      setCalcWaiting(false);
    } else {
      setCalcDisplay(prev => prev === '0' ? digit : prev + digit);
    }
  };

  const inputDecimal = () => {
    if (calcWaiting) {
      setCalcDisplay('0.');
      setCalcWaiting(false);
      return;
    }
    if (!calcDisplay.includes('.')) {
      setCalcDisplay(prev => prev + '.');
    }
  };

  const performOperation = (op: string) => {
    const current = parseFloat(calcDisplay);
    if (calcFirstValue === null) {
      setCalcFirstValue(current);
    } else if (calcOperator) {
      const result = calculate(calcFirstValue, current, calcOperator);
      setCalcDisplay(String(result));
      setCalcFirstValue(result);
    }
    setCalcOperator(op);
    setCalcWaiting(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const calculateResult = () => {
    if (calcFirstValue === null || calcOperator === null) return;
    const current = parseFloat(calcDisplay);
    const result = calculate(calcFirstValue, current, calcOperator);
    setCalcDisplay(String(result));
    setCalcFirstValue(null);
    setCalcOperator(null);
    setCalcWaiting(true);
  };

  const clearCalc = () => {
    setCalcDisplay('0');
    setCalcFirstValue(null);
    setCalcOperator(null);
    setCalcWaiting(false);
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

      {/* Demo 5: Todo List (Array State) */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">5. Todo List (Array State)</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
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
              onClick={clearAllItems}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                {editingIndex === index ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit(index)}
                      className="flex-1 px-2 py-1 border rounded text-sm"
                      autoFocus
                    />
                    <button
                      onClick={() => saveEdit(index)}
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{item}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEdit(index)}
                        className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
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

      {/* Demo 6: Color Picker (String State for Background) */}
      <div className="border rounded-lg p-4" style={{ backgroundColor: bgColor }}>
        <h3 className="font-semibold mb-3">6. Color Picker (Background Color)</h3>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-12 h-12 cursor-pointer border rounded"
          />
          <div className="flex-1">
            <p className="text-sm font-mono">Selected color: <strong>{bgColor}</strong></p>
            <p className="text-sm">Pick a color above to change this section's background!</p>
          </div>
          <button
            onClick={() => setBgColor('#ffffff')}
            className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Demo 7: Calculator (Multiple States) */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">7. Simple Calculator (Multiple States)</h3>
        <div className="max-w-xs mx-auto">
          {/* Display */}
          <div className="bg-gray-900 text-white text-right text-3xl font-mono p-4 rounded mb-3 overflow-hidden">
            {calcFirstValue !== null && (
              <span className="text-gray-400 text-sm mr-2">{calcFirstValue} {calcOperator}</span>
            )}
            {calcDisplay}
          </div>
          {/* Keypad */}
          <div className="grid grid-cols-4 gap-2">
            <button onClick={() => inputDigit('7')} className="p-3 bg-gray-200 rounded text-xl hover:bg-gray-300">7</button>
            <button onClick={() => inputDigit('8')} className="p-3 bg-gray-200 rounded text-xl hover:bg-gray-300">8</button>
            <button onClick={() => inputDigit('9')} className="p-3 bg-gray-200 rounded text-xl hover:bg-gray-300">9</button>
            <button onClick={() => performOperation('/')} className="p-3 bg-blue-500 text-white rounded text-xl hover:bg-blue-600">÷</button>

            <button onClick={() => inputDigit('4')} className="p-3 bg-gray-200 rounded text-xl hover:bg-gray-300">4</button>
            <button onClick={() => inputDigit('5')} className="p-3 bg-gray-200 rounded text-xl hover:bg-gray-300">5</button>
            <button onClick={() => inputDigit('6')} className="p-3 bg-gray-200 rounded text-xl hover:bg-gray-300">6</button>
            <button onClick={() => performOperation('*')} className="p-3 bg-blue-500 text-white rounded text-xl hover:bg-blue-600">×</button>

            <button onClick={() => inputDigit('1')} className="p-3 bg-gray-200 rounded text-xl hover:bg-gray-300">1</button>
            <button onClick={() => inputDigit('2')} className="p-3 bg-gray-200 rounded text-xl hover:bg-gray-300">2</button>
            <button onClick={() => inputDigit('3')} className="p-3 bg-gray-200 rounded text-xl hover:bg-gray-300">3</button>
            <button onClick={() => performOperation('-')} className="p-3 bg-blue-500 text-white rounded text-xl hover:bg-blue-600">−</button>

            <button onClick={() => inputDigit('0')} className="p-3 bg-gray-200 rounded text-xl hover:bg-gray-300">0</button>
            <button onClick={inputDecimal} className="p-3 bg-gray-200 rounded text-xl hover:bg-gray-300">.</button>
            <button onClick={clearCalc} className="p-3 bg-red-500 text-white rounded text-xl hover:bg-red-600">C</button>
            <button onClick={() => performOperation('+')} className="p-3 bg-blue-500 text-white rounded text-xl hover:bg-blue-600">+</button>

            <button onClick={calculateResult} className="col-span-4 p-3 bg-green-500 text-white rounded text-xl hover:bg-green-600">=</button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          💡 Uses 4 state variables: display, firstValue, operator, and waiting flag
        </p>
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
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-bold mb-2">🎯 Exercise for You</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>✅ Add a "Clear All" button to the todo list</li>
          <li>✅ Create a color picker that changes the background color</li>
          <li>✅ Build a simple calculator using useState</li>
          <li>✅ Add edit functionality to the todo list items</li>
        </ol>
      </div>
    </div>
  );
}
