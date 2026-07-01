import { useState, useEffect } from 'react';

/**
 * USEEFFECT HOOK
 *
 * useEffect lets you perform side effects in function components.
 * Side effects: Data fetching, subscriptions, timers, manually changing DOM, etc.
 *
 * SYNTAX: useEffect(() => { ... effect code ... }, [dependencies]);
 *
 * - First argument: Function containing the effect logic
 * - Second argument: Dependency array (controls when effect runs)
 * - Return value: Optional cleanup function
 *
 * DEPENDENCY ARRAY BEHAVIOR:
 * - [] (empty): Effect runs once after initial render (like componentDidMount)
 * - [dep1, dep2]: Effect runs when any dependency changes
 * - No array: Effect runs after every render (use carefully!)
 */

export function UseEffectDemo() {
  // Demo 1: Run once on mount
  const [mountTime, setMountTime] = useState('');

  // Demo 2: Run when dependency changes
  const [count, setCount] = useState(0);
  const [countMessage, setCountMessage] = useState('');

  // Demo 3: Timer/Interval with cleanup
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Demo 4: Data fetching simulation
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Demo 5: Window resize listener
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // ========== State for Exercises ==========
  // Exercise 2: Time since page load (starts at 0, counts up every second)
  const [pageLoadSeconds, setPageLoadSeconds] = useState(0);

  // Exercise 3: Mouse position on screen (x, y coordinates)
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Exercise 4: Name saved in localStorage (load saved value on startup)
  const [savedName, setSavedName] = useState(() => {
    return localStorage.getItem('savedName') || '';
  });

  /**
   * EFFECT 1: Runs ONCE when component mounts
   * Empty dependency array [] means "run only on mount"
   */
  useEffect(() => {
    console.log('Component mounted!');
    setMountTime(new Date().toLocaleTimeString());

    // This code runs once when component is added to the DOM
    // Like componentDidMount in class components
  }, []); // Empty array = run once

  /**
   * EFFECT 2: Runs when 'count' changes
   * Effect re-runs every time count value changes
   */
  useEffect(() => {
    console.log('Count changed to:', count);

    if (count === 0) {
      setCountMessage('Counter is at zero');
    } else if (count > 0) {
      setCountMessage(`Counter is positive: ${count}`);
    } else {
      setCountMessage(`Counter is negative: ${count}`);
    }

    // This runs on mount AND whenever count changes
  }, [count]); // Effect depends on count

  /**
   * EFFECT 3: Timer with CLEANUP
   * Return a cleanup function to stop the timer when component unmounts
   * or when dependencies change
   */
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning) {
      console.log('Timer started');
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // CLEANUP FUNCTION: Called before next effect and on unmount
    return () => {
      if (interval) {
        console.log('Timer cleaned up');
        clearInterval(interval);
      }
    };
  }, [isTimerRunning]); // Re-run when timer state changes

  /**
   * EFFECT 4: Data fetching (simulated)
   * Shows loading state and cleanup for async operations
   */
  useEffect(() => {
    // Don't fetch if userId is invalid
    if (userId < 1) return;

    setLoading(true);
    console.log('Fetching user:', userId);

    // Simulate API call
    const timer = setTimeout(() => {
      // Simulated user data
      setUserData({
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
        role: userId % 2 === 0 ? 'Admin' : 'User'
      });
      setLoading(false);
    }, 1000);

    // Cleanup: Cancel fetch if component unmounts or userId changes
    return () => {
      console.log('Cleaning up fetch for user:', userId);
      clearTimeout(timer);
    };
  }, [userId]); // Re-fetch when userId changes

  /**
   * EFFECT 5: Event listener with cleanup
   * Subscribe to browser events
   */
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    console.log('Added resize listener');
    window.addEventListener('resize', handleResize);

    // IMPORTANT: Remove event listener on cleanup!
    return () => {
      console.log('Removed resize listener');
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array = add listener once

  // ============================================================
  // EXERCISE 1: Document Title Updater
  // Updates the browser tab title whenever 'count' changes
  // ============================================================
  useEffect(() => {
    document.title = `Count: ${count}`; // Change the tab title
  }, [count]); // Re-run whenever 'count' changes

  // ============================================================
  // EXERCISE 2: Time Since Page Load
  // Counts seconds from when component first renders
  // ============================================================
  useEffect(() => {
    const interval = setInterval(() => {
      setPageLoadSeconds(prev => prev + 1); // Add 1 every second
    }, 1000);

    return () => clearInterval(interval); // Stop timer on unmount
  }, []); // Empty array = start once on mount

  // ============================================================
  // EXERCISE 3: Mouse Position Tracker
  // Tracks cursor position anywhere on the page
  // ============================================================
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX); // Get horizontal position
      setMouseY(e.clientY); // Get vertical position
    };

    window.addEventListener('mousemove', handleMouseMove); // Listen to mouse moves
    return () => window.removeEventListener('mousemove', handleMouseMove); // Cleanup
  }, []); // Empty array = run once on mount

  // ============================================================
  // EXERCISE 4: localStorage Sync
  // Saves 'savedName' to browser storage whenever it changes
  // ============================================================
  useEffect(() => {
    localStorage.setItem('savedName', savedName); // Save to browser storage
    console.log('Saved to localStorage:', savedName);
  }, [savedName]); // Re-run whenever 'savedName' changes

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">useEffect Hook</h2>
        <p className="text-gray-600 mb-4">
          useEffect lets you synchronize components with external systems and handle side effects.
          Open your browser console to see effect logs!
        </p>
      </div>

      {/* Demo 1: Run Once on Mount */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">1. Run Once on Mount (Empty Dependency Array)</h3>
        <div className="bg-green-50 p-3 rounded">
          <p className="text-sm">Component mounted at: <strong>{mountTime}</strong></p>
          <code className="text-xs block mt-2 bg-white p-2 rounded">
            useEffect(() =&gt; &#123; ... runs once ... &#125;, [])
          </code>
        </div>
      </div>

      {/* Demo 2: Run When Dependency Changes */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">2. Run When Dependency Changes</h3>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setCount(c => c - 1)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            -1
          </button>
          <div className="px-4 py-2 bg-gray-100 rounded font-bold min-w-[60px] text-center">
            {count}
          </div>
          <button
            onClick={() => setCount(c => c + 1)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +1
          </button>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <p className="text-sm">{countMessage}</p>
          <code className="text-xs block mt-2 bg-white p-2 rounded">
            useEffect(() =&gt; &#123; ... runs when count changes ... &#125;, [count])
          </code>
        </div>
      </div>

      {/* Demo 3: Timer with Cleanup */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">3. Timer with Cleanup Function</h3>
        <div className="flex gap-2 items-center mb-3">
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`px-4 py-2 rounded text-white ${
              isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isTimerRunning ? 'Stop' : 'Start'} Timer
          </button>
          <button
            onClick={() => setSeconds(0)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
          <div className="text-2xl font-bold ml-4">
            {seconds}s
          </div>
        </div>
        <div className="bg-purple-50 p-3 rounded">
          <p className="text-sm">Status: {isTimerRunning ? '⏱️ Running' : '⏸️ Stopped'}</p>
          <code className="text-xs block mt-2 bg-white p-2 rounded">
            useEffect(() =&gt; &#123;<br/>
            &nbsp;&nbsp;const interval = setInterval(...);<br/>
            &nbsp;&nbsp;return () =&gt; clearInterval(interval);<br/>
            &#125;, [isTimerRunning])
          </code>
        </div>
      </div>

      {/* Demo 4: Data Fetching */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">4. Data Fetching (with Loading State)</h3>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setUserId(Math.max(1, userId - 1))}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Previous User
          </button>
          <button
            onClick={() => setUserId(userId + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next User
          </button>
          <span className="px-4 py-2 bg-gray-100 rounded">User ID: {userId}</span>
        </div>
        {loading ? (
          <div className="bg-yellow-50 p-3 rounded">
            <p className="text-sm">⏳ Loading user data...</p>
          </div>
        ) : userData ? (
          <div className="bg-green-50 p-3 rounded">
            <p className="text-sm"><strong>Name:</strong> {userData.name}</p>
            <p className="text-sm"><strong>Email:</strong> {userData.email}</p>
            <p className="text-sm"><strong>Role:</strong> {userData.role}</p>
          </div>
        ) : null}
        <code className="text-xs block mt-2 bg-gray-100 p-2 rounded">
          useEffect(() =&gt; &#123; ... fetch data ... &#125;, [userId])
        </code>
      </div>

      {/* Demo 5: Window Event Listener */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">5. Event Listener (Window Resize)</h3>
        <div className="bg-indigo-50 p-3 rounded">
          <p className="text-sm">Current window width: <strong>{windowWidth}px</strong></p>
          <p className="text-xs text-gray-600 mt-2">Try resizing your browser window!</p>
          <code className="text-xs block mt-2 bg-white p-2 rounded">
            useEffect(() =&gt; &#123;<br/>
            &nbsp;&nbsp;window.addEventListener('resize', handler);<br/>
            &nbsp;&nbsp;return () =&gt; window.removeEventListener('resize', handler);<br/>
            &#125;, [])
          </code>
        </div>
      </div>

      {/* 🎯 EXERCISE 1: Document Title Updater */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">🎯 Exercise 1: Document Title Updater</h3>
        <p className="text-sm text-gray-600 mb-2">Press buttons — watch the browser tab title change!</p>
        <div className="flex gap-2 items-center mb-2">
          <button onClick={() => setCount(c => c - 1)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">-1</button>
          <span className="font-bold text-lg min-w-[40px] text-center">{count}</span>
          <button onClick={() => setCount(c => c + 1)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">+1</button>
        </div>
        <p className="text-sm">📌 Browser tab says: <strong>Count: {count}</strong></p>
        <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-x-auto">{`useEffect(() => {
  document.title = \`Count: \${count}\`;  // Updates tab title
}, [count]);                              // Runs when count changes`}</pre>
      </div>

      {/* 🎯 EXERCISE 2: Time Since Page Load */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">🎯 Exercise 2: Time Since Page Load</h3>
        <p className="text-sm text-gray-600 mb-2">Counts seconds since you opened this page. Auto-starts!</p>
        <p className="text-2xl font-bold text-teal-600">⏱️ {pageLoadSeconds}s</p>
        <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-x-auto">{`useEffect(() => {
  const interval = setInterval(() => {
    setPageLoadSeconds(prev => prev + 1); // +1 every second
  }, 1000);
  return () => clearInterval(interval);     // Stop on unmount
}, []);                                     // Run once on mount`}</pre>
      </div>

      {/* 🎯 EXERCISE 3: Mouse Position Tracker */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">🎯 Exercise 3: Mouse Position Tracker</h3>
        <p className="text-sm text-gray-600 mb-2">Move your mouse anywhere on the page!</p>
        <div className="bg-pink-50 p-3 rounded">
          <p className="text-sm">🖱️ X: <strong>{mouseX}</strong> &nbsp; Y: <strong>{mouseY}</strong></p>
        </div>
        <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-x-auto">{`useEffect(() => {
  const track = (e: MouseEvent) => {
    setMouseX(e.clientX);  // Get mouse X position
    setMouseY(e.clientY);  // Get mouse Y position
  };
  window.addEventListener('mousemove', track);   // Listen to mouse
  return () => window.removeEventListener('mousemove', track); // Cleanup
}, []);`}</pre>
      </div>

      {/* 🎯 EXERCISE 4: localStorage Sync */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">🎯 Exercise 4: localStorage Sync</h3>
        <p className="text-sm text-gray-600 mb-2">Type something, then <strong>refresh the page</strong> — it stays! 🪄</p>
        <input
          type="text"
          value={savedName}
          onChange={(e) => setSavedName(e.target.value)}
          placeholder="Type your name..."
          className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        {savedName && <p className="text-sm mt-2">👋 Hello, {savedName}!</p>}
        <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-x-auto">{`// Load from localStorage on startup
const [savedName, setSavedName] = useState(() => {
  return localStorage.getItem('savedName') || '';
});

// Save to localStorage when it changes
useEffect(() => {
  localStorage.setItem('savedName', savedName);
}, [savedName]);`}</pre>
      </div>

      {/* Important Rules */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h3 className="font-bold mb-2">⚠️ Important Rules</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Always cleanup side effects</strong> - Return cleanup function for timers, subscriptions, listeners</li>
          <li><strong>Specify all dependencies</strong> - Include all values used inside effect</li>
          <li><strong>Effects run after render</strong> - DOM is updated before effect runs</li>
          <li><strong>Don't use async directly in useEffect</strong> - Create async function inside instead</li>
          <li><strong>Be careful with infinite loops</strong> - Updating state in effect without proper dependencies causes loops</li>
        </ul>
      </div>

      {/* Exercise */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-bold mb-2">🎯 Exercise for You</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Create a document title updater that shows the current count in browser tab</li>
          <li>Build a "time since page load" counter</li>
          <li>Add a mouse position tracker using mousemove event</li>
          <li>Create a localStorage sync effect that saves/loads data</li>
        </ol>
      </div>
    </div>
  );
}
