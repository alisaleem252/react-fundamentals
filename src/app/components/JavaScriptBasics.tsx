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

  // 🎯 EXERCISE 1: Loop Behavior — var (shared) vs let (scoped)
  const demonstrateLoopBehavior = () => {
    const r: string[] = [];
    const add = (s: string) => r.push(s);

    add('--- var: ek hi variable sab mein share ---');
    for (var i = 0; i < 3; i++) { /* i exists outside loop */ }
     add(`var value i = ${i} (accessible!)`);

    // add('--- let: har iteration ka apna variable ---');
    for (let j = 0; j < 3; j++) { add(`  j = ${j} (sirf andar)`); }

    setOutput(r);
  };

  // 🎯 EXERCISE 2: Const Array — items change ho sakte hain, reassign nahi
  const demonstrateConstArray = () => {
    const r: string[] = [];
    const add = (s: string) => r.push(s);

    const fruits = ['apple', 'banana'];
    add(`initial: [${fruits}]`);
    fruits.push('mango');  add(`after push:  [${fruits}]`);
    fruits.pop();          add(`after pop:   [${fruits}]`);
    add(`❌ fruits = ['kiwi'] not allowed (const reassign error)`);

    setOutput(r);
  };

  // 🎯 EXERCISE 3: Redeclaration — var ✅ let ❌ const ❌
  const demonstrateRedeclareErrors = () => {
    const r: string[] = [];
    const add = (s: string) => r.push(s);

    var a = 5; var a = 10; add(`var a = 5 → var a = 10 ✅ a = ${a}`);
    let b = 5;             add(`let b = 5 ✅ | let b = 10 ❌ SyntaxError`);
    const c = 5;           add(`const c = 5 ✅ | const c = 10 ❌ SyntaxError | c = 10 ❌ TypeError`);

    setOutput(r);
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

        {/* 🎯 Exercise 1 — Loop Behavior (var vs let) */}
        <div className="border rounded-lg p-4 border-orange-300 bg-orange-50">
          <h3 className="font-semibold mb-2">
            🎯 Exercise 1: Loop Behavior — var vs let
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            <strong>var</strong> → loop mein <strong>ek hi variable</strong> sab iterations mein share hota hai (isliye sab 3 print karega).<br />
            <strong>let</strong> → <strong>har iteration ko apna naya variable</strong> milta hai (isliye 0,1,2 print karega).
          </p>
          <button
            onClick={demonstrateLoopBehavior}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            ▶ Run Loop Demo
          </button>
        </div>

        {/* 🎯 Exercise 2 — Const Array */}
        <div className="border rounded-lg p-4 border-teal-300 bg-teal-50">
          <h3 className="font-semibold mb-2">
            🎯 Exercise 2: Const Array — Items Add/Remove karna
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            <strong>const</strong> array ki <strong>contents (items) change</strong> ho sakti hain — push, pop, splice sab chalega!<br />
            Lekin array ko <strong>dobara assign nahi kar sakte</strong> ❌
          </p>
          <button
            onClick={demonstrateConstArray}
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            ▶ Run Const Array Demo
          </button>
        </div>

        {/* 🎯 Exercise 3 — Redeclare Errors */}
        <div className="border rounded-lg p-4 border-red-300 bg-red-50">
          <h3 className="font-semibold mb-2">
            🎯 Exercise 3: Redeclaration Errors — var ✅, let & const ❌
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            <strong>var</strong> ✅ dubara declare ho sakta hai bina error ke.<br />
            <strong>let</strong> ❌ aur <strong>const</strong> ❌ dubara declare karo toh <strong>SyntaxError</strong> aata hai.<br />
            <strong>const</strong> ko nayi value assign karo toh <strong>TypeError</strong> aata hai.
          </p>
          <button
            onClick={demonstrateRedeclareErrors}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            ▶ Run Error Demo
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