import { Token, TokenType, Tokenizer } from "./tokenizer";

export enum ASTNodeType {
  PROGRAM = "PROGRAM",
  PRINT = "PRINT",
  VARIABLE_DECLARATION = "VARIABLE_DECLARATION",
  ASSIGNMENT = "ASSIGNMENT",
  IF_STATEMENT = "IF_STATEMENT",
  WHILE_LOOP = "WHILE_LOOP",
  FUNCTION_DECLARATION = "FUNCTION_DECLARATION",
  RETURN_STATEMENT = "RETURN_STATEMENT",
  FUNCTION_CALL = "FUNCTION_CALL",
  BINARY_EXPRESSION = "BINARY_EXPRESSION",
  UNARY_EXPRESSION = "UNARY_EXPRESSION",
  NUMBER = "NUMBER",
  STRING = "STRING",
  IDENTIFIER = "IDENTIFIER",
  BLOCK = "BLOCK",
}

export interface ASTNode {
  type: ASTNodeType;
  [key: string]: any;
}

export class Parser {
  private tokens: Token[];
  private position: number = 0;

  constructor(code: string) {
    const tokenizer = new Tokenizer(code);
    this.tokens = tokenizer.tokenize().filter(
      (t) => t.type !== TokenType.NEWLINE
    );
  }

  parse(): ASTNode {
    const statements: ASTNode[] = [];

    while (!this.isAtEnd()) {
      const stmt = this.statement();
      if (stmt) statements.push(stmt);
    }

    return {
      type: ASTNodeType.PROGRAM,
      body: statements,
    };
  }

  private statement(): ASTNode | null {
    if (this.match(TokenType.LIKH)) {
      return this.printStatement();
    }

    if (this.match(TokenType.STHAPAN)) {
      return this.variableDeclaration();
    }

    if (this.match(TokenType.YADI)) {
      return this.ifStatement();
    }

    if (this.match(TokenType.YAVAT)) {
      return this.whileLoop();
    }

    if (this.match(TokenType.KARYA)) {
      return this.functionDeclaration();
    }

    if (this.match(TokenType.WAPAS)) {
      return this.returnStatement();
    }

    // Expression statement or assignment
    const expr = this.expression();

    // Check for assignment
    if (this.match(TokenType.ASSIGN)) {
      if (expr.type !== ASTNodeType.IDENTIFIER) {
        throw this.error("Invalid assignment target");
      }
      const value = this.expression();
      this.consumeOptional(TokenType.SEMICOLON);
      return {
        type: ASTNodeType.ASSIGNMENT,
        name: expr.name,
        value,
      };
    }

    this.consumeOptional(TokenType.SEMICOLON);
    return expr;
  }

  private printStatement(): ASTNode {
    const value = this.expression();
    this.consumeOptional(TokenType.SEMICOLON);
    return {
      type: ASTNodeType.PRINT,
      value,
    };
  }

  private variableDeclaration(): ASTNode {
    const name = this.consume(TokenType.IDENTIFIER, "Expected variable name").value;
    this.consume(TokenType.ASSIGN, "Expected '=' after variable name");
    const value = this.expression();
    this.consumeOptional(TokenType.SEMICOLON);

    return {
      type: ASTNodeType.VARIABLE_DECLARATION,
      name,
      value,
    };
  }

  private ifStatement(): ASTNode {
    this.consume(TokenType.LPAREN, "Expected '(' after 'yadi'");
    const condition = this.expression();
    this.consume(TokenType.RPAREN, "Expected ')' after condition");

    const thenBranch = this.block();
    let elseBranch = null;

    if (this.match(TokenType.ANYATHA)) {
      elseBranch = this.block();
    }

    return {
      type: ASTNodeType.IF_STATEMENT,
      condition,
      thenBranch,
      elseBranch,
    };
  }

  private whileLoop(): ASTNode {
    this.consume(TokenType.LPAREN, "Expected '(' after 'yavat'");
    const condition = this.expression();
    this.consume(TokenType.RPAREN, "Expected ')' after condition");

    const body = this.block();

    return {
      type: ASTNodeType.WHILE_LOOP,
      condition,
      body,
    };
  }

  private functionDeclaration(): ASTNode {
    const name = this.consume(TokenType.IDENTIFIER, "Expected function name").value;
    this.consume(TokenType.LPAREN, "Expected '(' after function name");

    const params: string[] = [];
    if (!this.check(TokenType.RPAREN)) {
      do {
        params.push(this.consume(TokenType.IDENTIFIER, "Expected parameter name").value);
      } while (this.match(TokenType.COMMA));
    }

    this.consume(TokenType.RPAREN, "Expected ')' after parameters");
    const body = this.block();

    return {
      type: ASTNodeType.FUNCTION_DECLARATION,
      name,
      params,
      body,
    };
  }

