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
