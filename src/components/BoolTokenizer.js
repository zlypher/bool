/**
 * Tokenizes the given expression.
 * 
 * https://github.com/thejameskyle/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js
 * 
 * Tokens consist of a type and a value:
 * 
 * {
 *  type: "TYPE",
 *  value: "VAL"
 * }
 * 
 * Possible types are
 *  - var: A variable (a, b, x, y, z)
 *  - op: An operator (&&, ||)
 * 
 * @param {string} expression The expression to tokenize.
 */
export const tokenize = (expression) => {
    let current = 0;
    let tokens = [];

    while (current < expression.length) {
        let char = expression[current];

        // whitespace...
        if (/\s/.test(char)) {
            current++;
            continue;
        }

        // Variables (only single letter)
        let LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
            let value = char;

            // while (LETTERS.test(char)) {
            //     value += char;
            //     char = expression[++current];
            // }

            tokens.push({
                type: "var",
                value: value
            });

            current++;
            continue;
        }

        // && OPERATOR
        if (char === "&" && expression[++current] === "&") {
            tokens.push({
                type: "op",
                value: "&&",
            });

            current++;
            continue;
        }

        // || OPERATOR
        if (char === "|" && expression[++current] === "|") {
            tokens.push({
                type: "op",
                value: "||",
            });

            current++;
            continue;
        }

        throw new TypeError("I dont know what this character is: " + char);
    }

    return tokens;
};