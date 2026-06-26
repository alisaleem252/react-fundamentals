import { useState } from 'react'; // React se useState hook import kar rahe hain

/**
 * JAVASCRIPT BASICS: VAR, CONST, LET
 *
 * Ye component var, const, aur let ke beech farq dikhata hai JavaScript mein.
 * React mein jaane se pehle ye samajhna bohat zaroori hai.
 *
 * KEY DIFFERENCES:
 * - var: Function-scoped, dobara declare kar sakte hain, update kar sakte hain, hoisted
 * - let: Block-scoped, dobara declare nahi kar sakte, update kar sakte hain, hoisted nahi
 * - const: Block-scoped, dobara declare nahi kar sakte, update nahi kar sakte, hoisted nahi
 */

export function JavaScriptBasics() { // JavaScriptBasics component shuru
  const [output, setOutput] = useState<string[]>([]); // output state banaya jo array rakhega

  // Demo 1: Scope differences - Scope ke farq
  const demonstrateScope = () => { // scope demo function
    const results: string[] = []; // results array banayi

    // VAR - Function scoped - Function ke andar hi accessible
    if (true) { // agar block shuru
-      let letVariable = "let is only visible inside this block"; // let sirf is block mein hai
      const constVariable = "const is only visible inside this block"; // const bhi block scoped hai
    }
    results.push(`var outside block: ${varVariable}`); // var block ke bahar bhi kaam karta hai

    // LET - Block scoped - Sirf block ke andar
    if (true) { // doosra if block
      let letVariable = "let is only visible inside this block"; // naya let variable sirf yahan hai
      results.push(`let inside block: ${letVariable}`); // yahan variable ki value dikhayein
    }
    // Neeche wali line ko comment hataane se error aayega:
    // results.push(`let outside block: ${letVariable}`); // Error!

    setOutput(results); // state update karein output ke saath
  };

  // Demo 2: Reassignment - Dobara value dena
  const demonstrateReassignment = () => { // reassignment demo function
    const results: string[] = []; // results store karne ke liye array

    // VAR - Dobara declare aur update ho sakta hai
    var varNum = 100; // var declaration
    results.push(`var initial: ${varNum}`); // pehli value push
    varNum = 200; // value update kar rahe hain
    results.push(`var updated: ${varNum}`); // update dikhayein
    var varNum = 300; // var ko dobara declare karna allowed hai
    results.push(`var redeclared: ${varNum}`); // redeclared value push

    // LET - Update ho sakta hai lekin dobara declare nahi
    let letNum = 100; // let declaration
    results.push(`let initial: ${letNum}`); // pehli let value
    letNum = 200; // let variable ko update kar sakte hain
    results.push(`let updated: ${letNum}`); // updated value push
    // let letNum = 300; // Error aayega!

    // CONST - Na update ho sakta hai na dobara declare
    const constNum = 100; // const declare kiya
    results.push(`const value: ${constNum}`); // const value dikhayein
    // constNum = 200; // Error aayega!
    // const constNum = 300; // Error aayega!

    // IMPORTANT: const objects/arrays ke saath
    const person = { name: 'John', age: 25 }; // const object
    results.push(`const object initial: ${JSON.stringify(person)}`); // object ki shuruati state
    person.age = 26; // object property modify karna allowed hai
    results.push(`const object modified: ${JSON.stringify(person)}`); // modified object dikhayein
    // person = {}; // Lekin variable ko dubara assign nahi kar sakte

    setOutput(results); // output state update
  };

  // Demo 3: Hoisting - Uthaan ka concept
  const demonstrateHoisting = () => { // hoisting demo function
    const results: string[] = []; // result array

    // VAR declaration function ke top par chali jaati hai, lekin value abhi undefined hoti hai
    results.push(`var before declaration: ${typeof varHoisted}`); // var abhi undefined hai
    var varHoisted = 'hoisted value'; // var declare aur assign
    results.push(`var after declaration: ${varHoisted}`); // ab value dikh raha hai

    // LET aur CONST ko aise use nahi kar sakte
    // agar neeche wali line ko use kiya to error aayega
    // results.push(`let before declaration: ${letNotHoisted}`); // Error!
    let letNotHoisted = 'not hoisted value'; // let declare kiya
    results.push(`let after declaration: ${letNotHoisted}`); // let ki value dikhayein

    setOutput(results); // output update karein
  };

  // Demo 4: Loop behavior - Loop mein var vs let
  const demonstrateLoopBehavior = () => { // loop behavior demo
    const results: string[] = []; // results array

    results.push('=== VAR in Loop (Closure Problem) ==='); // var loop ka title
    const varFunctions: (() => void)[] = []; // functions ka array
    for (var i = 1; i <= 3; i++) { // var loop shuru
      // yahan har function same var i ko use karega
      varFunctions.push(() => {
        results.push(`var loop sees i = ${i}`); // closure problem dikhayein
      });
    }
    // loop ke baad bhi i available hai, kyunke var function scoped hai
    results.push(`After loop: i = ${i} (var escapes loop)`); // i loop ke baad bhi accessible hai
    varFunctions.forEach((fn, index) => { // var functions ko chalana
      results.push(`function ${index + 1}:`); // function ka label
      fn(); // function execute
    });

    results.push('');
    results.push('=== LET in Loop (Block-scoped) ==='); // let loop ka title
    const letFunctions: (() => void)[] = []; // let function array
    for (let j = 1; j <= 3; j++) { // let loop shuru
      // har iteration mein naya block-scoped j banega
      letFunctions.push(() => {
        results.push(`let loop captured j = ${j}`); // har closure apna j rakhega
      });
    }
    // j yahan available nahi hai, kyunke let block scoped hai
    results.push('(j is not accessible here - block-scoped)'); // j ab accessible nahi
    letFunctions.forEach((fn, index) => { // let functions iterate
      results.push(`function ${index + 1}:`); // function ka label
      fn(); // execute function
    });

    setOutput(results); // output state set kar dein
  };

  // Demo 5: Const arrays aur objects ke saath
  const demonstrateConstMutability = () => { // const mutability demo
    const results: string[] = []; // result array

    results.push('=== Const Array: Cannot reassign, but CAN mutate ==='); // const array title
    const fruits = ['apple', 'banana', 'orange']; // const array declare
    results.push(`Initial array: [${fruits.join(', ')}]`); // shuruati array value

    // array mein element add karna allowed hai
    fruits.push('mango'); // array mutate allowed
    results.push(`After push: [${fruits.join(', ')}]`); // push ke baad array

    // array se aakhri element nikalna allowed hai
    fruits.pop(); // aakhri item hatao
    results.push(`After pop: [${fruits.join(', ')}]`); // pop ke baad array

    // array ke khaas index ki value badal sakte hain
    fruits[1] = 'grape'; // khaas index modify kar rahe hain
    results.push(`After modifying index: [${fruits.join(', ')}]`); // modified array

    // kisi element ko delete karna bhi allowed hai
    fruits.splice(0, 1); // pehla item hatao
    results.push(`After splice: [${fruits.join(', ')}]`); // splice ke baad array

    // const variable ko dubara assign nahi kar sakte
    // fruits = ['new', 'array']; // Error: Assignment to constant variable

    results.push('');
    results.push('=== Const Object: Cannot reassign, but CAN mutate properties ===');
    const person = { name: 'Alice', age: 25, city: 'NYC' }; // const object create
    results.push(`Initial object: ${JSON.stringify(person)}`); // object ki shuruati state

    // object property change karna allowed hai
    person.age = 26; // property update allowed
    results.push(`After updating age: ${JSON.stringify(person)}`); // updated object

    // naya property add kar sakte hain
    person.email = 'alice@example.com'; // naya property add karna allowed
    results.push(`After adding email: ${JSON.stringify(person)}`); // object mein email add

    // object se property remove kar sakte hain
    delete person.city; // property delete kar diya
    results.push(`After deleting city: ${JSON.stringify(person)}`); // city hatane ke baad

    // const object ko dubara assign nahi kar sakte
    // person = { name: 'Bob' }; // Error: Assignment to constant variable

    results.push('');
    results.push('💡 Key Insight: const prevents reassignment, NOT mutation!'); // key insight

    setOutput(results); // output set kar dein
  };

  // Demo 6: Error messages - Error messages jab dobara declare karne ki koshish karein
  const demonstrateRedeclarationErrors = () => { // redeclaration errors demo
    const results: string[] = []; // results array

    results.push('=== var redeclaration ==='); // var redeclaration heading
    // pehli baar x declare kiya
    results.push('var x = 1;'); // code line explain
    // dubara x declare kiya aur value badal gayi
    results.push('var x = 2;  // allowed'); // var dobara declare allowed
    results.push('Result: var allows redeclaration, so x becomes 2'); // result summary

    results.push('');
    results.push('=== let redeclaration ==='); // let heading
    try {
      eval('let y = 1; let y = 2;'); // let dobara declare karke test
    } catch (e: any) {
      // let ko dobara declare karne par SyntaxError aayegi
      results.push(`✗ ${e.name}: ${e.message}`); // error message push
    }

    results.push('');
    results.push('=== const redeclaration ==='); // const heading
    try {
      eval('const z = 1; const z = 2;'); // const redeclare test
    } catch (e: any) {
      // const ko dobara declare karne par bhi SyntaxError aati hai
      results.push(`✗ ${e.name}: ${e.message}`); // error message show
    }

    results.push('');
    results.push('=== const reassignment ==='); // const reassignment heading
    try {
      eval('const a = 1; a = 2;'); // const reassignment test
    } catch (e: any) {
      // const ki value change karne par TypeError aayega
      results.push(`✗ ${e.name}: ${e.message}`); // error message push
    }

    results.push('');
    results.push('Summary:'); // Summary
    results.push('• var: can be redeclared in the same scope'); // var ek hi scope mein dobara declare ho sakta hai
    results.push('• let: redeclaration throws SyntaxError'); // let dobara declare karne par SyntaxError aata hai
    results.push('• const: redeclaration throws SyntaxError and reassignment throws TypeError'); // const dobara declare ya reassign karne par error aata hai

    setOutput(results); // output set
  };

  return (
    <div className="space-y-6"> {/* component wrapper - component ka wrapper */}
      <div> {/* heading section - heading section */}
        <h2 className="text-2xl font-bold mb-2">JavaScript Basics: var, const, let</h2> {/* title - title */}
        <p className="text-gray-600 mb-4"> {/* description paragraph - description paragraph */}
          Click the buttons below to see interactive demonstrations of JavaScript variable declarations.
        </p>
      </div>

      {/* Interactive Demos - Interactive demonstrations */}
      <div className="grid gap-4"> {/* buttons grid - buttons ka grid */}
        <div className="border rounded-lg p-4"> {/* scope demo card */}
          <h3 className="font-semibold mb-2">1. Scope Demonstration</h3> {/* card title - card ka title */}
          <p className="text-sm text-gray-600 mb-3"> {/* card description - card ki description */}
            var is function-scoped, while let and const are block-scoped.
          </p>
          <button
            onClick={demonstrateScope} // button click handler - button dabane ka handler
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" // button style - button ka style
          >
            Run Scope Demo
          </button>
        </div>

        <div className="border rounded-lg p-4"> {/* reassignment demo card */}
          <h3 className="font-semibold mb-2">2. Reassignment & Redeclaration</h3>
          <p className="text-sm text-gray-600 mb-3">
            var can be redeclared, let can be updated, const cannot be updated.
          </p>
          <button
            onClick={demonstrateReassignment} // click karne se demo chalega
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Run Reassignment Demo
          </button>
        </div>

        <div className="border rounded-lg p-4"> {/* hoisting demo card */}
          <h3 className="font-semibold mb-2">3. Hoisting Behavior</h3>
          <p className="text-sm text-gray-600 mb-3">
            var is hoisted to the top, let and const are in temporal dead zone.
          </p>
          <button
            onClick={demonstrateHoisting} // click karne se hoisting demo chalega
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Run Hoisting Demo
          </button>
        </div>

        <div className="border rounded-lg p-4"> {/* loop behavior card */}
          <h3 className="font-semibold mb-2">4. Loop Behavior: var vs let</h3>
          <p className="text-sm text-gray-600 mb-3">
            var shares loop variable across iterations, let creates new binding each iteration.
          </p>
          <button
            onClick={demonstrateLoopBehavior} // click karne se loop demo chalega
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Run Loop Behavior Demo
          </button>
        </div>

        <div className="border rounded-lg p-4"> {/* const mutability card */}
          <h3 className="font-semibold mb-2">5. Const with Arrays & Objects</h3>
          <p className="text-sm text-gray-600 mb-3">
            const prevents reassignment but allows mutation of contents.
          </p>
          <button
            onClick={demonstrateConstMutability} // click karne se const demo chalega
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Run Const Mutability Demo
          </button>
        </div>

        <div className="border rounded-lg p-4"> {/* redeclaration error card */}
          <h3 className="font-semibold mb-2">6. Redeclaration Error Messages</h3>
          <p className="text-sm text-gray-600 mb-3">
            See what happens when you try to redeclare or reassign variables.
          </p>
          <button
            onClick={demonstrateRedeclarationErrors} // click karne se error demo chalega
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Run Redeclaration Errors Demo
          </button>
        </div>
      </div>

      {/* Output Display - Output dikhane ka section */}
      {output.length > 0 && ( // agar output hai to display karo
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <div className="font-bold mb-2">Console Output:</div> {/* output heading - output ka heading */}
          {output.map((line, index) => (
            <div key={index} className="py-1">→ {line}</div>
          ))}
        </div>
      )}

      {/* Best Practices - Behtareen tareeqay */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4"> {/* best practices box */}
        <h3 className="font-bold mb-2">✨ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Use const by default</strong> - Makes code more predictable</li>
          <li><strong>Use let when you need to reassign</strong> - Like counters or loops</li>
          <li><strong>Avoid var</strong> - It's legacy and can cause unexpected bugs</li>
          <li>Objects and arrays can use const (you can modify contents, just not reassign)</li>
        </ul>
      </div>

      {/* Exercise for students - Students ke liye exercise */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4"> {/* exercise box */}
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
