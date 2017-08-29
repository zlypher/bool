import tt from "./BoolTokenTypes";

export default class BoolInterpreter {
    constructor() {

    }

    interpret(expr) {
        return this.evaluate(expr);
    }

    evaluate(expr) {
        return expr.visit(this);
    }
    
    visitLiteralExpr(expr) {
        // TODO
        return expr.value;
    }

    visitBinaryExpr(expr) {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);

        switch (expr.op.type) {
            case tt.OR:
                return "OR";
            case tt.AND:
                return "AND";
        }

        return null;
    }

    visitUnaryExpr(expr) {
        // TODO
        return false;
    }

    visitGroupingExpr(expr) {
        // TODO
        return false;
    }
}