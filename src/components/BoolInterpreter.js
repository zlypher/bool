import tt from "./BoolTokenTypes";

export default class BoolInterpreter {
    interpret(expr, environment = {}) {
        this.environment = environment;
        return this.evaluate(expr);
    }

    /**
     * Evaluates the given expression.
     * @param {object} expr The expression to evaluate.
     */
    evaluate(expr) {
        return expr.visit(this);
    }
    
    /**
     * Executes the given VARIABLE expression. Returns the corresponding
     * variable value from the environment.
     * @param {Variable} expr The VARIABLE expression to execute.
     */
    visitVariableExpr(expr) {
        return this.environment[expr.value];
    }

    visitBinaryExpr(expr) {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);

        switch (expr.op.type) {
            case tt.OR:
                return left || right;
            case tt.AND:
                return left && right;
        }

        return null;
    }

    visitUnaryExpr(expr) {
        switch (expr.op) {
            case tt.NOT:
                return !expr.value;
            default:
                return expr.value;
        }
    }

    /**
     * Executes the given GROUPIGN expression. Evaluates the grouped expresion
     * completely and returns the result.
     * @param {Grouping} expr The GROUPING expression to execute.
     */
    visitGroupingExpr(expr) {
        return this.evaluate(expr.expr);
    }
}