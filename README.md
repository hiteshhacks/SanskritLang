# SanskritLang IDE

## Overview

SanskritLang is a web-based integrated development environment (IDE) for a custom programming language inspired by Sanskrit. The application provides an interactive code editor where users can write code using Sanskrit-inspired keywords (like `likh` for print, `sthapan` for variable declaration) that transpiles to JavaScript and executes in the browser. The project combines cultural reverence for Sanskrit with modern programming education, offering a playful yet functional coding environment similar to Bhailang.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing, currently implementing a single-page application with the main IDE interface on the home route.

**UI Component Library**: Shadcn UI (New York style) with Radix UI primitives for accessible, composable components. The design system uses TailwindCSS with custom CSS variables for theming.

**State Management**: 
- TanStack Query (React Query) for server state management
- Local React state for UI interactions and code editor content
- LocalStorage for persisting user's code between sessions

**Theming**: Custom theme system supporting light and dark modes with culturally-themed color palettes:
- Light mode: Sacred Saffron, Deep Terracotta, Lotus White, Ink Black
- Dark mode: Warm Saffron Glow, Rich Earth, Deep Charcoal, Soft Cream
- Theme state persisted in localStorage

**Typography**:
- Headers/Branding: Noto Serif Devanagari (loaded via Google Fonts)
- Body/UI: Inter
- Code Editor: JetBrains Mono with ligature support

### Language Implementation

**Tokenizer** (`client/src/lib/tokenizer.ts`): Comprehensive lexical analyzer that breaks SanskritLang source code into tokens. Supports:
- Keywords: likh, sthapan, yadi, anyatha, yavat, karya, wapas, aur, ya, nahi
- Operators: arithmetic (+, -, *, /, %), comparison (==, !=, <, >, <=, >=), logical (&&, ||, !)
- Literals: numbers (integer and decimal), strings (single and double quotes with escape sequences)
- Punctuation: parentheses, braces, comma, semicolon
- Comments: // single-line comments
- Tracks line and column numbers for error reporting

**Parser** (`client/src/lib/parser.ts`): Recursive descent parser that builds an Abstract Syntax Tree (AST) from tokens. Implements:
- Expression parsing with proper operator precedence (unary → call → factor → term → comparison → equality → logical)
- Statement parsing for print, variable declaration, assignment, if/else, while loops, functions, and return
- Block scoping with brace syntax
- Function declarations with parameters and function calls with arguments
- Error handling with detailed syntax error messages including line/column information

**Code Generator** (`client/src/lib/codegen.ts`): AST-to-JavaScript transpiler that converts the parsed AST into executable JavaScript code. Converts:
- `likh` → `console.log()`
- `sthapan` → `let`
- `yadi/anyatha` → `if/else`
- `yavat` → `while`
- `karya` → `function`
- `wapas` → `return`
- Sanskrit logical operators (aur, ya, nahi) → JavaScript (&&, ||, !)

**Interpreter** (`client/src/lib/sanskritLang.ts`): Main execution engine that orchestrates the complete compilation and execution pipeline:
1. Tokenization → Parsing → Code Generation
2. JavaScript execution in isolated scope using `new Function()`
3. Console output capture and aggregation
4. Error handling with Sanskrit-themed error messages (वाक्यविन्यास त्रुटि for syntax errors, त्रुटि for runtime errors)
5. Success confirmation with bilingual messages

**Syntax Highlighting** (`client/src/lib/syntaxHighlight.ts`): Real-time syntax highlighting engine that renders code with color-coded tokens:
- Keywords: Primary color (saffron) with bold weight
- Strings: Chart-2 color (sage green)
- Numbers: Chart-3 color (indigo)
- Operators: Chart-4 color (peacock blue)
- Comments: Muted foreground color
- HTML-escaped output for security

### Backend Architecture

**Server Framework**: Express.js with TypeScript running in ESM mode.

**Development Setup**: Vite middleware integration for HMR (Hot Module Replacement) during development. Production builds serve static assets from the `dist/public` directory.

**API Structure**: Currently minimal - the `/api` route prefix is reserved for future API endpoints. The application is primarily client-side with no active backend routes.

**Storage Interface** (`server/storage.ts`): Defines `IStorage` interface with methods for user management (getUser, getUserByUsername, createUser). Currently implements `MemStorage` for in-memory storage during development.

### Data Storage

**Database ORM**: Drizzle ORM configured for PostgreSQL with Neon serverless driver.

**Schema** (`shared/schema.ts`): Defines a users table with fields for id (UUID), username (unique), and password. Uses Drizzle-Zod for schema validation.

**Migration Strategy**: Drizzle Kit for schema migrations, configured to output to `./migrations` directory.

**Current State**: Database infrastructure is configured but not actively used. User authentication and persistence features are prepared but not implemented in the current application flow.

### Component Architecture

**Page Components**:
- `Home.tsx`: Main landing page composing Header, HeroSection, IDESection, DocumentationSection, ExamplesSection, and Footer
- `not-found.tsx`: 404 error page

**Feature Components**:
- `CodeEditor.tsx`: Advanced code editor component with:
  - Controlled component pattern (receives code and onCodeChange props)
  - Real-time syntax highlighting overlay synchronized with textarea scroll
  - Tab key support (inserts 2 spaces)
  - Ctrl+Enter keyboard shortcut to run code
  - Copy, clear, and run actions
  - Transparent textarea with colored syntax highlighting beneath
