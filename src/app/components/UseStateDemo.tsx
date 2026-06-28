import { useState } from 'react';
// useState import kar rahe hain React se - yeh state banane ka kaam karta hai

export function UseStateDemo() {
// yeh hamara component function hai jo UI return karega

  // ═══ 1: COUNTER (number) ═══
  const [count, setCount] = useState(0);
  // count = 0 shuru mein, setCount() se value badlegi

  const increment = () => setCount(count + 1);
  // increment function: count mein 1 add karo

  const reset = () => setCount(0);
  // reset function: count ko wapas 0 karo

  // ═══ 2: STUDENT NAME (string) ═══
  const [studentName, setStudentName] = useState('');
  // studentName string state - shuru mein khali '', jab user type karega tab bharega

  // ═══ 3: BULB ON/OFF (boolean) ═══
  const [isBulbOn, setIsBulbOn] = useState(false);
  // isBulbOn boolean - false=band, true=jal raha. setter se toggle hoga

  // ═══ 4: BOOK (object) ═══
  const [book, setBook] = useState({ title: '', author: '', price: 0 });
  // book object hai jisme 3 fields hain: title, author, price

  const updateBook = (field: string, value: string | number) => {
    // updateBook function: book ki ek field badalta hai
    setBook(prev => ({ ...prev, [field]: value }));
    // spread operator se purani values rakho, sirf ek field ki value badlo
  };

  // ═══ 5: GROCERY LIST (array) ═══
  const [items, setItems] = useState<string[]>([]);
  // items array - shuru mein khali [], items store karega

  const [newItem, setNewItem] = useState('');
  // newItem string - input field ki value store karega

  const addItem = () => {
    // addItem: naya item array mein dalta hai
    if (newItem.trim() === '') return;
    // agar input khali hai to kuch mat karo
    setItems(prev => [...prev, newItem]);
    // purane array mein naya item jodo, naya array banao
    setNewItem('');
    // input field khali karo
  };

  const removeItem = (index: number) => {
    // removeItem: kisi specific item ko array se hatata hai
    setItems(prev => prev.filter((_, i) => i !== index));
    // filter: sirf wohi items rakho jinka index match na kare
  };

  const clearAll = () => setItems([]);
  // clearAll: saare items hata do, khali array set karo

  // ═══ 6: EDIT ITEM ═══
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // editIndex: kaunsa item edit ho raha hai (null=koi edit nahi)

  const [editText, setEditText] = useState('');
  // editText: edit input mein jo text likha hai

  const startEdit = (index: number) => {
    // startEdit: edit mode shuru karo
    setEditIndex(index);
    // batao kaunsa index edit ho raha
    setEditText(items[index]);
    // us item ki current value edit input mein daalo
  };

  const saveEdit = (index: number) => {
    // saveEdit: edit ki hui value save karo
    if (editText.trim() === '') return;
    // agar edit text khali hai to kuch mat karo
    setItems(prev => prev.map((item, i) => (i === index ? editText : item)));
    // map: jis index par edit kiya wahan naya text do, baqi purana rakho
    setEditIndex(null);
    // edit mode band karo
    setEditText('');
    // edit text khali karo
  };

  const cancelEdit = () => {
    // cancelEdit: edit cancel karo, kuch save mat karo
    setEditIndex(null);
    setEditText('');
    // sirf edit mode band karo
  };

  // ═══ 7: COLOR PICKER ═══
  const [color, setColor] = useState('#f0f0f0');
  // color string state - hex code store karta hai, shuru mein light gray

  const colorList = ['#ffcccc', '#ccffcc', '#cce5ff', '#fff0cc', '#e0ccff', '#ffccf0', '#ffffff', '#cccccc'];
  // colorList: pehle se tayyar 8 rangon ki array

  // ═══ 8: CALCULATOR (multiple useState) ═══
  const [screen, setScreen] = useState('0');
  // screen: calculator display par dikhne wala number - string mein rakha (concat ke liye)

  const [memory, setMemory] = useState<number | null>(null);
  // memory: pehla number yaad rakhne ke liye, null=abhi koi number nahi

  const [operation, setOperation] = useState<string | null>(null);
  // operation: kaunsa operator (+ - * /) select hai, null=koi select nahi

  const [shouldClear, setShouldClear] = useState(false);
  // shouldClear: agli digit dabaen to screen saaf karni hai ya nahi

  const handleDigit = (d: string) => {
    // handleDigit: koi digit (0-9) dabane par chalta hai
    if (shouldClear || screen === '0') {
      // agar naya number shuru karna hai to purane ki jagah naya digit daalo
      setScreen(d);
      setShouldClear(false);
    } else {
      setScreen(p => p + d);
      // warna purani value ke aage digit jodo
    }
  };

  const handleDecimal = () => {
    // handleDecimal: decimal point (.) dabane par
    if (shouldClear) { setScreen('0.'); setShouldClear(false); return; }
    // agar naya number hai to '0.' se shuru karo
    if (!screen.includes('.')) setScreen(p => p + '.');
    // agar pehle se decimal nahi hai to add karo
  };

  const calculate = (a: number, b: number, op: string): number => {
    // calculate: do numbers par operation karta hai
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
    if (op === '/') return b !== 0 ? a / b : NaN;
    // 0 se divide to NaN (not a number) return karo
    return b;
  };

  const handleOperation = (op: string) => {
    // handleOperation: + - * / dabane par chalta hai
    const current = parseFloat(screen);
    // screen ki string ko number mein badlo
    if (memory === null) {
      setMemory(current);
      // koi memory nahi to current number memory mein daalo
    } else if (!shouldClear) {
      const result = calculate(memory, current, operation!);
      // memory mein number + current number par operation karo
      setMemory(result);
      setScreen(String(result));
      // result screen par dikhao aur memory mein bhi rakho
    }
    setOperation(op);
    // naya operation yaad karo
    setShouldClear(true);
    // agli digit se naya number shuru karo
  };

  const handleEquals = () => {
    // handleEquals: = dabane par final result dikhao
    if (memory === null || operation === null) return;
    // agar memory ya operation nahi hai to kuch mat karo
    const result = calculate(memory, parseFloat(screen), operation);
    // memory + current number par operation karo
    setScreen(String(result));
    // result screen par dikhao
    setMemory(null);
    setOperation(null);
    // memory aur operation reset karo
    setShouldClear(true);
  };

  const clear = () => {
    // clear: C button - sab kuch reset karo
    setScreen('0'); setMemory(null); setOperation(null); setShouldClear(false);
  };

  const backspace = () => {
    // backspace: ⌫ - aakhri digit hatao
    if (shouldClear) return;
    // agar naya number shuru hona hai to kuch mat karo
    setScreen(p => p.length > 1 ? p.slice(0, -1) : '0');
    // ek digit kam karo, agar sirf 1 digit hai to '0' karo
  };

  return (
    // return: JSX jo browser mein UI banayega
    <div className="space-y-6">
    {/* container div, har demo ke beech gap */}

      {/* ─── HEADING ─── */}
      <div>
        <h2 className="text-2xl font-bold mb-2">useState Hook</h2>
        {/* heading: useState Hook */}
        <p className="text-gray-600 mb-4">
          useState — A React hook that creates state. When state changes, the UI re-renders!
        </p>
        {/* description: state badli to UI dubara banta hai */}
      </div>

      {/* ═══ 1: COUNTER ═══ */}
      <div className="border rounded-lg p-4">
        {/* demo 1 ka container */}
        <h3 className="font-semibold mb-3">☕ 1. Counter (number)</h3>
        {/* heading: number state ka example */}
        <div className="flex items-center gap-4">
          {/* buttons aur count ka flex container */}
          <button onClick={increment}
            className="px-5 py-3 bg-amber-600 text-white text-xl rounded-xl hover:bg-amber-700">+</button>
          {/* + button: click karne par increment function chale ga */}
          <div className="text-5xl font-bold min-w-[80px] text-center">{count}</div>
          {/* {count}: yahan count ki value show hogi */}
          <button onClick={reset}
            className="px-5 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600">🔄 Reset</button>
          {/* Reset button: count ko 0 kar dega */}
        </div>
        <p className="text-sm text-gray-500 mt-2">💡 Count: {count}</p>
        {/* current count display */}
      </div>

      {/* ═══ 2: STUDENT NAME ═══ */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">✏️ 2. Student Name (string)</h3>
        {/* heading: string state ka example */}
        <input type="text" value={studentName}
          onChange={e => setStudentName(e.target.value)}
          // onChange: har keystroke par studentName update hota hai
          placeholder="Enter your name..."
          className="w-full px-4 py-3 border-2 rounded-xl text-lg" />
          {/* input field: value state se aati hai, onChange state update karta hai */}
        <p className="text-sm text-gray-500 mt-2">
          💡 You wrote: <strong>{studentName || 'nothing yet'}</strong>
        </p>
        {/* agar studentName khali hai to 'nothing yet' dikhao */}
        <p className="text-sm text-gray-500">Total characters: {studentName.length}</p>
        {/* .length: string mein kitne characters hain */}
      </div>

      {/* ═══ 3: BULB ON/OFF ═══ */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">💡 3. Bulb On/Off (boolean)</h3>
        {/* heading: boolean state ka example */}
        <div className="flex items-center gap-4">
          <div className="text-5xl">{isBulbOn ? '💡' : '🔌'}</div>
          {/* ternary: true → 💡 (on), false → 🔌 (off) */}
          <button onClick={() => setIsBulbOn(!isBulbOn)}
            className={`px-6 py-3 rounded-xl text-white text-lg font-bold ${isBulbOn ? 'bg-yellow-500' : 'bg-gray-600'}`}>
            {isBulbOn ? '🚫 Turn Off' : '🔛 Turn On'}
          </button>
          {/* button: click par isBulbOn ki value toggle hogi (true↔false) */}
        </div>
        {isBulbOn && (
          // &&: agar isBulbOn true hai TABHI yeh dikhao - conditional rendering
          <div className="mt-3 p-4 bg-yellow-100 rounded-xl text-lg">
            ✨ The bulb is on! There is light!
          </div>
        )}
      </div>

      {/* ═══ 4: BOOK (object) ═══ */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">📖 4. Book (object)</h3>
        {/* heading: object state ka example */}
        <div className="grid gap-3">
          {/* 3 input fields ka grid */}
          <input type="text" value={book.title}
            onChange={e => updateBook('title', e.target.value)}
            placeholder="Book title" className="px-4 py-3 border-2 rounded-xl" />
          {/* title field: updateBook('title', value) se badle ga */}
          <input type="text" value={book.author}
            onChange={e => updateBook('author', e.target.value)}
            placeholder="Author" className="px-4 py-3 border-2 rounded-xl" />
          {/* author field */}
          <input type="number" value={book.price || ''}
            onChange={e => updateBook('price', parseInt(e.target.value) || 0)}
            placeholder="Price" className="px-4 py-3 border-2 rounded-xl" />
          {/* price field: parseInt se string ko number mein badlo */}
        </div>
        <div className="mt-3 p-4 bg-gray-100 rounded-xl">
          <strong>📚 Book object:</strong>
          <pre className="text-sm mt-1">{JSON.stringify(book, null, 2)}</pre>
          {/* JSON.stringify: object ko string mein dikhata hai */}
        </div>
      </div>

      {/* ═══ 5: GROCERY LIST (array) ═══ */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">🛒 5. Grocery List (array)</h3>
        {/* heading: array state ka example */}
        <div className="flex gap-2 mb-3">
          <input type="text" value={newItem}
            onChange={e => setNewItem(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addItem()}
            // onKeyDown: agar Enter dabaya to addItem() call hoga
            placeholder="What to buy? e.g. milk, bread, eggs..."
            className="flex-1 px-4 py-3 border-2 rounded-xl" />
          <button onClick={addItem}
            className="px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold">➕ Add</button>
          {/* Add button: click par addItem() chale ga */}
          {items.length > 0 && (
            <button onClick={clearAll}
              className="px-5 py-3 bg-red-700 text-white rounded-xl hover:bg-red-800 font-bold">🗑️ Clear All</button>
          )}
          {/* Clear All: sirf tab dikhe jab items.length > 0 ho */}
        </div>
        <div className="space-y-2">
          {items.length === 0 ? (
            // ternary: agar items khali hai to "Nothing here" dikhao
            <p className="text-gray-400 text-lg py-4 text-center">🛍️ Nothing here yet. Add some items!</p>
          ) : (
            // warna items ki list dikhao
            items.map((item, i) => (
            // .map(): har item par loop - ek div har item ke liye
              <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border">
                {editIndex === i ? (
                // agar yeh item edit mode mein hai to edit UI dikhao
                  <div className="flex items-center gap-2 flex-1">
                    <input type="text" value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') saveEdit(i); if (e.key === 'Escape') cancelEdit(); }}
                      // Enter: save, Escape: cancel
                      className="flex-1 px-3 py-2 border-2 rounded-lg text-lg" autoFocus />
                    <button onClick={() => saveEdit(i)}
                      className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">✅ Save</button>
                    <button onClick={cancelEdit}
                      className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">❌ Cancel</button>
                  </div>
                ) : (
                  // warna normal item dikhao
                  <>
                    <span className="text-lg">🛍️ {item}</span>
                    {/* item ka naam dikhao */}
                    <div className="flex gap-1">
                      <button onClick={() => startEdit(i)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm">✏️ Edit</button>
                      {/* Edit button: edit mode shuru karega */}
                      <button onClick={() => removeItem(i)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">❌ Remove</button>
                      {/* Remove button: item ko array se hata dega */}
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">💡 Total items: {items.length}</p>
        {/* items ki total count dikhao */}
      </div>

      {/* ═══ 6: COLOR PICKER ═══ */}
      <div className="border rounded-lg p-4" style={{ backgroundColor: color }}>
      {/* style={{ backgroundColor: color }}: color state se background badle ga */}
        <h3 className="font-semibold mb-3">🎨 6. Color Picker (string)</h3>
        {/* heading: color state ka example */}
        <div className="flex flex-wrap gap-2 mb-3">
          {colorList.map(c => (
            // colorList array par loop, har color ka button
            <button key={c} onClick={() => setColor(c)}
              className={`w-10 h-10 rounded-full border-2 ${color === c ? 'border-gray-900 scale-125' : 'border-gray-300'}`}
              // agar yeh color select hai to border dark aur scale bara
              style={{ backgroundColor: c }} title={c} />
              // button ka background wohi color
          ))}
        </div>
        <div className="flex items-center gap-3">
          <input type="color" value={color}
            onChange={e => setColor(e.target.value)}
            className="w-12 h-12 p-0.5 border-2 rounded-xl cursor-pointer" />
            {/* type="color": native HTML color picker */}
          <span className="text-sm font-mono bg-white/70 px-3 py-1 rounded-lg">{color}</span>
          {/* current color ka hex code dikhao */}
          <button onClick={() => setColor('#f0f0f0')}
            className="ml-auto px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">🔄 Reset</button>
          {/* Reset button: color wapas default (#f0f0f0) karo */}
        </div>
        <p className="text-sm text-gray-600 mt-2">💡 Click a preset color or use the color picker!</p>
      </div>

      {/* ═══ 7: CALCULATOR ═══ */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">🧮 7. Calculator (multiple useState)</h3>
        {/* heading: multiple useState ka example */}
        <div className="max-w-xs mx-auto">
          <div className="bg-gray-900 text-white text-right text-3xl font-mono p-5 rounded-t-2xl mb-0.5 overflow-x-auto">
            {screen}
            {/* {screen}: calculator display par current number */}
          </div>
          <div className="grid grid-cols-4 gap-0.5">
          {/* 4 columns ka grid - buttons ka layout */}

            <button onClick={clear} className="col-span-2 p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xl font-bold">C</button>
            {/* C button: sab reset karo, do columns ki jagah lega */}
            <button onClick={backspace} className="p-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-xl">⌫</button>
            {/* ⌫ button: backspace - aakhri digit hatao */}
            <button onClick={() => handleOperation('/')}
              className={`p-4 rounded-lg text-xl font-bold ${operation === '/' ? 'bg-orange-400' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>÷</button>
            {/* ÷ button: division operation. select hai to light orange */}

            <button onClick={() => handleDigit('7')} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-xl">7</button>
            <button onClick={() => handleDigit('8')} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-xl">8</button>
            <button onClick={() => handleDigit('9')} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-xl">9</button>
            <button onClick={() => handleOperation('*')}
              className={`p-4 rounded-lg text-xl font-bold ${operation === '*' ? 'bg-orange-400' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>×</button>
            {/* × button: multiplication */}

            <button onClick={() => handleDigit('4')} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-xl">4</button>
            <button onClick={() => handleDigit('5')} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-xl">5</button>
            <button onClick={() => handleDigit('6')} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-xl">6</button>
            <button onClick={() => handleOperation('-')}
              className={`p-4 rounded-lg text-xl font-bold ${operation === '-' ? 'bg-orange-400' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>−</button>
            {/* − button: subtraction */}

            <button onClick={() => handleDigit('1')} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-xl">1</button>
            <button onClick={() => handleDigit('2')} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-xl">2</button>
            <button onClick={() => handleDigit('3')} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-xl">3</button>
            <button onClick={() => handleOperation('+')}
              className={`p-4 rounded-lg text-xl font-bold ${operation === '+' ? 'bg-orange-400' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>+</button>
            {/* + button: addition */}

            <button onClick={() => handleDigit('0')} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-xl">0</button>
            <button onClick={handleDecimal} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-xl">.</button>
            <button onClick={handleEquals} className="col-span-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xl font-bold">=</button>
            {/* = button: result dikhao, do columns ki jagah */}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">💡 Uses multiple useState: screen, memory, operation, clear flag</p>
      </div>

      {/* ─── IMPORTANT RULES ─── */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
        <h3 className="font-bold mb-2">⚠️ Important Rules</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Never mutate state directly</strong> — always use the setter function</li>
          {/* state ko kabhi seedha change mat karo - hamesha setter use karo */}
          <li><strong>State updates are not immediate</strong> — React batches them</li>
          {/* state update fauran nahi hota - React batata hai jab ho jaye */}
          <li><strong>Use functional updates</strong> — when new value depends on previous state</li>
          {/* functional update use karo jab nayi value purani par depend kare */}
          <li><strong>Use spread operator for objects/arrays</strong> — create a new reference</li>
          {/* objects/arrays ke liye spread operator use karo, naya reference do */}
          <li><strong>State change = UI re-render</strong> — this is how React works</li>
          {/* state badle to UI dubara banta hai - React ka kaam karne ka tareeqa */}
        </ul>
      </div>

      {/* ─── EXERCISES ─── */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
        <h3 className="font-bold mb-2">🎯 Exercises</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Add a "decrease" button to the counter</li>
          {/* counter mein ghatne ka button lagao */}
          <li>Add your favorite colors to the color picker</li>
          {/* color picker mein apne pasandeeda rang dalo */}
          <li>Add a % (percent) button to the calculator</li>
          {/* calculator mein % ka button jodo */}
          <li>Add quantity numbers (1, 2, 3) next to each grocery item</li>
          {/* har grocery item ke saath quantity (1,2,3) ka number dalo */}
        </ol>
      </div>
    </div>
  );
  // component ka return khatam
}
