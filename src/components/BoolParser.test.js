import BoolParser from './BoolParser';
import tt from "./BoolTokenTypes";
import { Binary, Unary, Variable, Grouping } from "./BoolExpr";

it("can parse empty tokens", () => {
    const parser = new BoolParser();
    const ast = parser.parse([{ type: tt.EOF, value: null }]);

    expect(ast).toEqual(undefined);
});

it("can parse tokens with only a variable", () => {
    const tokens = [
        { type: tt.IDENTIFIER, value: "a" },
        { type: tt.EOF, value: "" }
    ];

    const parser = new BoolParser();
    const ast = parser.parse(tokens);

    expect(ast).toEqual(new Variable("a"));
});

it("can parse a simple || expression", () => {
    const tokens = [
        { type: tt.IDENTIFIER, value: "a" },
        { type: tt.OR, value: "" },
        { type: tt.IDENTIFIER, value: "b" },
        { type: tt.EOF, value: null }
    ];

    const parser = new BoolParser();
    const ast = parser.parse(tokens);

    expect(ast).toEqual(
        new Binary(
            new Variable("a"),
            { type: tt.OR, value: "" },
            new Variable("b"),
        )
    );
});

it("can parse a simple && expression", () => {
    const tokens = [
        { type: tt.IDENTIFIER, value: "a" },
        { type: tt.AND, value: "" },
        { type: tt.IDENTIFIER, value: "b" },
        { type: tt.EOF, value: null }
    ];

    const parser = new BoolParser();
    const ast = parser.parse(tokens);

    expect(ast).toEqual(
        new Binary(
            new Variable("a"),
            { type: tt.AND, value: "" },
            new Variable("b"),
        )
    );
});

it("can parse a || and && expression", () => {
    const tokens = [
        { type: tt.IDENTIFIER, value: "a" },
        { type: tt.AND, value: "" },
        { type: tt.IDENTIFIER, value: "b" },
        { type: tt.OR, value: "" },
        { type: tt.IDENTIFIER, value: "c" },
        { type: tt.EOF, value: null }
    ];

    const parser = new BoolParser();
    const ast = parser.parse(tokens);

    expect(ast).toEqual(
        new Binary(
            new Variable("a"),
            { type: tt.AND, value: "" },
            new Binary(
                new Variable("b"),
                { type: tt.OR, value: "" },
                new Variable("c")
            ),
        )
    );
});

it("can parse a simple () expression", () => {
    const tokens = [
        { type: tt.IDENTIFIER, value: "a" },
        { type: tt.AND, value: "" },
        { type: tt.LEFT_PAREN, value: "" },
        { type: tt.IDENTIFIER, value: "b" },
        { type: tt.OR, value: "" },
        { type: tt.IDENTIFIER, value: "c" },
        { type: tt.RIGHT_PAREN, value: "" },
        { type: tt.EOF, value: "" }
    ];

    const parser = new BoolParser();
    const ast = parser.parse(tokens);

    expect(ast).toEqual(
        new Binary(
            new Variable("a"),
            { type: tt.AND, value: "" },
            new Grouping(
                new Binary(
                    new Variable("b"),
                    { type: tt.OR, value: "" },
                    new Variable("c")
                )
            )
        )
    );
});