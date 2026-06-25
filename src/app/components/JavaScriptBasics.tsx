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

  // Exercise 1: Loop Behavior (var vs let)
  const demonstrateLoopBehavior = () => {
    const results: string[] = [];

    results.push('--- VAR in loop (all share same i) ---');
    for (var i = 0; i < 3; i++) {
      setTimeout(() => {
        results.push(`var: ${i}`);
      }, 100);
    }

    results.push('--- LET in loop (each iteration has own j) ---');
    for (let j = 0; j < 3; j++) {
      setTimeout(() => {
        results.push(`let: ${j}`);
      }, 100);
    }

    setTimeout(() => {
      setOutput([...results]);
    }, 200);
  };

  // Exercise 2: Const Array — adding/removing items
  const demonstrateConstArray = () => {
    const results: string[] = [];

    const fruits = ['apple', 'banana', 'mango'];
    results.push(`const array initial: [${fruits}]`);

    fruits.push('orange');
    results.push(`after push('orange'): [${fruits}]`);

    fruits.pop();
    results.push(`after pop(): [${fruits}]`);

    fruits.splice(1, 1);
    results.push(`after splice(1,1) remove 'banana': [${fruits}]`);

    results.push(`fruits = [] → ❌ TypeError: Assignment to constant variable`);
    results.push(` const array ki contents change ho sakti hain, variable nahi!`);

    setOutput(results);
  };

  // Exercise 3: Error messages when redeclaring variables
  const demonstrateRedeclareErrors = () => {
    const results: string[] = [];

    var x = 10;
    var x = 20;
    results.push(`var redeclare: No error — var x = 10 then var x = 20 → x = ${x}`);

    let y = 10;
    // let y = 20; // ❌ SyntaxError
    results.push(`let redeclare: ❌ SyntaxError: Identifier 'y' has already been declared`);
    results.push(`  (let y = ${y} already exists — cannot declare again)`);

    const z = 10;
    // const z = 20; // ❌ SyntaxError
    results.push(`const redeclare: ❌ SyntaxError: Identifier 'z' has already been declared`);
    results.push(`  (const z = ${z} already exists — cannot declare again)`);

    // z = 20; // ❌ TypeError
    results.push(`const reassign: ❌ TypeError: Assignment to constant variable`);
    results.push(`  (z = 20 not allowed — const cannot be updated)`);

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
        <div className="border rounded-lg p-4 border-orange-300 bg-orange-50">
          <h3 className="font-semibold mb-2">
            4. Loop Behavior (var vs let)
            
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            <strong>var</strong> loop mein sab iterations ek hi variable share karte hain.
            <strong> let</strong> har iteration ko apna alag binding deta hai.
          </p>
          <button
            onClick={demonstrateLoopBehavior}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Run Loop Demo
          </button>
        </div>

        {/* Exercise 2 — Const Array */}
        <div className="border rounded-lg p-4 border-teal-300 bg-teal-50">
          <h3 className="font-semibold mb-2">
            5. Const Array — Add / Remove Items
            
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            <strong>const</strong> array ki contents change ho sakti hain (push, pop, splice) — lekin array ko dobara assign nahi kar sakte.
          </p>
          <button
            onClick={demonstrateConstArray}
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Run Const Array Demo
          </button>
        </div>

        {/* Exercise 3 — Redeclare Errors */}
        <div className="border rounded-lg p-4 border-red-300 bg-red-50">
          <h3 className="font-semibold mb-2">
            6. Redeclaration Error Messages
            
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            <strong>var</strong> redeclare ho sakta hai bina error ke.
            <strong> let</strong> aur <strong>const</strong> redeclare karne par SyntaxError aata hai.
          </p>
          <button
            onClick={demonstrateRedeclareErrors}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Run Error Messages Demo
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
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-bold mb-2">🎯 Exercise for You</h3>
        <p className="text-sm mb-2">
          Try modifying the code above to:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Add a demo showing loop behavior with var vs let</li>
          <li>Create a const array and demonstrate adding/removing items</li>
          <li>Show the difference in error messages when trying to redeclare variables</li>
        </ol>
      </div>
    </div>
  );
}
