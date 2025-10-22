export enum TokenType {
  // Keywords
  LIKH = "LIKH",
  STHAPAN = "STHAPAN",
  YADI = "YADI",
  ANYATHA = "ANYATHA",
  YAVAT = "YAVAT",
  KARYA = "KARYA",
  WAPAS = "WAPAS", // return

  // Literals
  NUMBER = "NUMBER",
  STRING = "STRING",
  IDENTIFIER = "IDENTIFIER",

  // Operators
  PLUS = "PLUS",
  MINUS = "MINUS",
  MULTIPLY = "MULTIPLY",
  DIVIDE = "DIVIDE",
  MODULO = "MODULO",
  ASSIGN = "ASSIGN",

  // Comparison
  EQUALS = "EQUALS",
  NOT_EQUALS = "NOT_EQUALS",
  GREATER = "GREATER",
  LESS = "LESS",
  GREATER_EQUAL = "GREATER_EQUAL",
  LESS_EQUAL = "LESS_EQUAL",

  // Logical
  AND = "AND",
  OR = "OR",
  NOT = "NOT",

  // Punctuation
  LPAREN = "LPAREN",
  RPAREN = "RPAREN",
  LBRACE = "LBRACE",
  RBRACE = "RBRACE",
  COMMA = "COMMA",
  SEMICOLON = "SEMICOLON",

  // Special
  NEWLINE = "NEWLINE",
  EOF = "EOF",
}

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}

const KEYWORDS: Record<string, TokenType> = {
  likh: TokenType.LIKH,
  sthapan: TokenType.STHAPAN,
  yadi: TokenType.YADI,
  anyatha: TokenType.ANYATHA,
  yavat: TokenType.YAVAT,
  karya: TokenType.KARYA,
  wapas: TokenType.WAPAS,
  aur: TokenType.AND, // and
  ya: TokenType.OR, // or
  nahi: TokenType.NOT, // not
};

export class Tokenizer {
  private code: string;
  private position: number = 0;
  private line: number = 1;
  private column: number = 1;

  constructor(code: string) {
    this.code = code;
  }

  tokenize(): Token[] {
    const tokens: Token[] = [];

    while (this.position < this.code.length) {
      this.skipWhitespace();

      if (this.position >= this.code.length) break;

      // Skip comments (// style)
      if (this.peek() === "/" && this.peek(1) === "/") {
        this.skipComment();
        continue;
      }

      const token = this.nextToken();
      if (token) {
        tokens.push(token);
      }
    }

    tokens.push({
      type: TokenType.EOF,
      value: "",
      line: this.line,
      column: this.column,
    });

    return tokens;
  }

