import { tokenize } from './BoolTokenizer';

it("can tokenize a simple expression", () => {
    let expression = "a";
    let tokens = tokenize(expression);

    expect(tokens).toEqual([
        { type: "var", value: "a" }
    ]);
});

it("can tokenize a && expression", () => {
    let expression = "a && b";
    let tokens = tokenize(expression);

    expect(tokens).toEqual([
        { type: "var", value: "a" },
        { type: "op", value: "&&" },
        { type: "var", value: "b" }
    ]);
});
