import tt from "./BoolTokenTypes";
import { Binary, Unary, Literal } from "./BoolExpr";

/**
 * 
 * ----------------------------------------------------------------------------
 * "a"
 * "(a)"
 * "!a"
 * "(!a)"
 * "a && b"
 * "!a && b"
 * "a && (b || !c)"
 * ----------------------------------------------------------------------------
 * 
 * 
 * ----------------------------------------------------------------------------
 * // expression   >   logic ;
 * // logic        >   ...
 * // and          >   or ( "&&" or )* ;
 * expression   >   or ;
 * or           >   unary ( "||" unary )* ;
 * unary        >   "!" unary ;
 *              |   primary ;
 * primary      >   STRING | "(" + expression + ")" ;
 * ----------------------------------------------------------------------------
 * 
 * 
 * http://www.craftinginterpreters.com/parsing-expressions.html
 * 
 */

/**
 * BoolParser is able to parse a list of tokens and create an AST.
 */
export default class BoolParser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
    }

    parse() {
        try {
            return this.expression();
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    debug(fn) {
        // console.dir(`Call ${fn}`);
    }

    // --
    expression() {
        this.debug("expression");
        return this.or();
    }

    or() {
        this.debug("or");
        let expr = this.unary();

        // ....
        while (this.match([ tt.OR ])) {
            let op = this.previous();
            let right = this.unary();
            return new Binary(expr, op, right);
        }

        return expr;
    }

    unary() {
        this.debug("unary");
        if (this.match([ tt.NOT ])) {
            let op = this.previous();
            let right = this.unary();
            return new Unary(op, right);
        }

        return this.primary();
    }

    primary() {
        this.debug("primary");
        if (this.match([ tt.IDENTIFIER ])) {
            return new Literal(this.previous().value);
        }
    }

    /**
     * Helper functions
     */
    match(tokenTypes) {
        this.debug("match");
        for (let i = 0; i < tokenTypes.length; ++i) {
            if (this.check(tokenTypes[i])) {
                this.advance();
                return true;
            }
        }

        return false;
    }

    previous() {
        this.debug("previous");
        return this.tokens[this.current - 1];
    }

    check(tokenType) {
        this.debug("check");
        if (this.isAtEnd()) {
            return false;
        }

        return this.peek().type === tokenType;
    }

    advance() {
        this.debug("advance");
        if (!this.isAtEnd()) {
            this.current += 1;
        }

        return this.previous();
    }

    isAtEnd() {
        this.debug("isAtEnd");
        // return this.current >= this.tokens.length;
        return this.peek().type === tt.EOF;
    }

    peek() {
        this.debug("peek");
        return this.tokens[this.current];
    }
}