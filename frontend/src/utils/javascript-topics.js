export const javascriptTopics = [

/* ===============================
   BASICS & FUNDAMENTALS
================================ */
{
  id: "js_basics",
  name: "JavaScript Basics",
  subTopics: [
    "What is JavaScript",
    "History of JavaScript",
    "JavaScript vs ECMAScript",
    "How JavaScript runs in browser",
    "JavaScript engines (V8, SpiderMonkey)",
    "Embedding JavaScript in HTML",
    "Script loading (defer, async)",
    "Strict mode ('use strict')"
  ]
},

{
  id: "js_variables",
  name: "Variables & Declarations",
  subTopics: [
    "var",
    "let",
    "const",
    "Variable scope",
    "Hoisting",
    "Temporal Dead Zone (TDZ)",
    "Global vs block scope",
    "Shadowing variables"
  ]
},

{
  id: "js_datatypes",
  name: "Data Types",
  subTopics: [
    "Primitive types",
    "Number",
    "String",
    "Boolean",
    "Undefined",
    "Null",
    "Symbol",
    "BigInt",
    "Reference types",
    "typeof operator",
    "Type coercion",
    "Implicit vs explicit conversion"
  ]
},

/* ===============================
   OPERATORS & CONTROL FLOW
================================ */
{
  id: "js_operators",
  name: "Operators",
  subTopics: [
    "Arithmetic operators",
    "Assignment operators",
    "Comparison operators",
    "Logical operators",
    "Nullish coalescing (??)",
    "Optional chaining (?.)",
    "Bitwise operators",
    "Unary operators",
    "Ternary operator"
  ]
},

{
  id: "js_control_flow",
  name: "Control Flow",
  subTopics: [
    "if / else",
    "switch",
    "for loop",
    "while loop",
    "do while loop",
    "break and continue",
    "labeled statements"
  ]
},

/* ===============================
   FUNCTIONS
================================ */
{
  id: "js_functions",
  name: "Functions",
  subTopics: [
    "Function declaration",
    "Function expression",
    "Arrow functions",
    "Parameters vs arguments",
    "Default parameters",
    "Rest parameters",
    "Return statement",
    "First-class functions",
    "Higher-order functions",
    "Pure vs impure functions",
    "IIFE"
  ]
},

{
  id: "js_scope_closure",
  name: "Scope & Closures",
  subTopics: [
    "Lexical scope",
    "Global scope",
    "Function scope",
    "Block scope",
    "Closures",
    "Practical closure examples",
    "Memory implications of closures"
  ]
},

/* ===============================
   OBJECTS & PROTOTYPES
================================ */
{
  id: "js_objects",
  name: "Objects",
  subTopics: [
    "Object literals",
    "Properties & methods",
    "Computed properties",
    "Property descriptors",
    "Object methods",
    "Object.freeze",
    "Object.seal",
    "Object.assign",
    "Shallow vs deep copy"
  ]
},

{
  id: "js_prototype",
  name: "Prototypes & Inheritance",
  subTopics: [
    "Prototype chain",
    "__proto__",
    "Object.prototype",
    "Constructor functions",
    "Prototype inheritance",
    "ES6 classes",
    "extends & super",
    "Method overriding"
  ]
},

/* ===============================
   ARRAYS & COLLECTIONS
================================ */
{
  id: "js_arrays",
  name: "Arrays",
  subTopics: [
    "Array creation",
    "Array indexing",
    "Array length",
    "push / pop",
    "shift / unshift",
    "map",
    "filter",
    "reduce",
    "forEach",
    "find / findIndex",
    "some / every",
    "flat / flatMap",
    "Array destructuring",
    "Sparse arrays"
  ]
},

{
  id: "js_collections",
  name: "Collections",
  subTopics: [
    "Map",
    "Set",
    "WeakMap",
    "WeakSet",
    "Use cases",
    "Differences between Map and Object"
  ]
},

/* ===============================
   STRINGS & REGEX
================================ */
{
  id: "js_strings",
  name: "Strings",
  subTopics: [
    "String methods",
    "Template literals",
    "Tagged templates",
    "String immutability",
    "Unicode & UTF-16"
  ]
},

{
  id: "js_regex",
  name: "Regular Expressions",
  subTopics: [
    "Regex syntax",
    "Flags",
    "match",
    "replace",
    "test",
    "exec",
    "Lookaheads",
    "Lookbehinds"
  ]
},

/* ===============================
   ASYNC JAVASCRIPT
================================ */
{
  id: "js_async",
  name: "Asynchronous JavaScript",
  subTopics: [
    "Synchronous vs asynchronous",
    "Callbacks",
    "Callback hell",
    "Promises",
    "Promise chaining",
    "Promise.all",
    "Promise.race",
    "Promise.any",
    "async / await",
    "Error handling in async code"
  ]
},

{
  id: "js_event_loop",
  name: "Event Loop & Concurrency",
  subTopics: [
    "Call stack",
    "Web APIs",
    "Callback queue",
    "Microtask queue",
    "Macrotasks",
    "Event loop execution order"
  ]
},

/* ===============================
   ERROR HANDLING
================================ */
{
  id: "js_errors",
  name: "Error Handling",
  subTopics: [
    "try / catch",
    "finally",
    "Throwing errors",
    "Custom errors",
    "Error object",
    "Async error handling"
  ]
},

/* ===============================
   MODULES & TOOLING
================================ */
{
  id: "js_modules",
  name: "Modules",
  subTopics: [
    "ES modules",
    "import / export",
    "Named exports",
    "Default exports",
    "Dynamic imports",
    "Module scope"
  ]
},

/* ===============================
   BROWSER APIs
================================ */
{
  id: "js_dom",
  name: "DOM & Browser APIs",
  subTopics: [
    "DOM tree",
    "Selecting elements",
    "Event listeners",
    "Event delegation",
    "Bubbling & capturing",
    "Forms",
    "LocalStorage",
    "SessionStorage",
    "Cookies"
  ]
},

/* ===============================
   PERFORMANCE & MEMORY
================================ */
{
  id: "js_performance",
  name: "Performance & Memory",
  subTopics: [
    "Garbage collection",
    "Memory leaks",
    "Optimization techniques",
    "Debounce",
    "Throttle",
    "Lazy loading"
  ]
},

/* ===============================
   ADVANCED & INTERNALS
================================ */
{
  id: "js_internals",
  name: "JavaScript Internals",
  subTopics: [
    "Execution context",
    "Call stack internals",
    "Heap",
    "Lexical environment",
    "This keyword",
    "Binding rules",
    "Strict vs non-strict this"
  ]
},

{
  id: "js_security",
  name: "JavaScript Security",
  subTopics: [
    "XSS",
    "CSRF",
    "CORS",
    "Content Security Policy",
    "Sanitization"
  ]
},

/* ===============================
   MODERN & UPCOMING
================================ */
{
  id: "js_modern",
  name: "Modern JavaScript",
  subTopics: [
    "Optional chaining",
    "Nullish coalescing",
    "Top-level await",
    "Temporal API (proposal)",
    "Record & Tuple (proposal)",
    "Pattern matching (proposal)"
  ]
}

];
