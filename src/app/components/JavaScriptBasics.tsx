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
  // Easy: bas loop ke andar values dekhte hain
  const demonstrateLoopBehavior = () => {
    const results: string[] = [];

    // --- VAR ---
    results.push('--- VAR in loop ---');
    // var: poori function mein accessible hota hai
    for (var i = 0; i < 3; i++) {
      results.push(`  var i = ${i}`);
    }
    // var loop ke bahar bhi zinda hai!
    results.push(`  🔸 Loop ke bahar bhi: var i = ${i}`);

    results.push('');

    // --- LET ---
    results.push('--- LET in loop ---');
    // let: sirf { block } ke andar rehta hai
    for (let j = 0; j < 3; j++) {
      results.push(`  let j = ${j}`);
    }
    // let yahan exist nahi karta!
    results.push('  🔸 Loop ke bahar: let j not found ❌');

    results.push('');
    results.push('💡 Rule: loop mein "let" use karo!');
    results.push('   "var" loop ke bahar bhi rehta hai → problems!');

    setOutput(results);
  };

  // ----------------------------------------------
  // EXERCISE 2: Const Array
  // ----------------------------------------------
  // Simple basic example: const array mein items add/remove kaise karein?
  const demonstrateConstArray = () => {
    const results: string[] = [];

    // 1. const array banaya - isme items change kar sakte hain
    const fruits = ['apple', 'banana'];
    results.push('Start: ' + fruits);

    // 2. push() - end mein naya item add karo
    fruits.push('mango');
    results.push('push(mango): ' + fruits);

    // 3. pop() - end se last item hatao
    fruits.pop();
    results.push('pop(): ' + fruits);

    // 4. const variable ko dobara assign nahi kar sakte
    // fruits = ['kiwi']; // ❌ ye error dega!

    results.push('');
    results.push('const array:');
    results.push('✅ items change kar sakte hain (push/pop)');
    results.push('❌ variable ko reassign nahi kar sakte');

    setOutput(results);
  };

  // ----------------------------------------------
  // EXERCISE 3: Redeclare Errors
  // ----------------------------------------------
  // Simple basic example: var, let, const ko dobara declare karna
  const demonstrateRedeclareErrors = () => {
    const results: string[] = [];

    // 1. var - ✅ dobara declare kar sakte hain (koi error nahi)
    var a = 10;
    var a = 20; // var ko dubara likh sakte hain!
    results.push('var: a = ' + a + ' ✅ (redeclare allowed)');

    // 2. let - ❌ dobara declare nahi kar sakte
    // let b = 10;
    // let b = 20; // ye line error degi! SyntaxError
    results.push('let: ❌ redeclare nahi kar sakte');

    // 3. const - ❌ dobara declare ya value change nahi kar sakte
    // const c = 10;
    // const c = 20; // error: SyntaxError
    // c = 20;        // error: TypeError
    results.push('const: ❌ redeclare nahi kar sakte');
    results.push('const: ❌ reassign bhi nahi kar sakte');

    results.push('');
    results.push('Rule:');
    results.push('var ✅ redeclare ho sakta hai');
    results.push('let ❌ redeclare nahi ho sakta');
    results.push('const ❌ redeclare + reassign dono nahi');

    setOutput(results);
  };
    results.push(`❌ const reassign: TypeError (Assignment to constant variable)`);

    results.push('');
    results.push('📌 Rule:');
    results.push('   • var ✅ redeclare ho sakta hai');
    results.push('   • let ❌ redeclare nahi ho sakta');
    results.push('   • const ❌ redeclare + reassign dono nahi');

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
{/* Challenge for students */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-bold mb-2">🎯 Challenge Yourself</h3>
        <p className="text-sm mb-2">
          Now that you have seen the demos, try these challenges:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Create a demo showing what happens when you use <code>const</code> with a <code>for...in</code> loop</li>
          <li>Write a function that uses <code>let</code> inside a nested block and show it&apos;s not accessible outside</li>
          <li>Compare <code>typeof</code> of a hoisted <code>var</code> vs accessing a <code>let</code> before declaration (try/catch)</li>
        </ol>
      </div>
    </div>
  );
}
