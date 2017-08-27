import BoolTokenizer from "./BoolTokenizer";
import tt from "./BoolTokenTypes";

it("can tokenize an empty expression", () => {
    const tokenizer = new BoolTokenizer();
    const tokens = tokenizer.tokenize("");

    expect(tokens).toEqual([
        { type: tt.EOF, value: "" }
    ]);
});

it("can tokenize a simple expression", () => {
    const tokenizer = new BoolTokenizer();
    const tokens = tokenizer.tokenize("a");

    expect(tokens).toEqual([
        { type: tt.IDENTIFIER, value: "a" },
        { type: tt.EOF, value: "" }
    ]);
});

it("can tokenize a && expression", () => {
    const tokenizer = new BoolTokenizer();
    const tokens = tokenizer.tokenize("a && b");

    expect(tokens).toEqual([
        { type: tt.IDENTIFIER, value: "a" },
        { type: tt.AND, value: "" },
        { type: tt.IDENTIFIER, value: "b" },
        { type: tt.EOF, value: "" }
    ]);
});

it("can tokenize a || expression", () => {
    const tokenizer = new BoolTokenizer();
    const tokens = tokenizer.tokenize("a || b");

    expect(tokens).toEqual([
        { type: tt.IDENTIFIER, value: "a" },
        { type: tt.OR, value: "" },
        { type: tt.IDENTIFIER, value: "b" },
        { type: tt.EOF, value: "" }
    ]);
});

it("can tokenize a ! expression", () => {
    const tokenizer = new BoolTokenizer();
    const tokens = tokenizer.tokenize("!a");

    expect(tokens).toEqual([
        { type: tt.NOT, value: "" },
        { type: tt.IDENTIFIER, value: "a" },
        { type: tt.EOF, value: "" }
    ]);
});

it("can tokenize a () expression", () => {
    const tokenizer = new BoolTokenizer();
    const tokens = tokenizer.tokenize("a && (b || c)");

    expect(tokens).toEqual([
        { type: tt.IDENTIFIER, value: "a" },
        { type: tt.AND, value: "" },
        { type: tt.LEFT_PAREN, value: "" },
        { type: tt.IDENTIFIER, value: "b" },
        { type: tt.OR, value: "" },
        { type: tt.IDENTIFIER, value: "c" },
        { type: tt.RIGHT_PAREN, value: "" },
        { type: tt.EOF, value: "" }
    ]);
});