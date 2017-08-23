/**
 * Represents a BINARY expression.
 */
export class Binary {
    constructor(left, op, right) {
        this.left = left;
        this.op = op;
        this.right = right;
    }
}

/**
 * Represents a LITERAL expression.
 */
export class Literal {
    constructor(value) {
        this.value = value;
    }
}

/**
 * Rerpesents a UNARY expression.
 */
export class Unary {
    constructor(op, right) {
        this.op = op;
        this.right = right;
    }
}

export default {
    Binary,
    Literal,
    Unary
};