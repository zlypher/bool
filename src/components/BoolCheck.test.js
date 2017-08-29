import BoolTokenizer from "./BoolTokenizer";
import BoolParser from "./BoolParser";
import BoolInterpreter from "./BoolInterpreter";

it("should combine tokenizer, parser and interpreter successfully", () => {
    const tokenizer = new BoolTokenizer();
    const parser = new BoolParser();
    const interpreter = new BoolInterpreter();

    const env = { a: false, b: true, c: true };
    const expression = "a || (b && c)";
    const result = interpreter.interpret(
        parser.parse(
            tokenizer.tokenize(expression)
        ),
        env
    );

    expect(result).toEqual(true);
})