- `OutputConsole.tsx`: Console output display component showing:
  - Regular output (console.log results)
  - Error messages (Sanskrit-themed error formatting)
  - Success messages (bilingual confirmation)
  - Scrollable area for long outputs
- `IDESection.tsx`: Main IDE container component managing:
  - Code state with localStorage persistence (key: "sanskritlang_code")
  - SanskritLang interpreter instance
  - Example program loader dropdown
  - Code and output state synchronization
  - Automatic save on every keystroke
- `DocumentationSection.tsx`: Language reference section with documentation cards for each keyword
- `ExamplesSection.tsx`: Example programs showcase with copy-to-clipboard functionality and 8 preset examples
- `HeroSection.tsx`: Landing hero section with generated background image and smooth scroll navigation

**UI Components**: Extensive Shadcn UI component library including buttons, cards, inputs, dialogs, dropdowns, toasts, and more. All components follow the custom theme system.

### Design System

**Color System**: HSL-based color palette using CSS custom properties for dynamic theming. Separate color definitions for light and dark modes with automatic computation of border colors for buttons.

**Elevation System**: CSS classes for hover and active states (`hover-elevate`, `active-elevate-2`) that apply subtle background overlays to create depth.

**Border Radius**: Custom values (9px for large, 6px for medium, 3px for small) for consistent rounded corners.

## External Dependencies

### UI Framework & Components
- **React 18**: Core UI library
- **@radix-ui/***: Primitive components for accessibility (27 packages including accordion, dialog, dropdown, select, etc.)
- **TailwindCSS**: Utility-first CSS framework with PostCSS and Autoprefixer
- **class-variance-authority**: For component variant styling
- **cmdk**: Command palette component

### State Management & Data Fetching
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing library

### Form Handling
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Validation resolvers for react-hook-form
- **zod**: Schema validation

### Database & ORM
- **drizzle-orm**: TypeScript ORM for SQL databases
- **drizzle-zod**: Zod schema generation from Drizzle schemas
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-kit**: Schema migration tool

### Backend Framework
- **express**: Web server framework
- **connect-pg-simple**: PostgreSQL session store (prepared but not used)

### Build Tools
- **vite**: Build tool and dev server
- **@vitejs/plugin-react**: Vite plugin for React
- **esbuild**: JavaScript bundler for production builds
- **typescript**: Type checking
- **tsx**: TypeScript execution for development server

### Utilities
- **date-fns**: Date manipulation library
- **nanoid**: Unique ID generator
- **clsx & tailwind-merge**: Class name utilities
- **embla-carousel-react**: Carousel component

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for Replit
- **@replit/vite-plugin-cartographer**: Source mapping for Replit
- **@replit/vite-plugin-dev-banner**: Development banner

### Fonts
- **Google Fonts**: Noto Serif Devanagari, Inter, JetBrains Mono (loaded via CDN)

### Assets
- Hero background image: AI-generated Sanskrit manuscripts morphing into code (`attached_assets/generated_images/Sanskrit_manuscripts_morphing_into_code_2e7d95ae.png`)

## SanskritLang Language Reference

### Supported Features
- **Variables**: `sthapan name = value`
- **Print**: `likh expression`
- **Conditionals**: `yadi (condition) { ... } anyatha { ... }`
- **Loops**: `yavat (condition) { ... }`
- **Functions**: `karya name(params) { ... wapas value }`
- **Operators**: 
  - Arithmetic: `+`, `-`, `*`, `/`, `%`
  - Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
  - Logical: `aur` (and), `ya` (or), `nahi` (not), `&&`, `||`, `!`
- **Comments**: `// single line comments`

### Example Programs
Eight preset examples included:
1. Hello World - Basic output
2. Variables & Arithmetic - Variable declarations and math
3. If-Else Statements - Conditional logic
4. While Loops - Iteration with yavat
5. Functions - Function declarations and calls
6. Fibonacci Sequence - Generate Fibonacci numbers
7. Factorial Calculator - Recursive factorial calculation
8. Comparison Operators - Using comparison and logical operators

## Recent Changes (October 22, 2025)

### Complete Language Implementation
- Built full compiler pipeline with tokenizer, parser, and code generator
- Implemented comprehensive error handling with Sanskrit-themed error messages
- Added real-time syntax highlighting in code editor
- Implemented localStorage persistence for user code across sessions
- Created 8 example programs users can load and run
- All language features tested and working: variables, conditionals, loops, functions, operators

### Technical Improvements
- Converted CodeEditor to controlled component pattern for proper state management
- Integrated syntax highlighting overlay with synchronized scrolling
- Added keyboard shortcuts (Tab for indentation, Ctrl+Enter to run)
- Implemented example program loader with dropdown selector
- Added comprehensive test coverage with end-to-end playwright tests

### UI/UX Enhancements
- Sanskrit-themed color palette (saffron, terracotta, sage green, indigo)
- Dark and light mode support with theme persistence
- Culturally appropriate Devanagari typography for headers and Sanskrit text
- Smooth scroll navigation between sections
- Responsive layout for desktop, tablet, and mobile devices