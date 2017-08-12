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
 * 
 * 
 * ----------------------------------------------------------------------------
 * expression   ->  literal
 *              |   unary
 *              |   binary
 *              |   grouping;
 * 
 * literal      ->  STRING;
 * grouping     ->  "(" expression ")";
 * unary        ->  ( "!" ) expression;
 * binary       ->  expression operator expression;
 * operator     ->  "&&" | "||";
 * ----------------------------------------------------------------------------
 * 
 * 
 * 
 * ----------------------------------------------------------------------------
 * expression   >   logic ;
 * logic        >   ...
 * and          >   or ( "&&" or )* ;
 * or           >   unary ( "||" unary )* ;
 * unary        >   "!" unary ;
 *              |   primary ;
 * primary      >   STRING | "(" + expression + ")" ;
 * ----------------------------------------------------------------------------
 * 
 * 
 * 
 * 
 * http://www.craftinginterpreters.com/parsing-expressions.html
 * 
 */

/**
 * ...
 * @param {*} tokens 
 */
export const parse = (tokens) => {
    return [];
};

function expression() {
    return logic();
}

function logic() {
    return undefined;
}

function and() {
    return undefined;
}

function or() {
    return undefined;
}

function unary() {
    return undefined;
}

function primary() {
    return undefined;
}

// ----------------------------------------------------------------------------

function match(tokenTypes) {
    return false;
}

function check(tokenType) {
    return false;
}

function isAtEnd() {
    return false;
}

function peek() {
    return undefined;
}

function previous() {
    return undefined;
}