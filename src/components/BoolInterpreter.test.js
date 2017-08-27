import BoolInterpreter from "./BoolInterpreter";
import tt from "./BoolTokenTypes";
import { Literal, Binary } from "./BoolExpr";

it("should be able to interprete something", () => {
    const expr = new Literal("a");
    const interpreter = new BoolInterpreter();
    const result = interpreter.interpret(expr);

    expect(result).toEqual("a");
});

// it("should be able to interprete something more", () => {
//     const expr = new Binary(
//         new Literal("a"),
//         { type: tt.OR, value: "" },
//         new Literal("b"),
//     );

//     const interpreter = new BoolInterpreter();
//     const result = interpreter.interpret(expr);

//     expect(result).toEqual("a");
// });