import BoolInterpreter from "./BoolInterpreter";
import tt from "./BoolTokenTypes";
import { Variable, Binary, Unary, Grouping } from "./BoolExpr";

it("should be able to interprete something", () => {
    const expr = new Variable("a");
    const interpreter = new BoolInterpreter();
    const result = interpreter.interpret(expr, { a: true });

    expect(result).toEqual(true);
});

it("should be able to interprete || expression", () => {
    const expr = new Binary(
        new Variable("a"),
        { type: tt.OR, value: "" },
        new Variable("b"),
    );

    const interpreter = new BoolInterpreter();
    const env = { a: true, b: false }
    const result = interpreter.interpret(expr, env);

    expect(result).toEqual(true);
});

it("should be able to interprete && expression", () => {
    const expr = new Binary(
        new Variable("a"),
        { type: tt.AND, value: "" },
        new Variable("b"),
    );

    const interpreter = new BoolInterpreter();
    const env = { a: true, b: false }
    const result = interpreter.interpret(expr, env);

    expect(result).toEqual(false);
});

it("should be able to interprete ! expression", () => {
    const expr = new Unary(
        { type: tt.NOT, value: "" },
        new Variable("a"),
    );

    const interpreter = new BoolInterpreter();
    const env = { a: true }
    const result = interpreter.interpret(expr, env);

    expect(result).toEqual(false);
});