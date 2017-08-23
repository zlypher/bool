/**
 * Extracts the bit pattern from the given number.
 * 
 * Example:
 *  number=13 (0000 1101), bits=4 => [ 1, 1, 0, 1 ]
 *  number=2 (0000 0010), bits=2 => [ 1, 0 ]
 * 
 * @param {int} number The number to get the pattern from
 * @param {int} bits The number of bits to extract
 */
const bitPattern = (number = 0, bits = 1) => {
    const bitPattern = [];

    for (let j = bits - 1; j >= 0; --j) {
        bitPattern.push((number >> j) & 1);
    }

    return bitPattern;
};

/**
 * Generates an array of arrays of values for the given variable count.
 * @see Utility.test.js for examples
 * @param {int} variableCount The number of variables to generate the arguments for
 */
export const generateArguments = (variableCount = 0) => {
    if (!variableCount || variableCount <= 0) {
        return [];
    }

    let args = [];
    const numLines = Math.pow(2, variableCount);
    for (let i = 0; i < numLines; ++i) {
        args.push(bitPattern(i, variableCount));
    }

    return args;
};

export const isAlpha = (c) => {
    return /[a-zA-Z_]/.test(c);
};

export const isDigit = (c) => {
    return /[0-9]/.test(c);
}

export const isAlphaNumeric = (c) => {
    return isAlpha(c) || isDigit(c);
}

export default {
    generateArguments,
    isAlpha,
    isDigit,
    isAlphaNumeric
};
