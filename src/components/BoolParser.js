import tt from "./BoolTokenTypes";
import { Binary, Unary, Variable, Grouping } from "./BoolExpr";

/**
 * ----------------------------------------------------------------------------
 * expression   >   and ;
 * and          >   or ( "&&" or )* ;
 * or           >   unary ( "||" unary )* ;
 * unary        >   "!" unary ;
 *              |   primary ;
 * primary      >   STRING | "(" + expression + ")" ;
 * ----------------------------------------------------------------------------
 * 
 * http://www.craftinginterpreters.com/parsing-expressions.html
 * 
 */

/**
 * BoolParser is able to parse a list of tokens and create an AST.
 */
export default class BoolParser {
    parse(tokens) {
        this.tokens = tokens;
        this.current = 0;

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
    
    /**
     * Grammar functions
     * ------------------------------------------------------------------------
     */

    // --
    expression() {
        this.debug("expression");
        return this.and();
    }

    and() {
        this.debug("and");
        let expr = this.or();

        while (this.match([ tt.AND ])) {
            let op = this.previous();
            let right = this.or();
            return new Binary(expr, op, right);
        }

        return expr;
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
            return new Variable(this.previous().value);
        }

        if (this.match([ tt.LEFT_PAREN ])) {
            let expr = this.expression();
            this.consume(tt.RIGHT_PAREN, "Expect ')' after expression.");
            return new Grouping(expr);
        }
    }

    /**
     * Helper functions
     * ------------------------------------------------------------------------
     */

    /**
     * ...
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

    /**
     * Returns the previous element.
     */
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

    /**
     * Checks if we are already at the end of the tokens.
     */
    isAtEnd() {
        this.debug("isAtEnd");
        return this.peek().type === tt.EOF;
    }

    /**
     * Returns the current element.
     */
    peek() {
        this.debug("peek");
        return this.tokens[this.current];
    }

    consume(tokenType, errorMessage) {
        if (this.check(tokenType)) {
            return this.advance();
        }

        throw errorMessage;
    }
}