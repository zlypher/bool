import BoolInterpreter from "./BoolInterpreter";
import tt from "./BoolTokenTypes";
import { Variable, Binary } from "./BoolExpr";

it("should be able to interprete something", () => {
    const expr = new Variable("a");
    const interpreter = new BoolInterpreter();
    const result = interpreter.interpret(expr);

    expect(result).toEqual("a");
});

// it("should be able to interprete something more", () => {
//     const expr = new Binary(
//         new Variable("a"),
//         { type: tt.OR, value: "" },
//         new Variable("b"),
//     );

//     const interpreter = new BoolInterpreter();
//     const result = interpreter.interpret(expr);

//     expect(result).toEqual("a");
// });