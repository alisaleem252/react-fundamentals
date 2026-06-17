import { useState, useReducer, useMemo, useCallback, useRef, memo } from 'react';

/**
 * ADVANCED HOOKS
 *
 * This component demonstrates:
 * 1. useReducer - For complex state logic
 * 2. useMemo - For expensive calculations
 * 3. useCallback - For function memoization
 * 4. useRef - For persisting values and DOM access
 * 5. React.memo - For component memoization
 */

// ============================================
// 1. USEREDUCER - Alternative to useState for complex state
// ============================================

/**
 * useReducer is like useState but for more complex state logic.
 * Similar to Redux reducers.
 *
 * SYNTAX: const [state, dispatch] = useReducer(reducer, initialState)
 *
 * - reducer: Function that specifies how state updates (state, action) => newState
 * - dispatch: Function to trigger state updates
 * - action: Object describing what happened (usually has 'type' and 'payload')
 */

// Define action types (good practice for TypeScript)
type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number };

// Define state shape
interface CounterState {
  count: number;
  history: number[];
}

// Reducer function - pure function that calculates new state
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1]
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1]
      };
    case 'RESET':
      return {
        count: 0,
        history: [0]
      };
    case 'SET':
      return {
        count: action.payload,
        history: [...state.history, action.payload]
      };
    default:
      return state;
  }
}

function UseReducerExample() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, history: [0] });

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-3">1. useReducer - Complex State Management</h3>
      <div className="bg-purple-50 p-4 rounded mb-3">
        <div className="text-3xl font-bold text-center mb-3">{state.count}</div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => dispatch({ type: 'DECREMENT' })}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            -1
          </button>
          <button
            onClick={() => dispatch({ type: 'INCREMENT' })}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +1
          </button>
          <button
            onClick={() => dispatch({ type: 'SET', payload: 100 })}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Set to 100
          </button>
          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="bg-white p-3 rounded border">
        <p className="text-sm font-medium mb-1">History:</p>
        <p className="text-xs text-gray-600">{state.history.join(' → ')}</p>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        💡 useReducer is perfect when you have complex state updates or multiple sub-values
      </p>
    </div>
  );
}

// ============================================
// 2. USEMEMO - Memoize expensive calculations
// ============================================

/**
 * useMemo caches the result of expensive calculations.
 * Only recalculates when dependencies change.
 *
 * SYNTAX: const memoizedValue = useMemo(() => expensiveCalculation(), [deps])
 *
 * USE WHEN:
 * - Expensive calculations (filtering large arrays, complex math)
 * - Preventing unnecessary re-renders
 * - Creating referential equality
 */

function UseMemoExample() {
  const [number, setNumber] = useState(5);
  const [dark, setDark] = useState(false);

  // Simulate expensive calculation (factorial)
  const factorial = (n: number): number => {
    console.log('Calculating factorial...'); // Check console to see when this runs
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  // WITHOUT useMemo: Calculates on every render (even when dark mode changes!)
  // const result = factorial(number);

  // WITH useMemo: Only calculates when 'number' changes
  const result = useMemo(() => {
    return factorial(number);
  }, [number]); // Only recalculate when number changes

  // useMemo can also prevent unnecessary re-renders
  const theme = useMemo(() => ({
    backgroundColor: dark ? '#333' : '#fff',
    color: dark ? '#fff' : '#333'
  }), [dark]); // New object only created when dark changes

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-3">2. useMemo - Expensive Calculations</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm mb-1">
            Number: {number}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="p-4 rounded" style={theme}>
          <p className="font-bold">Factorial of {number} = {result}</p>
        </div>
        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Toggle Theme (Check Console)
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        💡 Open console: factorial only calculates when number changes, not on theme toggle!
      </p>
    </div>
  );
}

// ============================================
// 3. USECALLBACK - Memoize functions
// ============================================

/**
 * useCallback returns a memoized function.
 * Prevents creating new function instances on every render.
 *
 * SYNTAX: const memoizedFn = useCallback(() => { }, [deps])
 *
 * USE WHEN:
 * - Passing callbacks to optimized child components
 * - Functions as dependencies in other hooks
 * - Preventing unnecessary re-renders
 */

