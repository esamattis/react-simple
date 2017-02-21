import createSimple from "../src/core";

test("createRule is called with the style", () => {
    const createRule = jest.fn();

    const simple = createSimple(createRule, jest.fn());

    simple("div", {
        padding: 10,
    });

    expect(createRule).lastCalledWith([
        {
            padding: 10,
        },
    ]);
});

test("extending calls createRule with parent styles", () => {
    const createRule = jest.fn();
    const simple = createSimple(createRule, jest.fn());

    const Parent = simple("div", {
        padding: 10,
    });

    const Child = simple(Parent, {
        color: "red",
    });

    expect(createRule).lastCalledWith([
        {
            padding: 10,
        },
        {
            color: "red",
        },
    ]);
});

test("createRule is called with alt styles", () => {
    const createRule = jest.fn();
    const simple = createSimple(createRule, jest.fn());

    simple(
        "div",
        {
            padding: 10,
        },
        {
            red: {
                color: "red",
            },
        },
    );

    expect(createRule).lastCalledWith([
        {
            padding: 10,
        },
        {
            color: "red",
        },
    ]);
});

test("when extending createRule is called with alt styles", () => {
    const createRule = jest.fn();
    const simple = createSimple(createRule, jest.fn());

    const Parent = simple(
        "div",
        {
            padding: 10,
        },
        {
            active: {
                color: "red",
            },
        },
    );

    const Child = simple(
        Parent,
        {
            margin: 10,
        },
        {
            active: {
                color: "blue",
            },
        },
    );

    expect(createRule).lastCalledWith([
        {
            padding: 10,
        },
        {
            margin: 10,
        },
        {
            color: "red",
        },
        {
            color: "blue",
        },
    ]);
});
