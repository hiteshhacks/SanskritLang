const KEYWORDS = new Set([
  "likh",
  "sthapan",
  "yadi",
  "anyatha",
  "yavat",
  "karya",
  "wapas",
  "aur",
  "ya",
  "nahi",
]);

const OPERATORS = new Set([
  "+", "-", "*", "/", "%",
  "=", "==", "!=", ">", "<", ">=", "<=",
  "&&", "||", "!",
  "(", ")", "{", "}", ",", ";",
]);

export function highlightSanskritCode(code: string): string {
  let result = "";
  let i = 0;

  while (i < code.length) {
    // Skip whitespace
    if (/\s/.test(code[i])) {
      result += code[i];
      i++;
      continue;
    }

    // Comments
    if (code[i] === "/" && code[i + 1] === "/") {
      let comment = "";
      while (i < code.length && code[i] !== "\n") {
        comment += code[i];
        i++;
      }
      result += `<span class="text-muted-foreground">${escapeHtml(comment)}</span>`;
      continue;
    }

    // Strings
    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i];
      let str = quote;
      i++;
      while (i < code.length && code[i] !== quote) {
        if (code[i] === "\\") {
          str += code[i];
          i++;
          if (i < code.length) {
            str += code[i];
            i++;
          }
        } else {
          str += code[i];
          i++;
        }
      }
      if (i < code.length) {
        str += code[i];
        i++;
      }
      result += `<span class="text-chart-2">${escapeHtml(str)}</span>`;
      continue;
    }

    // Numbers
    if (/\d/.test(code[i])) {
      let num = "";
      while (i < code.length && /[\d.]/.test(code[i])) {
        num += code[i];
        i++;
      }
      result += `<span class="text-chart-3">${escapeHtml(num)}</span>`;
      continue;
    }

    // Identifiers and keywords
    if (/[a-zA-Z_]/.test(code[i])) {
      let word = "";
      while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
        word += code[i];
        i++;
      }
      
      if (KEYWORDS.has(word)) {
        result += `<span class="text-primary font-semibold">${escapeHtml(word)}</span>`;
      } else {
        result += `<span class="text-foreground">${escapeHtml(word)}</span>`;
      }
      continue;
    }

    // Operators
    let foundOp = false;
    for (let len = 2; len >= 1; len--) {
      const op = code.substring(i, i + len);
      if (OPERATORS.has(op)) {
        result += `<span class="text-chart-4">${escapeHtml(op)}</span>`;
        i += len;
        foundOp = true;
        break;
      }
    }

    if (!foundOp) {
      result += escapeHtml(code[i]);
      i++;
    }
  }

  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
