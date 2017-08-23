import { generateArguments, isAlpha, isDigit, isAlphaNumeric } from './Utility';

it("exports a method 'generateArguments'", () => {
    expect(generateArguments).toBeDefined();
});

it("can generate arguments with no parameter", () => {
    const result = generateArguments();
    expect(result).toEqual([]);
});

it("can generate arguments with 0 parameter", () => {
    const result = generateArguments(0);
    expect(result).toEqual([]);
});

it("can generate arguments with negative parameter", () => {
    const result = generateArguments(-5);
    expect(result).toEqual([]);
});

it("can generate arguments for parameter: 1", () => {
    const result = generateArguments(1);
    expect(result).toEqual(
        [
            [ 0 ],
            [ 1 ],
        ]
    )
});

it("can generate arguments for parameter: 2", () => {
    const result = generateArguments(2);
    expect(result).toEqual(
        [
            [ 0, 0 ],
            [ 0, 1 ],
            [ 1, 0 ],
            [ 1, 1 ],
        ]
    )
});

it("can generate arguments for parameter: 3", () => {
    const result = generateArguments(3);
    expect(result).toEqual(
        [
            [ 0, 0, 0 ],
            [ 0, 0, 1 ],
            [ 0, 1, 0 ],
            [ 0, 1, 1 ],
            [ 1, 0, 0 ],
            [ 1, 0, 1 ],
            [ 1, 1, 0 ],
            [ 1, 1, 1 ],
        ]
    )
});

it ("can determine alphas", () => {
    const tests = [
        { in: "a", out: true },
        { in: "X", out: true },
        { in: 0, out: false },
        { in: 9, out: false },
        { in: 5, out: false },
    ];

    tests.forEach((test) => {
        expect(isAlpha(test.in)).toEqual(test.out);
    });
})

it ("can determine digits", () => {
    const tests = [
        { in: "a", out: false },
        { in: "X", out: false },
        { in: 0, out: true },
        { in: 9, out: true },
        { in: 5, out: true },
    ];

    tests.forEach((test) => {
        expect(isDigit(test.in)).toEqual(test.out);
    });
})