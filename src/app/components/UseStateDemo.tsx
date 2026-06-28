import { useState } from 'react';

// useState = store data React watches. When it changes, React re-renders.
// Syntax: const [value, setValue] = useState(initialValue)

export function UseStateDemo() {
  // ====== State ======
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState({ firstName: '', lastName: '', age: 0 });
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  // Exercise 1 & 4: edit todos
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editTxt, setEditTxt] = useState('');

  // Exercise 2: color
  const [color, setColor] = useState('#ffffff');

  // Exercise 3: calculator
  const [n1, setN1] = useState('');
  const [n2, setN2] = useState('');
  const [res, setRes] = useState<number | null>(null);

  // ====== Functions ======
  const addItem = () => {
    if (newItem.trim()) { setItems(prev => [...prev, newItem]); setNewItem(''); }
  };
  const removeItem = (i: number) => setItems(prev => prev.filter((_, idx) => idx !== i));

  // Exercise 1: remove all
  const clearAll = () => setItems([]);

  // Exercise 4: edit an item
  const edit = (i: number) => { setEditIdx(i); setEditTxt(items[i]); };
  const save = (i: number) => {
    if (editTxt.trim()) {
      setItems(prev => prev.map((item, idx) => (idx === i ? editTxt : item)));
      setEditIdx(null); setEditTxt('');
    }
  };

  // Exercise 3: math
  const calc = (op: string) => {
    const a = parseFloat(n1), b = parseFloat(n2);
    if (isNaN(a) || isNaN(b)) return;
    let r = 0;
    if (op === '+') r = a + b;
    else if (op === '-') r = a - b;
    else if (op === '*') r = a * b;
    else if (op === '/') r = b !== 0 ? a / b : NaN;
    setRes(r);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">useState Demo</h2>

      {/* 1. Counter */}
      <div className="border p-4 rounded-lg"><h3 className="font-semibold mb-3">1. Counter</h3>
        <div className="flex gap-2 items-center">
          <button onClick={() => setCount(prev => prev - 1)} className="px-4 py-2 bg-red-500 text-white rounded">-</button>
          <span className="text-3xl font-bold min-w-[60px] text-center">{count}</span>
          <button onClick={() => setCount(count + 1)} className="px-4 py-2 bg-green-500 text-white rounded">+</button>
          <button onClick={() => setCount(0)} className="px-4 py-2 bg-gray-400 text-white rounded">Reset</button>
        </div>
      </div>

      {/* 2. Text Input */}
      <div className="border p-4 rounded-lg"><h3 className="font-semibold mb-3">2. Text Input</h3>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Type here..." className="w-full px-3 py-2 border rounded" />
        <p className="text-sm mt-1">You wrote: <b>{name || '(nothing)'}</b></p>
      </div>

      {/* 3. Toggle */}
      <div className="border p-4 rounded-lg"><h3 className="font-semibold mb-3">3. Toggle</h3>
        <button onClick={() => setIsVisible(!isVisible)} className="px-4 py-2 bg-purple-500 text-white rounded">{isVisible ? 'Hide' : 'Show'}</button>
        {isVisible && <div className="mt-2 p-3 bg-purple-100 rounded">🎉 Hello!</div>}
      </div>

      {/* 4. Object State */}
      <div className="border p-4 rounded-lg"><h3 className="font-semibold mb-3">4. Object State</h3>
        <div className="flex gap-2">
          <input type="text" value={user.firstName} onChange={e => setUser(prev => ({ ...prev, firstName: e.target.value }))} placeholder="First" className="flex-1 px-3 py-2 border rounded" />
          <input type="text" value={user.lastName} onChange={e => setUser(prev => ({ ...prev, lastName: e.target.value }))} placeholder="Last" className="flex-1 px-3 py-2 border rounded" />
          <input type="number" value={user.age || ''} onChange={e => setUser(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))} placeholder="Age" className="w-20 px-3 py-2 border rounded" />
        </div>
        <pre className="mt-2 text-sm bg-gray-100 p-2 rounded">{JSON.stringify(user, null, 2)}</pre>
      </div>

      {/* ---- EXERCISES 1 & 4 ---- */}
      {/* 5. Todo List with Clear All button + Edit each item */}
      <div className="border p-4 rounded-lg"><h3 className="font-semibold mb-3">5. Todo List (Clear All + Edit)</h3>
        <div className="flex gap-2 mb-2">
          <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addItem()} placeholder="Add item..."
            className="flex-1 px-3 py-2 border rounded" />
          <button onClick={addItem} className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
        </div>

        {items.length === 0 ? <p className="text-gray-400 text-sm">No items</p> : (
          <div className="space-y-1">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                {editIdx === i ? (
                  // Show input when editing
                  <div className="flex-1 flex gap-1">
                    <input type="text" value={editTxt} onChange={e => setEditTxt(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && save(i)} autoFocus
                      className="flex-1 px-2 py-1 border rounded text-sm" />
                    <button onClick={() => save(i)} className="px-2 py-1 bg-green-500 text-white text-sm rounded">Save</button>
                    <button onClick={() => { setEditIdx(null); setEditTxt(''); }} className="px-2 py-1 bg-gray-400 text-white text-sm rounded">X</button>
                  </div>
                ) : (
                  // Normal view with Edit + Remove buttons
                  <><span>{item}</span>
                    <div className="flex gap-1">
                      <button onClick={() => edit(i)} className="px-2 py-1 bg-yellow-500 text-white text-sm rounded">Edit</button>
                      <button onClick={() => removeItem(i)} className="px-2 py-1 bg-red-500 text-white text-sm rounded">Remove</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Exercise 1: Clear all items at once */}
        {items.length > 0 && <button onClick={clearAll} className="mt-2 px-4 py-2 bg-red-700 text-white text-sm rounded">Clear All ({items.length})</button>}
      </div>

      {/* ---- EXERCISE 2 ---- */}
      {/* 6. Color Picker - background changes as you pick */}
      <div className="border p-4 rounded-lg" style={{ backgroundColor: color }}>
        <h3 className="font-semibold mb-3">6. Color Picker</h3>
        <div className="flex items-center gap-3">
          <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-12 h-10 cursor-pointer border rounded" />
          <span className="text-sm font-mono bg-white/70 px-2 py-1 rounded">{color}</span>
        </div>
      </div>

      {/* ---- EXERCISE 3 ---- */}
      {/* 7. Simple Calculator */}
      <div className="border p-4 rounded-lg"><h3 className="font-semibold mb-3">7. Calculator</h3>
        <div className="flex flex-wrap items-end gap-2">
          <input type="number" value={n1} onChange={e => setN1(e.target.value)} placeholder="0" className="w-20 px-3 py-2 border rounded" />
          {['+', '-', '*', '/'].map(s => (
            <button key={s} onClick={() => calc(s)} className="w-9 h-9 rounded font-bold bg-gray-200 hover:bg-gray-300">{s}</button>
          ))}
          <input type="number" value={n2} onChange={e => setN2(e.target.value)} placeholder="0" className="w-20 px-3 py-2 border rounded" />
          <span className="text-2xl font-bold">=</span>
          <span className="text-2xl font-bold text-blue-600 min-w-[50px]">{res !== null ? (isNaN(res) ? 'Error' : res) : '—'}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-green-50 border-l-4 border-green-400 p-3 text-sm">
        <b>✅ Exercises done:</b> ① Clear All (Demo 5) &nbsp; ② Color Picker (Demo 6) &nbsp; ③ Calculator (Demo 7) &nbsp; ④ Edit todos (Demo 5)
      </div>
    </div>
  );
}