// Child component wrapped in memo (only re-renders if props change)
const MemoizedButton = memo(({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => {
  console.log('Button rendered:', children);
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      {children}
    </button>
  );
});

function UseCallbackExample() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // WITHOUT useCallback: New function created on every render
  // const increment = () => setCount(c => c + 1);

  // WITH useCallback: Same function reference unless dependencies change
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty deps = function never changes

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-3">3. useCallback - Function Memoization</h3>
      <div className="space-y-3">
        <div className="bg-blue-50 p-3 rounded">
          <p>Count: {count}</p>
          <p>Other: {other}</p>
        </div>
        <div className="flex gap-2">
          <MemoizedButton onClick={increment}>
            Increment (Check Console)
          </MemoizedButton>
          <button
            onClick={() => setOther(o => o + 1)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Update Other
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        💡 MemoizedButton doesn't re-render when 'other' changes (check console)
      </p>
    </div>
  );
}

// ============================================
// 4. USEREF - Persist values without re-renders
// ============================================

/**
 * useRef creates a mutable reference that persists across renders.
 * Changes to ref.current do NOT trigger re-renders.
 *
 * SYNTAX: const ref = useRef(initialValue)
 *
 * USE CASES:
 * 1. Access DOM elements
 * 2. Store mutable values that don't need re-renders
 * 3. Store previous values
 * 4. Keep timers/intervals
 */

function UseRefExample() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousCount = useRef(0);

  // Increment render count on every render
  renderCount.current += 1;

  // Store previous count
  const prevCount = previousCount.current;
  previousCount.current = count;

  const focusInput = () => {
    // Access DOM element directly
    inputRef.current?.focus();
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-3">4. useRef - Persistent References</h3>
      <div className="space-y-3">
        <div className="bg-orange-50 p-3 rounded">
          <p>Count: {count}</p>
          <p>Previous Count: {prevCount}</p>
          <p>Render Count: {renderCount.current}</p>
          <button
            onClick={() => setCount(c => c + 1)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Increment Count
          </button>
        </div>

        <div className="bg-green-50 p-3 rounded">
          <p className="text-sm mb-2">DOM Reference Example:</p>
          <input
            ref={inputRef}
            type="text"
            placeholder="Click button to focus me"
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <button
            onClick={focusInput}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Focus Input
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        💡 renderCount updates without causing re-renders. inputRef accesses DOM directly!
      </p>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function AdvancedHooksDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Advanced Hooks</h2>
        <p className="text-gray-600 mb-4">
          Master these hooks for performance optimization and complex state management.
        </p>
      </div>

      <UseReducerExample />
      <UseMemoExample />
      <UseCallbackExample />
      <UseRefExample />

      {/* Comparison Table */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold mb-3">📊 When to Use Each Hook</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Hook</th>
                <th className="text-left p-2">Purpose</th>
                <th className="text-left p-2">When to Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-mono">useReducer</td>
                <td className="p-2">Complex state logic</td>
                <td className="p-2">Multiple sub-values, complex updates, state transitions</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono">useMemo</td>
                <td className="p-2">Cache calculations</td>
                <td className="p-2">Expensive operations, preventing unnecessary recalculations</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono">useCallback</td>
                <td className="p-2">Cache functions</td>
                <td className="p-2">Passing to memoized components, hook dependencies</td>
              </tr>
              <tr>
                <td className="p-2 font-mono">useRef</td>
                <td className="p-2">Persistent values</td>
                <td className="p-2">DOM access, values that don't need re-renders</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h3 className="font-bold mb-2">⚠️ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Don't optimize prematurely</strong> - Use these hooks when you have performance issues</li>
          <li><strong>useReducer vs useState</strong> - Use reducer for complex state with multiple update patterns</li>
          <li><strong>useMemo/useCallback</strong> - Only use when actually needed (profiling shows benefit)</li>
          <li><strong>useRef for DOM</strong> - Better than document.querySelector in React</li>
          <li><strong>Combine hooks</strong> - These hooks work great together!</li>
        </ul>
      </div>

      {/* Exercise */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-bold mb-2">🎯 Exercise for You</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Create a todo app using useReducer instead of useState</li>
          <li>Build a search filter with useMemo to cache filtered results</li>
          <li>Use useRef to create a stopwatch that doesn't re-render every second</li>
          <li>Combine useCallback with memo() to optimize a list component</li>
        </ol>
      </div>
    </div>
  );
}
