import { useState } from 'react';

/**
 * JAVASCRIPT BASICS: VAR, CONST, LET
 *
 * KEY DIFFERENCES:
 * - var: Function-scoped, can be redeclared, can be updated, hoisted
 * - let: Block-scoped, cannot be redeclared, can be updated, not hoisted
 * - const: Block-scoped, cannot be redeclared, cannot be updated, not hoisted
 */

export function JavaScriptBasics() {

  const [output, setOutput] = useState<string[]>([]);

  // ── Extra state for Exercise 2 (interactive array) ──
  const [fruits, setFruits] = useState(['🍎 apple', '🍌 banana', '🥭 mango']);
  const [fruitLog, setFruitLog] = useState<string[]>([]);

  // Demo 1: Scope differences
  const demonstrateScope = () => {
    let num =5;
    alert(num);
    const results: string[] = [];

    if (true) {
      var varVariable = "I'm var - accessible outside this block";
    }
    results.push(`var outside block: ${varVariable}`);

    if (true) {
      let letVariable = "I'm let - only inside this block";
      results.push(`let inside block: ${letVariable}`);
    }
    results.push(`let outside block: ❌ ReferenceError (block-scoped, not accessible here)`);

    setOutput(results);
  };

  // Demo 2: Reassignment
  const demonstrateReassignment = () => {
    const results: string[] = [];

    var varNum = 10;
    results.push(`var initial: ${varNum}`);
    varNum = 20;
    results.push(`var updated: ${varNum}`);
    var varNum = 30;
    results.push(`var redeclared: ${varNum}`);

    let letNum = 10;
    results.push(`let initial: ${letNum}`);
    letNum = 20;
    results.push(`let updated: ${letNum}`);

    const constNum = 10;
    results.push(`const value: ${constNum}`);

    const person = { name: 'John', age: 25 };
    results.push(`const object initial: ${JSON.stringify(person)}`);
    person.age = 26;
    results.push(`const object modified: ${JSON.stringify(person)}`);

    setOutput(results);
  };

  // Demo 3: Hoisting
  const demonstrateHoisting = () => {
    const results: string[] = [];

    results.push(`var before declaration: ${typeof varHoisted}`);
    var varHoisted = 'I am hoisted';
    results.push(`var after declaration: ${varHoisted}`);

    results.push(`let before declaration: ❌ ReferenceError - Temporal Dead Zone`);
    let letNotHoisted = 'I am not hoisted';
    results.push(`let after declaration: ${letNotHoisted}`);

    setOutput(results);
  };

  // ─────────────────────────────────────────────────
  // Exercise 1: Loop Behavior — shows var leaks vs let stays
  // ─────────────────────────────────────────────────
  const demonstrateLoopBehavior = () => {
    const results: string[] = [];

    results.push('┌──────────────────────────────────────────┐');
    results.push('│ 🔴  var loop                            │');
    results.push('└──────────────────────────────────────────┘');

    for (var i = 0; i < 3; i++) {
      results.push(`  ▶ iteration ${i + 1}: i = ${i}`);
    }
    results.push(`  ⚠️  AFTER loop → i = ${i}  (still exists!)`);
    results.push('');

    results.push('┌──────────────────────────────────────────┐');
    results.push('│ 🟢  let loop                            │');
    results.push('└──────────────────────────────────────────┘');

    for (let j = 0; j < 3; j++) {
      results.push(`  ▶ iteration ${j + 1}: j = ${j}`);
    }
    results.push(`  ✅ AFTER loop → j is gone (block-scoped)`);
    results.push('');

    results.push('📌  var → function-scoped  (leaks out)');
    results.push('📌  let → block-scoped     (stays in)');
    results.push('👉  Always use let in loops!');

    setOutput(results);
  };

  // ─────────────────────────────────────────────────
  // Exercise 2: Const Array — interactive (each button = one action)
  // ─────────────────────────────────────────────────
  const pushFruit = () => {
    setFruits(prev => [...prev, '🍊 orange']);
    setFruitLog(prev => [...prev, `✅ push("🍊 orange")`]);
  };

  const popFruit = () => {
    setFruits(prev => {
      if (prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
    setFruitLog(prev => [...prev, `✅ pop() — removed last item`]);
  };

  const changeFruit = () => {
    setFruits(prev => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      next[0] = '🍇 grape';
      return next;
    });
    setFruitLog(prev => [...prev, `✅ fruits[0] = "🍇 grape"`]);
  };

  const resetFruits = () => {
    setFruits(['🍎 apple', '🍌 banana', '🥭 mango']);
    setFruitLog([]);
  };

  // ─────────────────────────────────────────────────
  // Exercise 3: Redeclaration & Reassignment — clean table
  // ─────────────────────────────────────────────────
  const demonstrateRedeclareErrors = () => {
    const results: string[] = [];

    results.push('┌─────────────────────────────────────────────┐');
    results.push('│ 🔵  var                                    │');
    results.push('├─────────────────────────────────────────────┤');
    var a = 5;
    results.push(`│  var a = 5          → a = ${a}`);
    var a = 10;
    results.push(`│  var a = 10         → a = ${a}   ✅ redeclare`);
    a = 20;
    results.push(`│  a = 20             → a = ${a}   ✅ reassign`);
    results.push('└─────────────────────────────────────────────┘');
    results.push('');

    results.push('┌─────────────────────────────────────────────┐');
    results.push('│ 🟡  let                                    │');
    results.push('├─────────────────────────────────────────────┤');
    let b = 5;
    results.push(`│  let b = 5          → b = ${b}`);
    b = 10;
    results.push(`│  b = 10             → b = ${b}   ✅ reassign`);
    results.push(`│  let b = 10         → ❌ SyntaxError!`);
    results.push('└─────────────────────────────────────────────┘');
    results.push('');

    results.push('┌─────────────────────────────────────────────┐');
    results.push('│ 🔴  const                                  │');
    results.push('├─────────────────────────────────────────────┤');
    const c = 5;
    results.push(`│  const c = 5        → c = ${c}`);
    results.push(`│  c = 10             → ❌ TypeError!`);
    results.push(`│  const c = 10       → ❌ SyntaxError!`);
    results.push('└─────────────────────────────────────────────┘');
    results.push('');

    results.push('┌───────┬────────────┬────────────┐');
    results.push('│       │ Redeclare  │ Reassign   │');
    results.push('├───────┼────────────┼────────────┤');
    results.push('│ var   │    ✅      │    ✅      │');
    results.push('│ let   │    ❌      │    ✅      │');
    results.push('│ const │    ❌      │    ❌      │');
    results.push('└───────┴────────────┴────────────┘');

    setOutput(results);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">JavaScript Basics: var, const, let</h2>
        <p className="text-gray-600 mb-4">
          Click the buttons below to see interactive demonstrations of JavaScript variable declarations.
        </p>
      </div>

      <div className="grid gap-4">

        {/* Demo 1 */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">1. Scope Demonstration</h3>
          <p className="text-sm text-gray-600 mb-3">
            var is function-scoped, while let and const are block-scoped.
          </p>
          <button
            onClick={demonstrateScope}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Run Scope Demo
          </button>
        </div>

        {/* Demo 2 */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">2. Reassignment & Redeclaration</h3>
          <p className="text-sm text-gray-600 mb-3">
            var can be redeclared, let can be updated, const cannot be updated.
          </p>
          <button
            onClick={demonstrateReassignment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Run Reassignment Demo
          </button>
        </div>

        {/* Demo 3 */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">3. Hoisting Behavior</h3>
          <p className="text-sm text-gray-600 mb-3">
            var is hoisted to the top, let and const are in temporal dead zone.
          </p>
          <button
            onClick={demonstrateHoisting}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Run Hoisting Demo
          </button>
        </div>

        {/* Exercise 1 — Loop Behavior */}
        <div className="border-2 rounded-lg p-4 border-orange-400 bg-orange-50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🔄</span>
            <h3 className="font-semibold text-lg">
              4. Loop Behavior — var vs let
            </h3>
            <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-medium">Exercise 1</span>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            <strong>var</strong> leaks outside the loop ❌ &nbsp;|&nbsp; <strong>let</strong> stays inside ✅
          </p>
          <button
            onClick={demonstrateLoopBehavior}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm shadow-sm"
          >
            ▶ Run Loop Demo
          </button>
        </div>

        {/* Exercise 2 — Const Array (interactive) */}
        <div className="border-2 rounded-lg p-4 border-teal-400 bg-teal-50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🍎</span>
            <h3 className="font-semibold text-lg">
              5. Const Array — Click &amp; Change
            </h3>
            <span className="text-xs bg-teal-500 text-white px-2 py-0.5 rounded-full font-medium">Exercise 2</span>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            Click buttons to change the array — <strong>const</strong> lets you mutate, not reassign!
          </p>

          {/* Live array display */}
          <div className="flex flex-wrap gap-2 mb-3">
            {fruits.map((f, i) => (
              <span key={i} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium border border-teal-300">
                {f}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <button onClick={pushFruit} className="px-3 py-1.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium shadow-sm">
              ➕ push("🍊 orange")
            </button>
            <button onClick={popFruit} className="px-3 py-1.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium shadow-sm">
              ➖ pop()
            </button>
            <button onClick={changeFruit} className="px-3 py-1.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium shadow-sm">
              ✏️ fruits[0] = "🍇 grape"
            </button>
            <button onClick={resetFruits} className="px-3 py-1.5 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm font-medium shadow-sm">
              🔄 Reset
            </button>
          </div>

          {/* Action log */}
          {fruitLog.length > 0 && (
            <div className="mt-3 p-2 bg-white rounded border border-teal-200 text-xs text-gray-600 font-mono">
              {fruitLog.map((msg, i) => (
                <div key={i}>{msg}</div>
              ))}
            </div>
          )}
        </div>

        {/* Exercise 3 — Redeclare Errors */}
        <div className="border-2 rounded-lg p-4 border-red-400 bg-red-50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⚠️</span>
            <h3 className="font-semibold text-lg">
              6. Redeclare &amp; Reassign Rules
            </h3>
            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-medium">Exercise 3</span>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            See what works for <strong>var</strong> ✅ vs <strong>let</strong> 🟡 vs <strong>const</strong> 🔴
          </p>
          <button
            onClick={demonstrateRedeclareErrors}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm shadow-sm"
          >
            ▶ Run Demo
          </button>
        </div>

      </div>

      {/* Output Display */}
      {output.length > 0 && (
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <div className="font-bold mb-2">Console Output:</div>
          {output.map((line, index) => (
            <div key={index} className="py-1">→ {line}</div>
          ))}
        </div>
      )}

      {/* Best Practices */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h3 className="font-bold mb-2">✨ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Use const by default</strong> - Makes code more predictable</li>
          <li><strong>Use let when you need to reassign</strong> - Like counters or loops</li>
          <li><strong>Avoid var</strong> - It's legacy and can cause unexpected bugs</li>
          <li>Objects and arrays can use const (you can modify contents, just not reassign)</li>
        </ul>
      </div>
{/* Exercise for students */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <h3 className="font-bold mb-2">🎯 Try It Yourself</h3>
        <p className="text-sm mb-2">
          Practice more on your own:
        </p>
        <ol className="list-decimal list-inside space-y-1.5 text-sm">
          <li>Create a <code>const</code> object <code>{'{ name: "Ali", age: 20 }'}</code> and change its properties</li>
          <li>Write a loop from 1 to 5 using <code>var</code> then <code>let</code> — see the difference</li>
          <li>Try <code>arr = [1,2,3]</code> vs <code>arr.push(4)</code> with a const array</li>
        </ol>
      </div>
    </div>
  );
}