  private nextToken(): Token | null {
    const char = this.peek();
    const startLine = this.line;
    const startColumn = this.column;

    // Strings
    if (char === '"' || char === "'") {
      return this.readString(char);
    }

    // Numbers
    if (this.isDigit(char)) {
      return this.readNumber();
    }

    // Identifiers and keywords
    if (this.isAlpha(char)) {
      return this.readIdentifier();
    }

    // Two-character operators
    if (char === "=" && this.peek(1) === "=") {
      this.advance();
      this.advance();
      return { type: TokenType.EQUALS, value: "==", line: startLine, column: startColumn };
    }

    if (char === "!" && this.peek(1) === "=") {
      this.advance();
      this.advance();
      return { type: TokenType.NOT_EQUALS, value: "!=", line: startLine, column: startColumn };
    }

    if (char === ">" && this.peek(1) === "=") {
      this.advance();
      this.advance();
      return { type: TokenType.GREATER_EQUAL, value: ">=", line: startLine, column: startColumn };
    }

    if (char === "<" && this.peek(1) === "=") {
      this.advance();
      this.advance();
      return { type: TokenType.LESS_EQUAL, value: "<=", line: startLine, column: startColumn };
    }

    if (char === "&" && this.peek(1) === "&") {
      this.advance();
      this.advance();
      return { type: TokenType.AND, value: "&&", line: startLine, column: startColumn };
    }

    if (char === "|" && this.peek(1) === "|") {
      this.advance();
      this.advance();
      return { type: TokenType.OR, value: "||", line: startLine, column: startColumn };
    }

    // Single-character tokens
    const singleChar = this.advance();
    switch (singleChar) {
      case "+": return { type: TokenType.PLUS, value: "+", line: startLine, column: startColumn };
      case "-": return { type: TokenType.MINUS, value: "-", line: startLine, column: startColumn };
      case "*": return { type: TokenType.MULTIPLY, value: "*", line: startLine, column: startColumn };
      case "/": return { type: TokenType.DIVIDE, value: "/", line: startLine, column: startColumn };
      case "%": return { type: TokenType.MODULO, value: "%", line: startLine, column: startColumn };
      case "=": return { type: TokenType.ASSIGN, value: "=", line: startLine, column: startColumn };
      case ">": return { type: TokenType.GREATER, value: ">", line: startLine, column: startColumn };
      case "<": return { type: TokenType.LESS, value: "<", line: startLine, column: startColumn };
      case "!": return { type: TokenType.NOT, value: "!", line: startLine, column: startColumn };
      case "(": return { type: TokenType.LPAREN, value: "(", line: startLine, column: startColumn };
      case ")": return { type: TokenType.RPAREN, value: ")", line: startLine, column: startColumn };
      case "{": return { type: TokenType.LBRACE, value: "{", line: startLine, column: startColumn };
      case "}": return { type: TokenType.RBRACE, value: "}", line: startLine, column: startColumn };
      case ",": return { type: TokenType.COMMA, value: ",", line: startLine, column: startColumn };
      case ";": return { type: TokenType.SEMICOLON, value: ";", line: startLine, column: startColumn };
      case "\n":
        return { type: TokenType.NEWLINE, value: "\n", line: startLine, column: startColumn };
      default:
        throw new Error(`Unexpected character '${singleChar}' at line ${startLine}, column ${startColumn}`);
    }
  }

  private readString(quote: string): Token {
    const startLine = this.line;
    const startColumn = this.column;
    this.advance(); // consume opening quote

    let value = "";
    while (this.peek() !== quote && this.position < this.code.length) {
      if (this.peek() === "\\") {
        this.advance();
        const escaped = this.advance();
        switch (escaped) {
          case "n": value += "\n"; break;
          case "t": value += "\t"; break;
          case "\\": value += "\\"; break;
          case quote: value += quote; break;
          default: value += escaped;
        }
      } else {
        value += this.advance();
      }
    }

    if (this.peek() !== quote) {
      throw new Error(`Unterminated string at line ${startLine}, column ${startColumn}`);
    }

    this.advance(); // consume closing quote
    return { type: TokenType.STRING, value, line: startLine, column: startColumn };
  }

  private readNumber(): Token {
    const startLine = this.line;
    const startColumn = this.column;
    let value = "";

    while (this.isDigit(this.peek()) || this.peek() === ".") {
      value += this.advance();
    }

    return { type: TokenType.NUMBER, value, line: startLine, column: startColumn };
  }

  private readIdentifier(): Token {
    const startLine = this.line;
    const startColumn = this.column;
    let value = "";

    while (this.isAlphaNumeric(this.peek())) {
      value += this.advance();
    }

    const type = KEYWORDS[value] || TokenType.IDENTIFIER;
    return { type, value, line: startLine, column: startColumn };
  }

  private skipWhitespace(): void {
    while (this.position < this.code.length) {
      const char = this.peek();
      if (char === " " || char === "\t" || char === "\r") {
        this.advance();
      } else {
        break;
      }
    }
  }

  private skipComment(): void {
    while (this.peek() !== "\n" && this.position < this.code.length) {
      this.advance();
    }
  }

  private peek(offset: number = 0): string {
    const pos = this.position + offset;
    return pos < this.code.length ? this.code[pos] : "";
  }

  private advance(): string {
    const char = this.code[this.position];
    this.position++;

    if (char === "\n") {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }

    return char;
  }

  private isDigit(char: string): boolean {
    return char >= "0" && char <= "9";
  }

  private isAlpha(char: string): boolean {
    return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z") || char === "_";
  }

  private isAlphaNumeric(char: string): boolean {
    return this.isAlpha(char) || this.isDigit(char);
  }
}
