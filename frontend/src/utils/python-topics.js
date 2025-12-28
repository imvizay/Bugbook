export const pythonTopics = [

/* ===============================
   BASICS & INTRODUCTION
================================ */
{
  id: "py_basics",
  name: "Python Basics",
  subTopics: [
    "What is Python",
    "History of Python",
    "Python philosophy (Zen of Python)",
    "Python versions",
    "Interpreted vs compiled",
    "How Python code runs",
    "Python implementations (CPython, PyPy)",
    "Installing Python",
    "Running Python scripts",
    "Interactive shell (REPL)"
  ]
},

{
  id: "py_syntax",
  name: "Syntax & Structure",
  subTopics: [
    "Indentation",
    "Comments",
    "Keywords",
    "Identifiers",
    "Code blocks",
    "Pass statement",
    "PEP 8 basics"
  ]
},

/* ===============================
   VARIABLES & DATA TYPES
================================ */
{
  id: "py_variables",
  name: "Variables & Assignment",
  subTopics: [
    "Variable assignment",
    "Dynamic typing",
    "Multiple assignment",
    "Variable naming rules",
    "Mutable vs immutable",
    "Object references",
    "id() and memory reference"
  ]
},

{
  id: "py_datatypes",
  name: "Data Types",
  subTopics: [
    "int",
    "float",
    "complex",
    "bool",
    "str",
    "NoneType",
    "type()",
    "is vs ==",
    "Type conversion"
  ]
},

/* ===============================
   OPERATORS & CONTROL FLOW
================================ */
{
  id: "py_operators",
  name: "Operators",
  subTopics: [
    "Arithmetic operators",
    "Comparison operators",
    "Logical operators",
    "Assignment operators",
    "Bitwise operators",
    "Membership operators",
    "Identity operators"
  ]
},

{
  id: "py_control_flow",
  name: "Control Flow",
  subTopics: [
    "if",
    "if-else",
    "if-elif-else",
    "match-case (Python 3.10+)",
    "for loop",
    "while loop",
    "break",
    "continue",
    "pass"
  ]
},

/* ===============================
   FUNCTIONS
================================ */
{
  id: "py_functions",
  name: "Functions",
  subTopics: [
    "Function definition",
    "Calling functions",
    "Return values",
    "Default arguments",
    "Keyword arguments",
    "Positional arguments",
    "*args",
    "**kwargs",
    "Docstrings",
    "Type hints"
  ]
},

{
  id: "py_scope",
  name: "Scope & Namespaces",
  subTopics: [
    "Local scope",
    "Global scope",
    "Nonlocal keyword",
    "Built-in scope",
    "LEGB rule",
    "Global vs nonlocal"
  ]
},

/* ===============================
   DATA STRUCTURES
================================ */
{
  id: "py_lists",
  name: "Lists",
  subTopics: [
    "List creation",
    "Indexing and slicing",
    "List methods",
    "List comprehensions",
    "Nested lists",
    "Shallow vs deep copy"
  ]
},

{
  id: "py_tuples",
  name: "Tuples",
  subTopics: [
    "Tuple creation",
    "Tuple unpacking",
    "Immutability",
    "Single element tuple"
  ]
},

{
  id: "py_sets",
  name: "Sets",
  subTopics: [
    "Set creation",
    "Set operations",
    "Frozen sets",
    "Use cases of sets"
  ]
},

{
  id: "py_dicts",
  name: "Dictionaries",
  subTopics: [
    "Dictionary creation",
    "Key-value pairs",
    "Dictionary methods",
    "Dictionary comprehensions",
    "Nested dictionaries",
    "Hashing"
  ]
},

/* ===============================
   STRINGS & FILE HANDLING
================================ */
{
  id: "py_strings",
  name: "Strings",
  subTopics: [
    "String methods",
    "String slicing",
    "f-strings",
    "String formatting",
    "Unicode strings"
  ]
},

{
  id: "py_files",
  name: "File Handling",
  subTopics: [
    "Opening files",
    "Reading files",
    "Writing files",
    "File modes",
    "with statement",
    "Binary files"
  ]
},

/* ===============================
   ERROR HANDLING
================================ */
{
  id: "py_errors",
  name: "Error & Exception Handling",
  subTopics: [
    "Syntax errors",
    "Runtime errors",
    "try-except",
    "else block",
    "finally block",
    "Raising exceptions",
    "Custom exceptions"
  ]
},

/* ===============================
   OOP
================================ */
{
  id: "py_oop",
  name: "Object-Oriented Programming",
  subTopics: [
    "Classes",
    "Objects",
    "__init__",
    "Instance variables",
    "Class variables",
    "Methods",
    "self keyword",
    "Encapsulation",
    "Inheritance",
    "Polymorphism",
    "Abstraction"
  ]
},

{
  id: "py_magic",
  name: "Magic & Dunder Methods",
  subTopics: [
    "__str__",
    "__repr__",
    "__len__",
    "__getitem__",
    "__setitem__",
    "__eq__",
    "__add__",
    "__call__"
  ]
},

/* ===============================
   MODULES & PACKAGES
================================ */
{
  id: "py_modules",
  name: "Modules & Packages",
  subTopics: [
    "Importing modules",
    "Built-in modules",
    "__name__ == '__main__'",
    "Creating packages",
    "__init__.py",
    "Virtual environments"
  ]
},

/* ===============================
   ADVANCED PYTHON
================================ */
{
  id: "py_comprehensions",
  name: "Comprehensions",
  subTopics: [
    "List comprehensions",
    "Set comprehensions",
    "Dict comprehensions",
    "Nested comprehensions"
  ]
},

{
  id: "py_generators",
  name: "Generators & Iterators",
  subTopics: [
    "Iterables",
    "Iterators",
    "Generator functions",
    "yield keyword",
    "Generator expressions"
  ]
},

{
  id: "py_decorators",
  name: "Decorators",
  subTopics: [
    "Functions as objects",
    "Creating decorators",
    "Decorators with arguments",
    "Common use cases"
  ]
},

{
  id: "py_context",
  name: "Context Managers",
  subTopics: [
    "with statement",
    "__enter__",
    "__exit__",
    "contextlib"
  ]
},

/* ===============================
   ASYNC & CONCURRENCY
================================ */
{
  id: "py_async",
  name: "Async & Concurrency",
  subTopics: [
    "Threading",
    "Multiprocessing",
    "GIL",
    "asyncio",
    "async / await",
    "Event loop",
    "Concurrency vs parallelism"
  ]
},

/* ===============================
   MEMORY & PERFORMANCE
================================ */
{
  id: "py_memory",
  name: "Memory Management",
  subTopics: [
    "Reference counting",
    "Garbage collection",
    "Memory leaks",
    "Shallow vs deep copy"
  ]
},

/* ===============================
   TESTING & DEBUGGING
================================ */
{
  id: "py_testing",
  name: "Testing & Debugging",
  subTopics: [
    "Debugging techniques",
    "pdb",
    "unittest",
    "pytest",
    "Assertions",
    "Logging"
  ]
},

/* ===============================
   SECURITY & BEST PRACTICES
================================ */
{
  id: "py_security",
  name: "Python Security",
  subTopics: [
    "Virtual environments",
    "Dependency vulnerabilities",
    "Input validation",
    "Secrets handling"
  ]
},

/* ===============================
   PYTHON INTERNALLS
================================ */
{
  id: "py_internals",
  name: "Python Internals",
  subTopics: [
    "CPython internals",
    "Bytecode",
    "Python execution model",
    "Stack vs heap",
    "Interpreter loop"
  ]
}

];
