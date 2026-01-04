# 🕉️ SanskritLang IDE

A modern, web-based Integrated Development Environment (IDE) for **SanskritLang** — a custom programming language inspired by Sanskrit, designed to blend cultural heritage with contemporary programming concepts.

---

## 📌 Overview

**SanskritLang IDE** enables users to write and execute code using Sanskrit-inspired keywords directly in the browser. The language transpiles into JavaScript and runs safely on the client side, making it ideal for learning, experimentation, and showcasing how cultural context can coexist with modern software engineering.

The project is inspired by educational and playful languages such as Bhailang, while maintaining a structured compiler-style architecture.

---

## ✨ Key Features

* 🧠 Custom programming language inspired by Sanskrit
* ⚡ In-browser execution via JavaScript transpilation
* 🎨 Real-time syntax highlighting
* 🌓 Light & Dark mode with culturally themed palettes
* 💾 Auto-save using localStorage
* ⌨️ Keyboard shortcuts (Tab indentation, Ctrl + Enter to run)
* 📚 Built-in documentation and example programs
* 🧩 Modular compiler pipeline (Tokenizer → Parser → Code Generator)

---

## 🛠️ Tech Stack

### Frontend

* **React 18 + TypeScript**
* **Vite** (development & build tool)
* **Tailwind CSS** for styling
* **Shadcn UI + Radix UI** for accessible components
* **Wouter** for lightweight routing
* **TanStack Query** for server-state handling

### Backend (Prepared for future use)

* **Node.js + Express (TypeScript, ESM)**
* **Drizzle ORM** with **PostgreSQL (Neon)**
* API namespace reserved under `/api`

> ⚠️ Note: The current application is fully client-side. Backend and database layers are configured but not actively used.

---

## 🧩 Language Architecture

SanskritLang follows a traditional compiler-style architecture:

1. **Tokenizer** – Converts source code into tokens with line & column tracking
2. **Parser** – Builds an Abstract Syntax Tree (AST) using recursive descent parsing
3. **Code Generator** – Transpiles AST into executable JavaScript
4. **Interpreter** – Executes generated code in an isolated scope and captures output

### Example Keyword Mapping

| SanskritLang      | JavaScript      |   |      |
| ----------------- | --------------- | - | ---- |
| `likh`            | `console.log()` |   |      |
| `sthapan`         | `let`           |   |      |
| `yadi / anyatha`  | `if / else`     |   |      |
| `yavat`           | `while`         |   |      |
| `karya`           | `function`      |   |      |
| `wapas`           | `return`        |   |      |
| `aur / ya / nahi` | `&& /           |   | / !` |

---

## 📖 Language Features

* Variables & assignments
* Conditionals (`yadi`, `anyatha`)
* Loops (`yavat`)
* Functions & return values
* Arithmetic, comparison, and logical operators
* Single-line comments (`//`)

---

## 🧪 Built-in Examples

The IDE ships with **8 preloaded example programs**, including:

* Hello World
* Variables & arithmetic
* If-else conditions
* While loops
* Functions
* Fibonacci series
* Factorial calculation
* Comparison & logical operators

---

## 🎨 Design System

* **Typography**:

  * Headers: *Noto Serif Devanagari*
  * UI: *Inter*
  * Code: *JetBrains Mono*

* **Theming**:

  * Light & Dark modes
  * Saffron-inspired cultural palette
  * Persistent theme state via localStorage

* **UI Enhancements**:

  * Hover & active elevation effects
  * Consistent border-radius system
  * Responsive layout across devices

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or later)
* npm or pnpm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📂 Project Structure (Simplified)

```
client/
 ├── src/
 │   ├── lib/          # Tokenizer, parser, codegen, interpreter
 │   ├── components/   # IDE, editor, console, UI components
 │   ├── pages/        # Home, 404
 │   └── styles/
server/
 ├── index.ts
 ├── storage.ts
shared/
 └── schema.ts
```

---

## 📅 Recent Updates (Oct 2025)

* Completed full SanskritLang compiler pipeline
* Added real-time syntax highlighting
* Improved editor UX and keyboard shortcuts
* Implemented example loader & persistent storage
* Polished UI with cultural theming and typography

---

## 🎯 Vision & Future Scope

* User authentication & saved programs
* Shareable code snippets
* Enhanced error diagnostics
* Educational tutorials for beginners
* Extensible plugin system for new keywords

---

## 👤 Author

**Hitesh Parate**
B.Tech – Artificial Intelligence & Machine Learning
Passionate about AI systems, programming languages, and culturally inspired tech

---

## 📜 License

This project is open-source and intended for educational and experimental use.

---

✨ *Let’s code **“Namaste Jagat”** instead of “Hello World”!* 🙏💻
