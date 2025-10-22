export interface ExampleProgram {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const examplePrograms: ExampleProgram[] = [
  {
    id: "hello-world",
    title: "Hello World",
    description: "Your first SanskritLang program",
    code: 'likh "Namaste Jagat"',
  },
  {
    id: "variables",
    title: "Variables & Arithmetic",
    description: "Working with variables and math",
    code: `// Variable declaration and arithmetic
sthapan x = 10
sthapan y = 20
sthapan sum = x + y

likh "x = "
likh x
likh "y = "
likh y
likh "Sum = "
likh sum`,
  },
  {
    id: "conditionals",
    title: "If-Else Statements",
    description: "Conditional logic with yadi and anyatha",
    code: `sthapan age = 25

yadi (age >= 18) {
  likh "You are an adult"
}
anyatha {
  likh "You are a minor"
}`,
  },
  {
    id: "loops",
    title: "While Loops",
    description: "Iterate with yavat (while)",
    code: `sthapan i = 1

likh "Counting to 5:"
yavat (i <= 5) {
  likh i
  i = i + 1
}`,
  },
  {
    id: "functions",
    title: "Functions",
    description: "Define and call functions with karya",
    code: `karya greet(name) {
  likh "Namaste, "
  likh name
}

karya add(a, b) {
  wapas a + b
}

greet("Sanskrit Coder")
sthapan result = add(10, 20)
likh "Result: "
likh result`,
  },
  {
    id: "fibonacci",
    title: "Fibonacci Sequence",
    description: "Generate Fibonacci numbers",
    code: `sthapan a = 0
sthapan b = 1
sthapan count = 0

likh "Fibonacci sequence:"
likh a
likh b

yavat (count < 8) {
  sthapan next = a + b
  likh next
  a = b
  b = next
  count = count + 1
}`,
  },
  {
    id: "factorial",
    title: "Factorial Calculator",
    description: "Calculate factorial using recursion",
    code: `karya factorial(n) {
  yadi (n <= 1) {
    wapas 1
  }
  wapas n * factorial(n - 1)
}

sthapan num = 5
sthapan result = factorial(num)
likh "Factorial of 5 = "
likh result`,
  },
  {
    id: "comparison",
    title: "Comparison Operators",
    description: "Using comparison and logical operators",
    code: `sthapan x = 15
sthapan y = 20

yadi (x < y) {
  likh "x is less than y"
}

yadi (x == 15 aur y == 20) {
  likh "Both conditions are true"
}

yadi (x > 100 ya y > 10) {
  likh "At least one condition is true"
}`,
  },
];
