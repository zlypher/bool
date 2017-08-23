import BoolParser from './BoolParser';
import tt from "./BoolTokenTypes";
import { Binary, Unary, Literal } from "./BoolExpr";

it("can parse tokens with only a variable", () => {
    const tokens = [
        { type: tt.IDENTIFIER, value: "a" },
        { type: tt.EOF, value: "" }
    ];

    const parser = new BoolParser(tokens);
    const ast = parser.parse();

    expect(ast).toEqual(new Literal("a"));
});


it("can parse a simple || expression", () => {
    const tokens = [
        { type: tt.IDENTIFIER, value: "a" },
        { type: tt.OR, value: "" },
        { type: tt.IDENTIFIER, value: "b" },
        { type: tt.EOF, value: null }
    ];

    const parser = new BoolParser(tokens);
    const ast = parser.parse();

    expect(ast).toEqual(
        new Binary(
            new Literal("a"),
            { type: tt.OR, value: "" },
            new Literal("b"),
        )
    );
});