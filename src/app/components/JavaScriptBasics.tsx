import { useState } from 'react';
// ☝️ React se useState hook import kar rahe hain. Yeh state manage karne ke liye use hota hai.

/**
 * JAVASCRIPT BASICS: VAR, CONST, LET
 * Yeh component JavaScript mein var, const, aur let ke farq ko demonstrate karta hai.
 * React seekhne se pehle yeh samajhna bohot zaroori hai.
 *
 * KEY DIFFERENCES (Asli Farq):
 * - var: Function-scoped hota hai, dobara declare kar sakte hain, update kar sakte hain, hoisted hota hai
 * - let: Block-scoped hota hai, dobara declare nahi kar sakte, update kar sakte hain, hoisted nahi hota
 * - const: Block-scoped hota hai, dobara declare nahi kar sakte, update nahi kar sakte, hoisted nahi hota
 */

export function JavaScriptBasics() {
  // ☝️ Yeh ek React component hai jiska naam JavaScriptBasics hai. Isay export kiya ja raha hai.

  const [output, setOutput] = useState<string[]>([]);
  // ☝️ useState hook — 'output' ek array hai jo strings store karta hai (results).
  // 'setOutput' ek function hai jo 'output' ko update karta hai.
  // Shuru mein yeh empty array [] hai.

  // ----------------------------------------------------------------
  // Demo 1: Scope differences (Scope ke farq)
  // ----------------------------------------------------------------
  const demonstrateScope = () => {
    // ☝️ Yeh ek arrow function hai jo scope ka demonstration karta hai.
    const results: string[] = [];
    // ☝️ Ek temporary array jismein hum results store karenge.

    // VAR - Function scoped (function ke andar kahin bhi accessible)
    if (true) {
      var varVariable = "this is code"
      // ☝️ 'var' se declare kiya. Agar yeh if block ke andar hai, tab bhi bahar accessible hoga.
    }
    results.push(`var outside block: ${varVariable}`);
    // ☝️ varVariable if block ke bahar bhi accessible hai — kyunke var function-scoped hai.

    // LET - Block scoped (sirf us block mein accessible jahan declare kiya)
    if (true) {
      let letVariable = "I'm let - only inside this block";
      // ☝️ 'let' se declare kiya. Yeh sirf is if block ke andar hi accessible hoga.
      results.push(`let inside block: ${letVariable}`);
      // ☝️ Block ke andar access kar rahe hain — yeh kaam karega.
    }
    // Agar hum neeche wali line uncomment karein to error aayega:
    // results.push(`let outside block: ${letVariable}`); // Error!
    // ☝️ Kyunke letVariable sirf if block ke andar exist karta hai.

    setOutput(results);
    // ☝️ results array ko React state mein set kar rahe hain, taki UI update ho.
  };

  // ----------------------------------------------------------------
  // Demo 2: Reassignment (Dobara value dena aur dobara declare karna)
  // ----------------------------------------------------------------
  const demonstrateReassignment = () => {
    const results: string[] = [];

    // VAR - Dobara declare aur update dono kar sakte hain
    var varNum = 1;
    results.push(`var initial: ${varNum}`);
    // ☝️ varNum ki value 1 hai.
    varNum = 2; // Yeh kaam karega (update)
    results.push(`var updated: ${varNum}`);
    // ☝️ ab varNum = 2 ho gaya.
    var varNum = 3; // Dobara declare karna bhi kaam karta hai (lekin recommended nahi!)
    results.push(`var redeclared: ${varNum}`);
    // ☝️ varNum = 3 ho gaya. Same scope mein dobara var use kar sakte hain — yeh confusing ho sakta hai.

    // LET - Update kar sakte hain, lekin dobara declare nahi kar sakte
    let letNum = 5;
    results.push(`let initial: ${letNum}`);
    letNum = 10; // Yeh kaam karega (update)
    results.push(`let updated: ${letNum}`);
    // ☝️ ab letNum = 10 ho gaya.
    // let letNum = 15; // Yeh error dega! let ko dobara declare nahi kar sakte same scope mein.

    // CONST - Na update kar sakte hain, na dobara declare
    const constNum = 10;
    results.push(`const value: ${constNum}`);
    // constNum = 20; // Error! const ki value change nahi kar sakte.
    // const constNum = 30; // Error! const ko dobara declare nahi kar sakte.

    // IMPORTANT: const objects/arrays ke saath
    const person = { name: 'maham', age: 22 };
    // ☝️ const object hai — person variable ko dobara assign nahi kar sakte.
    results.push(`const object initial: ${JSON.stringify(person)}`);
    person.age = 26; // Lekin properties modify kar sakte hain!
    // ☝️ const sirf reassignment rokta hai, properties change allowed hain.
    results.push(`const object modified: ${JSON.stringify(person)}`);
    // person = {}; // Yeh error dega — kyunke const variable ko dobara assign nahi kar sakte.

    setOutput(results);
  };

  // ----------------------------------------------------------------
  // Demo 3: Hoisting (Uthaan — JavaScript ka behavior)
  // ----------------------------------------------------------------
  const demonstrateHoisting = () => {
    const results: string[] = [];

    // VAR hoisted hota hai — matlab declaration top par move ho jati hai
    results.push(`var before declaration: ${typeof varHoisted}`);
    // ☝️ varHoisted abhi declare nahi hua, lekin typeof 'undefined' return karega — error nahi aayega.
    var varHoisted = 'I am hoisted';
    // ☝️ JavaScript is tarah samajhta hai: var varHoisted; (top par) phir varHoisted = 'I am hoisted';
    results.push(`var after declaration: ${varHoisted}`);
    // ☝️ ab value assign ho chuki hai, to 'I am hoisted' print hoga.

    // LET aur CONST hoisted nahi hote (temporal dead zone mein rehte hain)
    // Neeche wali line uncomment karein to ReferenceError aayega:
    // results.push(`let before declaration: ${letNotHoisted}`); // Error!
    let letNotHoisted = 'I am not hoisted';
    // ☝️ let ko declare se pehle access nahi kar sakte — temporal dead zone ki wajah se.
    results.push(`let after declaration: ${letNotHoisted}`);
    // ☝️ declare karne ke baad access kar sakte hain.

    setOutput(results);
  };

  // ----------------------------------------------------------------
  // Demo 4: Loop behavior (var vs let loops mein)
  // ----------------------------------------------------------------
  const demonstrateLoop = () => {
    // ☝️ Yeh function loop mein var aur let ke farq ko dikhayega.
    const results: string[] = [];
    // ☝️ Ek temporary array hai jismein hum output strings store karenge.

    // VAR in loop — ek hi variable har iteration mein reuse hota hai
    const varFuncs: (() => string)[] = [];
    // ☝️ varFuncs naam ka array hai jo functions store karega — har function ek string return karega
    for (var i = 0; i < 3; i++) {
      // ☝️ var i use kiya — i ek hi variable hai, har iteration mein update hota rehta hai
      varFuncs.push(() => `var[${i}]`);
      // ☝️ Har iteration mein ek function push kar rahe hain jo current i capture karta hai
      // Lekin var ki wajah se sab functions same i ko refer karenge
    }
    results.push(`var loop: ${varFuncs[0]()}, ${varFuncs[1]()}, ${varFuncs[2]()}`);
    // ☝️ Sab "var[3]" print hoga kyunke var function-scoped hai — loop khatam hone par i ki final value 3 hai

    // LET in loop — har iteration ka apna naya variable
    const letFuncs: (() => string)[] = [];
    // ☝️ letFuncs array bhi functions store karega
    for (let j = 0; j < 3; j++) {
      // ☝️ let j use kiya — har iteration ka apna naya j variable banega (block-scoped)
      letFuncs.push(() => `let[${j}]`);
      // ☝️ Har iteration mein naya 'j' block scope mein capture hota hai — alag alag values
    }
    results.push(`let loop: ${letFuncs[0]()}, ${letFuncs[1]()}, ${letFuncs[2]()}`);
    // ☝️ "let[0], let[1], let[2]" print hoga — kyunke har iteration ka apna scope tha

    // VAR loop ke baad bhi accessible hai, LET nahi
    results.push(`var i loop ke bahar bhi accessible: ${i}`);
    // ☝️ i = 3 — var function-scoped hai, loop khatam hone ke baad bhi i accessible hai aur uski value 3 hai
    // let j loop ke bahar accessible nahi — error aayega agar access karein

    setOutput(results);
    // ☝️ Saare results React state mein set kar rahe hain, UI automatically update ho jayega
  };

  // ----------------------------------------------------------------
  // Demo 5: const array — add/remove items
  // ----------------------------------------------------------------
  const demonstrateConstArray = () => {
    // ☝️ Yeh function dikhayega ke const array mein items add/remove kaise karte hain
    const results: string[] = [];
    // ☝️ results array hai jo saara output collect karega

    // const array banaya — yeh variable dobara assign nahi ho sakta
    const fruits: string[] = ['🍎 Apple', '🍌 Banana'];
    // ☝️ const se fruits array banaya. Isay hum dobara assign nahi kar sakte (jaise fruits = [...] nahi kar sakte)
    results.push(`Initial array: ${JSON.stringify(fruits)}`);
    // ☝️ Shuruat mein do fruits hain — Apple aur Banana. JSON.stringify se array ko string mein convert kiya

    // ADD — push() se items add karte hain
    fruits.push('🍊 Orange');
    // ☝️ push() method array ke end mein naya item add karta hai. Ab array: [Apple, Banana, Orange]
    results.push(`After push('Orange'): ${JSON.stringify(fruits)}`);
    // ☝️ Array ke end mein Orange add ho gaya

    fruits.push('🍇 Grape', '🍉 Melon');
    // ☝️ push() ek saath multiple items bhi add kar sakta hai
    results.push(`After push(Grape, Melon): ${JSON.stringify(fruits)}`);
    // ☝️ Ek saath do items add kiye — Grape aur Melon

    // REMOVE — pop() se aakhri item remove karte hain
    const last = fruits.pop();
    // ☝️ pop() array ke aakhri item ko hata deta hai aur use return karta hai
    results.push(`pop() returned: ${last}`);
    // ☝️ pop() ne "Melon" return kiya kyunke woh aakhri tha
    results.push(`After pop(): ${JSON.stringify(fruits)}`);
    // ☝️ pop() ke baad array mein Melon nahi raha

    // REMOVE — shift() se pehla item remove karte hain
    const first = fruits.shift();
    // ☝️ shift() array ke pehle item ko hata deta hai aur use return karta hai
    results.push(`shift() returned: ${first}`);
    // ☝️ shift() ne "Apple" return kiya kyunke woh pehla tha
    results.push(`After shift(): ${JSON.stringify(fruits)}`);
    // ☝️ shift() ke baad array mein Apple nahi raha

    // MODIFY by index — index se value change kar sakte hain
    fruits[1] = '🥝 Kiwi';
    // ☝️ Array ke index 1 (doosra item — Banana) ko replace kar ke Kiwi kar diya
    results.push(`After fruits[1] = 'Kiwi': ${JSON.stringify(fruits)}`);
    // ☝️ Index 1 (Banana) ko Kiwi se replace kar diya

    // LENGTH property
    results.push(`Array length: ${fruits.length}`);
    // ☝️ Array ki current length batata hai — kitne items hain array mein

    // --- const array ko dobara assign nahi kar sakte ---
    // Neeche wali line error degi agar uncomment karein:
    // fruits = ['🍓 Strawberry']; // Error! const variable reassign nahi ho sakta
    results.push(`✅ const array modify ho sakta hai, par reassign nahi!`);
    // ☝️ const sirf variable reassignment rokta hai. push, pop, shift, index change — sab allowed hain!

    setOutput(results);
    // ☝️ Saara output React state mein daal rahe hain, UI automatically render hoga
  };

  // ----------------------------------------------------------------
  // Demo 6: Error messages on redeclaration
  // ----------------------------------------------------------------
  const demonstrateErrors = () => {
    // ☝️ Yeh function dikhayega ke redeclare karne par kon si error aati hai
    const results: string[] = [];
    // ☝️ results array jo saari output strings store karega

    // --- VAR redeclare ---
    var x = 1;
    // ☝️ var se x = 1 declare kiya
    var x = 2; // ✅ var ko dobara declare kar sakte hain — koi error nahi
    // ☝️ Dobara var x = 2 — yeh kaam karta hai, koi error nahi aati. x ki value ab 2 hai
    results.push(`✅ var redeclare: ${x} (koi error nahi)`);
    // ☝️ var ke saath redeclaration completely allowed hai — error nahi aati

    // --- LET redeclare (try-catch + eval se error catch karenge) ---
    try {
      // ☝️ try block — agar error aayi to catch mein chali jayegi
      eval('let a = 1; let a = 2;');
      // ☝️ eval() runtime mein code execute karta hai, is liye error catch ho sakti hai
      // Nahi to normally SyntaxError compile-time aati hai aur catch nahi ho sakti
    } catch (e: any) {
      // ☝️ catch block — error yahan aati hai agar try mein koi exception throw hui
      results.push(`❌ let redeclare: ${e.message}`);
      // ☝️ SyntaxError aayegi: "Cannot redeclare block-scoped variable 'a'"
    }

    // --- CONST redeclare ---
    try {
      eval('const b = 1; const b = 2;');
      // ☝️ const b ko dobara declare karne ki koshish
    } catch (e: any) {
      results.push(`❌ const redeclare: ${e.message}`);
      // ☝️ Same error: "Cannot redeclare block-scoped variable 'b'" — let aur const dono same error dete hain
    }

    // --- var ke baad let (same name) ---
    try {
      eval('var c = 1; let c = 2;');
      // ☝️ Pehle var se c declare kiya, phir let se same name c dobara declare karne ki koshish
    } catch (e: any) {
      results.push(`❌ var phir let (same name): ${e.message}`);
      // ☝️ Error aayegi: "Identifier 'c' has already been declared"
    }

    // --- let ke baad const (same name) ---
    try {
      eval('let d = 1; const d = 2;');
      // ☝️ Pehle let se d, phir const se same d dobara
    } catch (e: any) {
      results.push(`❌ let phir const (same name): ${e.message}`);
      // ☝️ Error: identifier already declared
    }

    // --- const ke baad let (same name) ---
    try {
      eval('const e = 1; let e = 2;');
      // ☝️ Pehle const se e, phir let se same e dobara
    } catch (e: any) {
      results.push(`❌ const phir let (same name): ${e.message}`);
      // ☝️ Error: identifier already declared
    }

    results.push(`---`);
    // ☝️ Ek separator line daal di
    results.push(`💡 Rule: var ko chhod kar, let aur const ek baar declare karne ke baad`);
    results.push(`   same scope mein dobara declare nahi kar sakte.`);
    // ☝️ Rule summary: Sirf var redeclare ho sakta hai, let aur const nahi

    setOutput(results);
    // ☝️ Saara output React state mein set kar rahe hain, UI update ho jayega
  };

  // ----------------------------------------------------------------
  // JSX RETURN — Yeh sab UI render karta hai
  // ----------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Yeh main container hai jismein saari cheezein hain. space-y-6 means 6 units ka gap. */}

      <div>
        <h2 className="text-2xl font-bold mb-2">JavaScript Basics: var, const, let</h2>
        {/* ☝️ Heading — bada aur bold text */}
        <p className="text-gray-600 mb-4">
          Click the buttons below to see interactive demonstrations of JavaScript variable declarations.
        </p>
        {/* ☝️ Description — grey color mein likha hai */}
      </div>

      {/* Interactive Demos — teen demo buttons hain */}
      <div className="grid gap-4">
        {/* ☝️ Grid layout jismein buttons hain, har ek card mein */}

        {/* ---------- Demo 1 Card ---------- */}
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
          {/* ☝️ Blue button. Click karne par demonstrateScope function chalega */}
        </div>

        {/* ---------- Demo 2 Card ---------- */}
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
          {/* ☝️ Green button. Click karne par demonstrateReassignment function chalega */}
        </div>

        {/* ---------- Demo 3 Card ---------- */}
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
          {/* ☝️ Purple button. Click karne par demonstrateHoisting function chalega */}
        </div>

        {/* ---------- Demo 4 Card ---------- */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">4. Loop Behavior (var vs let)</h3>
          <p className="text-sm text-gray-600 mb-3">
            var loop ke baad bhi accessible hai, let har iteration ka naya scope banata hai.
          </p>
          <button
            onClick={demonstrateLoop}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Run Loop Demo
          </button>
          {/* ☝️ Orange button. Click karne par demonstrateLoop function chalega */}
        </div>

        {/* ---------- Demo 5 Card ---------- */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">5. const Array — Add/Remove Items</h3>
          <p className="text-sm text-gray-600 mb-3">
            const array mein items add/remove kar sakte hain, par dobara assign nahi.
          </p>
          <button
            onClick={demonstrateConstArray}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Run Array Demo
          </button>
          {/* ☝️ Pink button. Click karne par demonstrateConstArray function chalega */}
        </div>

        {/* ---------- Demo 6 Card ---------- */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">6. Error Messages on Redeclaration</h3>
          <p className="text-sm text-gray-600 mb-3">
            var redeclare allowed hai, let/const par error aati hai.
          </p>
          <button
            onClick={demonstrateErrors}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Run Error Demo
          </button>
          {/* ☝️ Red button. Click karne par demonstrateErrors function chalega */}
        </div>
      </div>

      {/* Output Display — yahan results dikhte hain */}
      {output.length > 0 && (
        // ☝️ Agar output array mein koi item hai tabhi yeh block render hoga
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          {/* ☝️ Dark background, green text — jaise terminal dikhta hai */}
          <div className="font-bold mb-2">Console Output:</div>
          {output.map((line, index) => (
            // ☝️ Har result line ko map kar ke render kar rahe hain
            <div key={index} className="py-1">→ {line}</div>
            // ☝️ Har line ke aage → arrow lagaya hai
          ))}
        </div>
      )}

      {/* Best Practices — achi aadatain */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        {/* ☝️ Yellow background — tip section ki tarah */}
        <h3 className="font-bold mb-2">✨ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Use const by default</strong> - Makes code more predictable</li>
          {/* ☝️ Hamesha const use karo jab tak reassign na karna ho — code predictable rehta hai */}
          <li><strong>Use let when you need to reassign</strong> - Like counters or loops</li>
          {/* ☝️ Agar value change karni hai to let use karo — jaise counters ya loops mein */}
          <li><strong>Avoid var</strong> - It's legacy and can cause unexpected bugs</li>
          {/* ☝️ var se bacho — purana tareeqa hai aur bugs ka sabab ban sakta hai */}
          <li>Objects and arrays can use const (you can modify contents, just not reassign)</li>
          {/* ☝️ Objects/arrays const se banao — andar ki properties change kar sakte hain */}
        </ul>
      </div>

      {/* Exercise for students — mashq */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        {/* ☝️ Blue background — exercise section */}
        <h3 className="font-bold mb-2">🎯 Exercise for You</h3>
        <p className="text-sm mb-2">
          Try modifying the code above to:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Add a demo showing loop behavior with var vs let</li>
          {/* ☝️ Loops mein var aur let ke farq ka demo banayein */}
          <li>Create a const array and demonstrate adding/removing items</li>
          {/* ☝️ const array bana kar items add/remove karke dikhayein */}
          <li>Show the difference in error messages when trying to redeclare variables</li>
          {/* ☝️ Dobara declare karne par aane wale error messages ka farq dikhayein */}
        </ol>
      </div>
    </div>
  );
  // ☝️ Component ka return khatam. Yeh sab UI browser mein render hoga.
}
