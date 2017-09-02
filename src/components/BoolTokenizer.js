import tt from "./BoolTokenTypes";
import { isAlpha, isAlphaNumeric } from "./Utility";

// TODO: RegEx
const whitespace = [ " ", "\r", "\t", "\n" ];

/**
 * BoolTokenizer is responsible for parsing expressions
 * and returning a list of tokens.
 */
export default class BoolTokenizer {
    constructor() {
        this.tokens = [];
        this.start = 0;
        this.current = 0;
    }

    /**
     * Tokenizes the given expression and returns a list of tokens.
     * @param {string} expression The expression to tokenize.
     */
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

        if (c === '(') {
            this.addToken(tt.LEFT_PAREN);
            return;
        } else if (c === ')') {
            this.addToken(tt.RIGHT_PAREN);
            return;
        } else if (c === '!') {
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
        } else {
            throw new Error("Invalid character sequence");
        }
    }

    /**
     * Helper functions
     * ------------------------------------------------------------------------
     */

    /**
     * Adds a new token with the given type and value to the token list.
     * @param {BoolTokenType} type The token type.
     * @param {any} value The token value.
     */
    addToken(type, value = "") {
        this.tokens.push({ type, value });
    }

    /**
     * Checks if we are already at the end of the expression.
     */
    isAtEnd() {
        return this.current >= this.expression.length;
    }

    /**
     * Advances the current pointer and returns the element at the
     * previous position.
     */
    advance() {
        this.current++;
        return this.expression[this.current - 1];
    }

    /**
     * Checks if the next element equals the expected character. Only
     * advances the current pointer, if it matches.
     * @param {char} expected The expected character.
     */
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

    /**
     * Returns the next element, if we aren't already at the end of the
     * expression.
     */
    peek() {
        if (this.isAtEnd()) {
            return "\0";
        }

        return this.expression[this.current];
    }

    /**
     * Consumes as many characters as possible for the current identifier
     * name. Adds the token for the identifier at the end.
     */
    identifier() {
        while (isAlphaNumeric(this.peek())) {
            this.advance();
        }

        const val = this.expression.substring(this.start, this.current);
        this.addToken(tt.IDENTIFIER, val);
    }
}