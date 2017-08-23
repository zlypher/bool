import tt from "./BoolTokenTypes";
import { isAlpha, isAlphaNumeric } from "./Utility";

// TODO: RegEx
const whitespace = [ " ", "\r", "\t", "\n" ];

export default class Tokenizer {
    constructor() {
        this.tokens = [];
        this.start = 0;
        this.current = 0;
    }

    tokenize(expression) {
        this.expression = expression;

        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }

        this.addToken(tt.EOF);
        return this.tokens;
    }

    scanToken() {
        const c = this.advance();

        if (c === '!') {
            this.addToken(tt.NOT);
            return;
        } else if (c === '|' && this.match('|')) {
            this.addToken(tt.OR);
            return;
        } else if (c === '&' && this.match('&')) {
            this.addToken(tt.AND);
            return;
        } else if (whitespace.includes(c)) {
            return;
        } else if (isAlpha(c)) {
            this.identifier();
        }
    }

    addToken(type, value = "") {
        this.tokens.push({ type, value });
    }

    isAtEnd() {
        return this.current >= this.expression.length;
    }

    advance() {
        this.current++;
        return this.expression[this.current - 1];
    }

    match(expected) {
        if (this.isAtEnd()) {
            return false;
        }

        if (this.expression[this.current] !== expected) {
            return false;
        }

        this.current++;
        return true;
    }

    peek() {
        if (this.isAtEnd()) {
            return "\0";
        }

        return this.expression[this.current];
    }

    identifier() {
        while (isAlphaNumeric(this.peek())) {
            this.advance();
        }

        const val = this.expression.substring(this.start, this.current);

        this.addToken(tt.IDENTIFIER, val);
    }
}