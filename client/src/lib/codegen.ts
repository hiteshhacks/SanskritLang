import { ASTNode, ASTNodeType } from "./parser";

export class CodeGenerator {
  generate(ast: ASTNode): string {
    return this.generateNode(ast);
  }

  private generateNode(node: ASTNode): string {
    switch (node.type) {
      case ASTNodeType.PROGRAM:
        return node.body.map((stmt: ASTNode) => this.generateNode(stmt)).join("\n");

      case ASTNodeType.PRINT:
        return `console.log(${this.generateNode(node.value)});`;

      case ASTNodeType.VARIABLE_DECLARATION:
        return `let ${node.name} = ${this.generateNode(node.value)};`;

      case ASTNodeType.ASSIGNMENT:
        return `${node.name} = ${this.generateNode(node.value)};`;

      case ASTNodeType.IF_STATEMENT:
        const thenBranch = this.generateNode(node.thenBranch);
        const elseBranch = node.elseBranch ? ` else ${this.generateNode(node.elseBranch)}` : "";
        return `if (${this.generateNode(node.condition)}) ${thenBranch}${elseBranch}`;

      case ASTNodeType.WHILE_LOOP:
        return `while (${this.generateNode(node.condition)}) ${this.generateNode(node.body)}`;

      case ASTNodeType.FUNCTION_DECLARATION:
        const params = node.params.join(", ");
        return `function ${node.name}(${params}) ${this.generateNode(node.body)}`;

      case ASTNodeType.RETURN_STATEMENT:
        return node.value ? `return ${this.generateNode(node.value)};` : "return;";

      case ASTNodeType.FUNCTION_CALL:
        const args = node.arguments.map((arg: ASTNode) => this.generateNode(arg)).join(", ");
        return `${this.generateNode(node.callee)}(${args})`;

      case ASTNodeType.BINARY_EXPRESSION:
        const left = this.generateNode(node.left);
        const right = this.generateNode(node.right);
        let op = node.operator;
        
        // Convert Sanskrit logical operators to JS
        if (op === "aur") op = "&&";
        if (op === "ya") op = "||";
        
        return `(${left} ${op} ${right})`;

      case ASTNodeType.UNARY_EXPRESSION:
        let unaryOp = node.operator;
        if (unaryOp === "nahi") unaryOp = "!";
        return `${unaryOp}${this.generateNode(node.operand)}`;

      case ASTNodeType.NUMBER:
        return String(node.value);

      case ASTNodeType.STRING:
        return `"${node.value.replace(/"/g, '\\"')}"`;

      case ASTNodeType.IDENTIFIER:
        return node.name;

      case ASTNodeType.BLOCK:
        const statements = node.statements
          .map((stmt: ASTNode) => this.generateNode(stmt))
          .join("\n");
        return `{\n${statements}\n}`;

      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }
}
