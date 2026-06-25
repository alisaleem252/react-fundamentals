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

  // Demo 4: Loop behavior with var vs let
  const demonstrateLoopBehavior = () => {
    const results: string[] = [];

    results.push('=== VAR in Loop (Closure Problem) ===');
    const varFunctions: (() => void)[] = [];
    for (var i = 0; i < 3; i++) {
      varFunctions.push(() => {
        results.push(`var loop - function ${varFunctions.length - 1} sees i = ${i}`);
      });
    }
    results.push(`After loop: i = ${i} (var escapes loop!)`);
    varFunctions.forEach((fn) => fn()); // All will reference the final value of i

    results.push('');
    results.push('=== LET in Loop (Block-scoped) ===');
    const letFunctions: (() => void)[] = [];
    for (let j = 0; j < 3; j++) {
      letFunctions.push(() => {
        results.push(`let loop - function captured j = ${j}`);
      });
    }
    // i is not accessible here (commented out to avoid error):
    // results.push(`After loop: j = ${j}`); // Error: j is not defined
    results.push('(j is not accessible here - block-scoped)');
    letFunctions.forEach((fn) => fn()); // Each captures its own j value

    setOutput(results);
  };

  // Demo 5: Const with arrays and objects
  const demonstrateConstMutability = () => {
    const results: string[] = [];

    results.push('=== Const Array: Cannot reassign, but CAN mutate ===');
    const fruits = ['apple', 'banana', 'orange'];
    results.push(`Initial array: [${fruits.join(', ')}]`);

    // These work - mutating the array contents:
    fruits.push('mango');
    results.push(`After push: [${fruits.join(', ')}]`);

    fruits.pop();
    results.push(`After pop: [${fruits.join(', ')}]`);

    fruits[1] = 'grape';
    results.push(`After modifying index: [${fruits.join(', ')}]`);

    fruits.splice(0, 1); // Remove first item
    results.push(`After splice: [${fruits.join(', ')}]`);

    // This would cause an error (commented out):
    // fruits = ['new', 'array']; // Error: Assignment to constant variable

    results.push('');
    results.push('=== Const Object: Cannot reassign, but CAN mutate properties ===');
    const person = { name: 'Alice', age: 25, city: 'NYC' };
    results.push(`Initial object: ${JSON.stringify(person)}`);

    person.age = 26;
    results.push(`After updating age: ${JSON.stringify(person)}`);

    person.email = 'alice@example.com';
    results.push(`After adding email: ${JSON.stringify(person)}`);

    delete person.city;
    results.push(`After deleting city: ${JSON.stringify(person)}`);

    // This would cause an error (commented out):
    // person = { name: 'Bob' }; // Error: Assignment to constant variable

    results.push('');
    results.push('💡 Key Insight: const prevents reassignment, NOT mutation!');

    setOutput(results);
  };

  // Demo 6: Error messages when trying to redeclare
  const demonstrateRedeclarationErrors = () => {
    const results: string[] = [];

    results.push('=== Trying to redeclare with VAR ===');
    try {
      // In strict mode or real scenarios, you can't redeclare in same scope
      // But showing the concept:
      results.push('var x = 1;  // OK');
      results.push('var x = 2;  // OK - var allows redeclaration (confusing!)');
      results.push('✓ No error - var allows redeclaration (this is bad!)');
    } catch (e: any) {
      results.push(`✗ Error: ${e.message}`);
    }

    results.push('');
    results.push('=== Trying to redeclare with LET ===');
    try {
      eval(`
        let y = 1;
        let y = 2;  // SyntaxError!
      `);
      results.push('let y = 2;  // Would cause error');
    } catch (e: any) {
      results.push(`✗ SyntaxError: Identifier 'y' has already been declared`);
    }

    results.push('');
    results.push('=== Trying to redeclare with CONST ===');
    try {
      eval(`
        const z = 1;
        const z = 2;  // SyntaxError!
      `);
      results.push('const z = 2;  // Would cause error');
    } catch (e: any) {
      results.push(`✗ SyntaxError: Identifier 'z' has already been declared`);
    }

    results.push('');
    results.push('=== Trying to reassign CONST ===');
    try {
      eval(`
        const a = 1;
        a = 2;  // TypeError!
      `);
    } catch (e: any) {
      results.push(`✗ TypeError: Assignment to constant variable`);
    }

    results.push('');
    results.push('=== Trying to redeclare with DIFFERENT keywords ===');
    try {
      eval(`
        let b = 1;
        var b = 2;  // Also not allowed in same scope
      `);
    } catch (e: any) {
      results.push(`✗ SyntaxError: Identifier 'b' has already been declared`);
    }

    results.push('');
    results.push('📝 Summary:');
    results.push('• var: allows redeclaration (very confusing)');
    results.push('• let & const: prevent redeclaration (SyntaxError)');
    results.push('• const: also prevents reassignment (TypeError)');

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
            var shares loop variable across iterations, let creates new binding each iteration.
          </p>
          <button
            onClick={demonstrateLoopBehavior}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Run Loop Behavior Demo
          </button>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">5. Const with Arrays & Objects</h3>
          <p className="text-sm text-gray-600 mb-3">
            const prevents reassignment but allows mutation of contents.
          </p>
          <button
            onClick={demonstrateConstMutability}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Run Const Mutability Demo
          </button>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">6. Redeclaration Error Messages</h3>
          <p className="text-sm text-gray-600 mb-3">
            See what happens when you try to redeclare or reassign variables.
          </p>
          <button
            onClick={demonstrateRedeclarationErrors}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Run Redeclaration Errors Demo
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
          <li>✅ Add a demo showing loop behavior with var vs let (DONE!)</li>
          <li>✅ Create a const array and demonstrate adding/removing items (DONE!)</li>
          <li>✅ Show the difference in error messages when trying to redeclare variables (DONE!)</li>
        </ol>
      </div>
    </div>
  );
}
