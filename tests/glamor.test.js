import React from "react";
import simple from "../src/glamor";
import {css} from "glamor";
import renderer from "react-test-renderer";

jest.mock("glamor", () => ({
    css: jest.fn(() => "glamor-generated-class-name"),
}));

describe("glamor backend", () => {
    beforeEach(() => {
        css.mockClear();
    });

    test("renders class name", () => {
        const Button = simple("button", {
            padding: 10,
        });

        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("passes custom class names", () => {
        const Button = simple("button", {
            padding: 10,
        });

        const tree = renderer
            .create(<Button className="custom-class-name" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("is called with the style definition", () => {
        const Button = simple("button", {
            padding: 10,
        });
        Button; // eslint-disable-line

        expect(css).lastCalledWith({
            padding: 10,
        });
    });

    test("is called with the alt style definition", () => {
        const Button = simple(
            "button",
            {
                padding: 10,
            },
            {
                red: {
                    backgroundColor: "red",
                },
            },
        );
        Button; // eslint-disable-line

        expect(css).lastCalledWith({
            padding: 10,
            backgroundColor: "red",
        });
    });

    test("renders the alt class", () => {
        const Button = simple(
            "button",
            {
                padding: 10,
            },
            {
                red: {
                    backgroundColor: "red",
                },
            },
        );
        Button; // eslint-disable-line

        const tree = renderer.create(<Button red />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("renders extended component name", () => {
        const Button = simple("button", {
            padding: 10,
        });
        const RoundButton = simple(Button, {
            borderRadius: 10,
        });

        const tree = renderer.create(<RoundButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("is called with the extended styles", () => {
        const Button = simple("button", {
            padding: 10,
        });

        const RoundButton = simple(Button, {
            borderRadius: 10,
        });
        RoundButton; // eslint-disable-line

        expect(css).lastCalledWith({
            padding: 10,
            borderRadius: 10,
        });
    });
});
