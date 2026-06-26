# 📦 JavaScript Basics — `var`, `let`, and `const`

> A friendly guide for kids who want to learn how to store things in JavaScript!

---

## 🤔 What Are Variables?

Imagine you have **three types of boxes** where you can put stuff:

| Box Type | Can you change what's inside? | Can you swap the whole box? |
|----------|-------------------------------|------------------------------|
| `var` 🟡 | ✅ Yes | ✅ Yes (but don't!) |
| `let` 🟢 | ✅ Yes | ❌ No |
| `const` 🔵 | 🟡 Only for objects/arrays | ❌ No |

---

## 🟡 `var` — The Old Box

`var` is like a **loud kid** in class — everyone can hear it no matter where you are in the room.

```js
if (true) {
  var toy = "Lego";
}
console.log(toy); // "Lego" — Even though we're OUTSIDE the if-block!
```

### ⚠️ Problem
`var` doesn't respect walls (blocks). It can cause **surprise mess-ups**.

> **Kid version**: If you yell "I HAVE A CAT" in your room, your neighbor's house will also hear it. That's `var`.

---

## 🟢 `let` — The Polite Box

`let` is like a **whisper** — only people in the same room can hear you.

```js
if (true) {
  let snack = "Cookie";
  console.log(snack); // "Cookie" ✅
}
console.log(snack); // ❌ ERROR! snack doesn't exist out here!
```

### ✅ You CAN change what's inside:
```js
let score = 0;
score = 10;  // Works! You got more points.
```

### ❌ You CANNOT make a new box with the same name:
```js
let points = 5;
let points = 10; // ❌ NOPE! You already named a box "points"!
```

---

## 🔵 `const` — The Locked Box

`const` is like a **permanent label** on a box. The name is locked forever!

```js
const birthday = "June 23";
birthday = "July 4"; // ❌ ERROR! You said your birthday was June 23!

const birthday = "Dec 25"; // ❌ Also ERROR! Name is taken!
```

### 🎁 BUT there's a trick! (Objects & Arrays)

If the box holds a **toy chest** (an object or array), you can still **rearrange the toys inside**:

```js
const toyChest = { lego: 5, cars: 3 };
toyChest.lego = 10;  // ✅ You added more Legos! Total is 10.
toyChest.dolls = 2;  // ✅ You added new toys!

// But you can't throw away the whole chest:
// toyChest = { blocks: 1 }; // ❌ Can't swap the whole chest!
```

> **Kid version**: You have a lunchbox labeled "My Lunchbox." You can change what's inside (swap sandwich for pizza), but you can't suddenly call it "Your Lunchbox."

---

## 🪜 Hoisting — The Magic Trick

Think of hoisting like raising your hand **before** the teacher calls on you:

- `var` raises its hand but says "I dunno yet" until you give it a value.
- `let` and `const` don't raise their hand at all — if you call on them before they exist, **ERROR!**

```js
console.log(myPet); // undefined (var raised its hand but had no answer)
var myPet = "Dog";

console.log(myHobby); // ❌ ERROR! (let didn't raise its hand!)
let myHobby = "Drawing";
```

---

## 🎯 The Golden Rule

| When to use | Why |
|-------------|-----|
| **`const`** — ALWAYS first choice | Keeps your code safe & predictable |
| **`let`** — When you need to change a value | Like scores, counters, timers |
| **`var`** — NEVER (for new code) | It's old and causes surprises! |

---

## 🎮 Try It Yourself!

The `JavaScriptBasics.tsx` file next to this guide has **three interactive buttons**:

1. **Scope Demo** — See how far `var` and `let` can "shout"
2. **Reassignment Demo** — See which boxes can change their stuff
3. **Hoisting Demo** — See the magic hand-raising trick

Just click the buttons and watch the console output!

---

## 🧸 Remember

```
const = "I promise this won't change"
let   = "I might change this later"  
var   = "I'm old and I don't follow rules"
```

Happy coding! 🚀
