import BoolTokenizer from "../logic/BoolTokenizer";
import BoolParser from "../logic/BoolParser";
import BoolInterpreter from "../logic/BoolInterpreter";

it("should combine tokenizer, parser and interpreter successfully", () => {
    const tokenizer = new BoolTokenizer();
    const parser = new BoolParser();
    const interpreter = new BoolInterpreter();

    const env = { a: false, b: true, c: true };
    const expression = "a || (b && c)";
    const result = interpreter.interpret(
        parser.parse(tokenizer.tokenize(expression)),
        env
    );

    expect(result).toEqual(true);
});
