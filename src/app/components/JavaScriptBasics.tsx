import { useState } from 'react';

/**
 * JAVASCRIPT BASICS: VAR, CONST, LET
 *
 * This component demonstrates the key differences between var, const, and let in JavaScript.
 * Understanding these is crucial before diving into React.
 *
 * KEY DIFFERENCES:
 * - var: Function-scoped, can be redeclared, can be updated, hoisted
 * - let: Block-scoped, cannot be redeclared, can be updated, not hoisted
 * - const: Block-scoped, cannot be redeclared, cannot be updated, not hoisted
 */

export function JavaScriptBasics() {
  const [output, setOutput] = useState<string[]>([]);
  // Demo 1: Scope differences
  const demonstrateScope = () => {
    const results: string[] = [];
    // VAR - Function scoped
    if (true) {
      var varVariable = "I'm var - accessible outside this block, Branch of Ali";
    }
    results.push(`var outside block: ${varVariable}`);

    // LET - Block scoped
    if (true) {
      let letVariable = "I'm let - only inside this block";
      results.push(`let inside block: ${letVariable}`);
    }
    // Uncommenting below would cause an error:
    // results.push(`let outside block: ${letVariable}`); // Error!

    setOutput(results);
  };

  // Demo 2: Reassignment
  const demonstrateReassignment = () => {
    const results: string[] = [];

    // VAR - Can be redeclared and updated
    var varNum = 10;
    results.push(`var initial: ${varNum}`);
    varNum = 20; // Works
    results.push(`var updated: ${varNum}`);
    var varNum = 30; // Redeclaration works (not recommended!)
    results.push(`var redeclared: ${varNum}`);

    // LET - Can be updated but not redeclared
    let letNum = 10;
    results.push(`let initial: ${letNum}`);
    letNum = 20; // Works
    results.push(`let updated: ${letNum}`);
    // let letNum = 30; // Would cause error!

    // CONST - Cannot be updated or redeclared
    const constNum = 10;
    results.push(`const value: ${constNum}`);
    // constNum = 20; // Would cause error!
    // const constNum = 30; // Would cause error!

    // IMPORTANT: const with objects/arrays
    const person = { name: 'John', age: 25 };
    results.push(`const object initial: ${JSON.stringify(person)}`);
    person.age = 26; // We can modify properties!
    results.push(`const object modified: ${JSON.stringify(person)}`);
    // person = {}; // But we can't reassign the variable itself

    setOutput(results);
  };

  // Demo 4: Loop Behavior — var vs let
  const demonstrateLoopVarVsLet = () => {
    const results: string[] = [];
    results.push('═══ LOOP BEHAVIOR: var vs let ═══');

    // ── Using VAR in a loop ──
    results.push('--- Using var ---');
    for (var v = 0; v < 3; v++) {
      results.push(`  Inside loop: var v = ${v}`);
    }
    // var LEAKS outside the loop!
    results.push(`  After loop, v is STILL accessible: ${v} ⚠️ (leaked out!)`);

    // ── Using LET in a loop ──
    results.push('--- Using let ---');
    for (let l = 0; l < 3; l++) {
      results.push(`  Inside loop: let l = ${l}`);
    }
    // let does NOT leak — uncommenting below would crash:
    // results.push(`After loop: ${l}`); // ReferenceError!
    results.push('  After loop, l is NOT accessible ✅ (block-scoped)');

    // ── Classic closure trap: var vs let with stored functions ──
    results.push('--- Closure trap (storing functions) ---');
    const varFuncs: (() => number)[] = [];
    const letFuncs: (() => number)[] = [];

    for (var vi = 0; vi < 3; vi++) {
      varFuncs.push(() => vi);
    }
    for (let li = 0; li < 3; li++) {
      letFuncs.push(() => li);
    }

    results.push('  var functions all return: ' + varFuncs.map(f => f()).join(', ') + '  ← all 3! (shared binding)');
    results.push('  let functions all return: ' + letFuncs.map(f => f()).join(', ') + '  ← correct! (fresh binding per iteration)');

    setOutput(results);
  };

  // Demo 5: Const Array — add/remove items
  const demonstrateConstArray = () => {
    const results: string[] = [];
    results.push('═══ CONST ARRAY: Mutating Contents ═══');

    const fruits: string[] = ['🍎 apple', '🍌 banana'];
    results.push(`Initial array: [${fruits.join(', ')}]`);

    // ✅ ADDING items (push, unshift)
    fruits.push('🍊 orange');
    results.push(`After push('🍊 orange'): [${fruits.join(', ')}]`);
    fruits.unshift('🍇 grape');
    results.push(`After unshift('🍇 grape'): [${fruits.join(', ')}]`);

    // ✅ REMOVING items (pop, shift, splice)
    const popped = fruits.pop();
    results.push(`After pop() → removed '${popped}': [${fruits.join(', ')}]`);
    const shifted = fruits.shift();
    results.push(`After shift() → removed '${shifted}': [${fruits.join(', ')}]`);
    fruits.splice(1, 1); // remove 1 item at index 1
    results.push(`After splice(1,1): [${fruits.join(', ')}]`);

    // ✅ MODIFYING by index
    fruits[0] = '🍓 strawberry';
    results.push(`After fruits[0] = '🍓 strawberry': [${fruits.join(', ')}]`);

    // ❌ CANNOT reassign the whole array
    results.push('');
    results.push('⚠️  Trying fruits = ["🍕 pizza"] would throw:');
    results.push('   TypeError: Assignment to constant variable.');

    setOutput(results);
  };

  // Demo 6: Redeclaration Errors
  const demonstrateRedeclarationErrors = () => {
    const results: string[] = [];
    results.push('═══ REDECLARATION ERROR MESSAGES ═══');

    // ── VAR: redeclaration is ALLOWED (silently) ──
    var pet = 'dog';
    results.push(`var pet = '${pet}'`);
    var pet = 'cat';  // No error! Silently overwrites
    results.push(`var pet = '${pet}' → ✅ No error! var allows redeclaration (dangerous!)`);

    // ── LET: redeclaration throws SyntaxError ──
    let score = 100;
    results.push(`let score = ${score}`);
    try {
      // @ts-expect-error — we WANT this to fail at runtime
      eval('let score = 200');
    } catch (e) {
      if (e instanceof SyntaxError) {
        results.push(`let score = 200 → ❌ SyntaxError: ${e.message}`);
      }
    }

    // ── CONST: redeclaration throws SyntaxError ──
    const name = 'Alice';
    results.push(`const name = '${name}'`);
    try {
      // @ts-expect-error — we WANT this to fail at runtime
      eval('const name = "Bob"');
    } catch (e) {
      if (e instanceof SyntaxError) {
        results.push(`const name = 'Bob' → ❌ SyntaxError: ${e.message}`);
      }
    }

    // ── CONST: reassignment throws TypeError ──
    const pi = 3.14;
    results.push(`const pi = ${pi}`);
    try {
      // @ts-expect-error — we WANT this to fail at runtime
      eval('pi = 3.14159');
    } catch (e) {
      if (e instanceof TypeError) {
        results.push(`pi = 3.14159 → ❌ TypeError: ${e.message}`);
      }
    }

    // ── Summary ──
    results.push('');
    results.push('📋 Summary:');
    results.push('  var redeclaration → SILENT (no error, just overwrites)');
    results.push('  let redeclaration → SyntaxError (caught at parse time)');
    results.push('  const redeclaration → SyntaxError (caught at parse time)');
    results.push('  const reassignment  → TypeError  (caught at runtime)');

    setOutput(results);
  };

  // Demo 3: Hoisting
  const demonstrateHoisting = () => {
    const results: string[] = [];

    // VAR is hoisted (declared at the top of function, but undefined until assigned)
    results.push(`var before declaration: ${typeof varHoisted}`); // undefined
    var varHoisted = 'I am hoisted';
    results.push(`var after declaration: ${varHoisted}`);

    // LET and CONST are not hoisted (temporal dead zone)
    // Uncommenting would cause error:
    // results.push(`let before declaration: ${letNotHoisted}`); // Error!
    let letNotHoisted = 'I am not hoisted';
    results.push(`let after declaration: ${letNotHoisted}`);

    setOutput(results);
  };

  // Demo 4: Loop behavior with var vs let
  const demonstrateLoopVarLet = () => {
    const results: string[] = [];

    results.push('--- var in a loop ---');
    var funcsWithVar: (() => string)[] = [];
    for (var i = 0; i < 3; i++) {
      funcsWithVar.push(() => `var i = ${i}`);
    }
    // All callbacks reference the same `i` which is now 3
    funcsWithVar.forEach((fn) => results.push(fn()));

    results.push('--- let in a loop ---');
    const funcsWithLet: (() => string)[] = [];
    for (let j = 0; j < 3; j++) {
      funcsWithLet.push(() => `let j = ${j}`);
    }
    // Each callback captures its own `j` value (0, 1, 2)
    funcsWithLet.forEach((fn) => results.push(fn()));

    results.push('');
    results.push('var: all closures share the same hoisted variable');
    results.push('let: each iteration gets its own binding');

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

      {/* Interactive Demos */}
      <div className="grid gap-4">
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

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">4. Loop Behavior: var vs let</h3>
          <p className="text-sm text-gray-600 mb-3">
            In a loop, <code>var</code> shares one variable across all iterations, while <code>let</code> creates a new binding each time.
          </p>
          <button
            onClick={demonstrateLoopVarLet}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Run Loop Demo
          </button>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">5. const Array — Add & Remove Items</h3>
          <p className="text-sm text-gray-600 mb-3">
            <code>const</code> prevents reassignment but allows mutation. You can add/remove items from a <code>const</code> array.
          </p>
          <button
            onClick={demonstrateConstArray}
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Run Array Demo
          </button>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">6. Redeclaration Error Messages</h3>
          <p className="text-sm text-gray-600 mb-3">
            <code>var</code> allows redeclaration, but <code>let</code> and <code>const</code> throw errors.
          </p>
          <button
            onClick={demonstrateRedeclarationErrors}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Run Redeclaration Demo
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

      {/* Exercise completed */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="font-bold mb-2">🎉 All Exercises Completed!</h3>
        <p className="text-sm">
          Both tasks are now implemented as interactive demos above.
        </p>
      </div>
    </div>
  );
}