  private returnStatement(): ASTNode {
    const value = this.check(TokenType.SEMICOLON) || this.check(TokenType.RBRACE)
      ? null
      : this.expression();
    this.consumeOptional(TokenType.SEMICOLON);

    return {
      type: ASTNodeType.RETURN_STATEMENT,
      value,
    };
  }

  private block(): ASTNode {
    this.consume(TokenType.LBRACE, "Expected '{'");
    const statements: ASTNode[] = [];

    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      const stmt = this.statement();
      if (stmt) statements.push(stmt);
    }

    this.consume(TokenType.RBRACE, "Expected '}'");

    return {
      type: ASTNodeType.BLOCK,
      statements,
    };
  }

  private expression(): ASTNode {
    return this.logicalOr();
  }

  private logicalOr(): ASTNode {
    let expr = this.logicalAnd();

    while (this.match(TokenType.OR)) {
      const operator = this.previous().value;
      const right = this.logicalAnd();
      expr = {
        type: ASTNodeType.BINARY_EXPRESSION,
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  private logicalAnd(): ASTNode {
    let expr = this.equality();

    while (this.match(TokenType.AND)) {
      const operator = this.previous().value;
      const right = this.equality();
      expr = {
        type: ASTNodeType.BINARY_EXPRESSION,
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  private equality(): ASTNode {
    let expr = this.comparison();

    while (this.match(TokenType.EQUALS, TokenType.NOT_EQUALS)) {
      const operator = this.previous().value;
      const right = this.comparison();
      expr = {
        type: ASTNodeType.BINARY_EXPRESSION,
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  private comparison(): ASTNode {
    let expr = this.term();

    while (
      this.match(
        TokenType.GREATER,
        TokenType.GREATER_EQUAL,
        TokenType.LESS,
        TokenType.LESS_EQUAL
      )
    ) {
      const operator = this.previous().value;
      const right = this.term();
      expr = {
        type: ASTNodeType.BINARY_EXPRESSION,
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  private term(): ASTNode {
    let expr = this.factor();

    while (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const operator = this.previous().value;
      const right = this.factor();
      expr = {
        type: ASTNodeType.BINARY_EXPRESSION,
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  private factor(): ASTNode {
    let expr = this.unary();

    while (this.match(TokenType.MULTIPLY, TokenType.DIVIDE, TokenType.MODULO)) {
      const operator = this.previous().value;
      const right = this.unary();
      expr = {
        type: ASTNodeType.BINARY_EXPRESSION,
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  private unary(): ASTNode {
    if (this.match(TokenType.NOT, TokenType.MINUS)) {
      const operator = this.previous().value;
      const right = this.unary();
      return {
        type: ASTNodeType.UNARY_EXPRESSION,
        operator,
        operand: right,
      };
    }

    return this.call();
  }

  private call(): ASTNode {
    let expr = this.primary();

    while (this.match(TokenType.LPAREN)) {
      const args: ASTNode[] = [];

      if (!this.check(TokenType.RPAREN)) {
        do {
          args.push(this.expression());
        } while (this.match(TokenType.COMMA));
      }

      this.consume(TokenType.RPAREN, "Expected ')' after arguments");

      expr = {
        type: ASTNodeType.FUNCTION_CALL,
        callee: expr,
        arguments: args,
      };
    }

    return expr;
  }

  private primary(): ASTNode {
    if (this.match(TokenType.NUMBER)) {
      return {
        type: ASTNodeType.NUMBER,
        value: parseFloat(this.previous().value),
      };
    }

    if (this.match(TokenType.STRING)) {
      return {
        type: ASTNodeType.STRING,
        value: this.previous().value,
      };
    }

    if (this.match(TokenType.IDENTIFIER)) {
      return {
        type: ASTNodeType.IDENTIFIER,
        name: this.previous().value,
      };
    }

    if (this.match(TokenType.LPAREN)) {
      const expr = this.expression();
      this.consume(TokenType.RPAREN, "Expected ')' after expression");
      return expr;
    }

    throw this.error("Expected expression");
  }

  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.position++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.position];
  }

  private previous(): Token {
    return this.tokens[this.position - 1];
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    throw this.error(message);
  }

  private consumeOptional(type: TokenType): boolean {
    if (this.check(type)) {
      this.advance();
      return true;
    }
    return false;
  }

  private error(message: string): Error {
    const token = this.peek();
    return new Error(`${message} at line ${token.line}, column ${token.column}`);
  }
}
