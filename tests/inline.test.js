import React from "react";
import renderer from "react-test-renderer";

import simple from "../src/inline";

describe("inline backend", () => {
    test("renders style attribute and debug class name", () => {
        const Button = simple("button", {
            padding: 10,
        });

        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("passes custom classes ", () => {
        const Button = simple("button", {
            padding: 10,
        });

        const tree = renderer
            .create(<Button className="custom-class-name" />)
            .toJSON();
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

    test("renders the alt styles and debug class", () => {
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

    test("renders the combined styles for extended components", () => {
        const Button = simple("button", {
            padding: 10,
        });
        const RoundButton = simple(Button, {
            borderRadius: 10,
        });

        const tree = renderer.create(<RoundButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
