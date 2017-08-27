import BoolParser from './BoolParser';
import tt from "./BoolTokenTypes";
import { Binary, Unary, Literal } from "./BoolExpr";

it("can parse empty tokens", () => {
    const parser = new BoolParser([{ type: tt.EOF, value: null }]);
    const ast = parser.parse();

    expect(ast).toEqual(undefined);
});

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

it("can parse a simple && expression", () => {
    const tokens = [
        { type: tt.IDENTIFIER, value: "a" },
        { type: tt.AND, value: "" },
        { type: tt.IDENTIFIER, value: "b" },
        { type: tt.EOF, value: null }
    ];

    const parser = new BoolParser(tokens);
    const ast = parser.parse();

    expect(ast).toEqual(
        new Binary(
            new Literal("a"),
            { type: tt.AND, value: "" },
            new Literal("b"),
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

    const parser = new BoolParser(tokens);
    const ast = parser.parse();

    expect(ast).toEqual(
        new Binary(
            new Literal("a"),
            { type: tt.AND, value: "" },
            new Binary(
                new Literal("b"),
                { type: tt.OR, value: "" },
                new Literal("c")
            ),
        )
    );
});

// TODO: Implement grouping in Boolparser
xit("can parse a simple () expression", () => {
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

    const parser = new BoolParser(tokens);
    const ast = parser.parse();

    expect(ast).toEqual(
        new Binary(
            new Literal("a"),
            { type: tt.AND, value: "" },
            // TODO
            // new Binary(
            //     new Literal("b"),
            //     { type: tt.OR, value: "" },
            //     new Literal("c")
            // ),
        )
    );
});