/**
 * Represents a BINARY expression.
 */
export class Binary {
    constructor(left, op, right) {
        this.left = left;
        this.op = op;
        this.right = right;
    }

    visit(interpreter) {
        return interpreter.visitBinaryExpr(this);
    }
}

/**
 * Represents a LITERAL expression.
 */
export class Literal {
    constructor(value) {
        this.value = value;
    }
    
    visit(interpreter) {
        return interpreter.visitLiteralExpr(this);
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
    
    visit(interpreter) {
        return interpreter.visitUnaryExpr(this);
    }
}

/**
 * Represents a GROUPING expression.
 */
export class Grouping {
    constructor(expr) {
        this.expr = expr;
    }

    visit(interpreter) {
        return interpreter.visitGroupingExpr(this);
    }
}

export default {
    Binary,
    Literal,
    Unary
};