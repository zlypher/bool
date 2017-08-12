import { parse } from './BoolParser';

it("can parse a token list", () => {
    let tokens = [];
    let ast = parse(tokens);

    expect(ast).toEqual([]);
});
