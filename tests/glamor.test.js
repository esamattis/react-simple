import React from "react";
import simple from "../src/glamor";
import {css} from "glamor";
import renderer from "react-test-renderer";

// jest.mock("glamor", () => ({
//     css: jest.fn(() => "glamor-generated-class-name"),
// }));

describe("glamor backend", () => {
    // beforeEach(() => {
    //     css.mockClear();
    // });

    test("renders class name custom classname", () => {
        const Button = simple("button", {
            padding: 10,
        });

        const tree = renderer
            .create(<Button className="custom-class-name" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
