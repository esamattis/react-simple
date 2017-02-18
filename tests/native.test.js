import React from "react";
// eslint-disable-next-line import/no-unresolved
import {View, StyleSheet} from "react-native";
import renderer from "react-test-renderer";

import simple from "../src/native";

jest.mock(
    "react-native",
    () => ({
        View: "View",
        StyleSheet: {
            create: jest.fn(s => ({base: s})),
        },
    }),
    {virtual: true},
);

describe("native backend", () => {
    test("renders styles", () => {
        const MyView = simple(View, {
            padding: 10,
        });

        const tree = renderer.create(<MyView />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("is called with the style definition", () => {
        const MyView = simple(View, {
            padding: 10,
        });
        MyView; // eslint-disable-line

        expect(StyleSheet.create).lastCalledWith({
            base: {
                padding: 10,
            },
        });
    });

    test("is called with the alt style definition", () => {
        const MyView = simple(
            View,
            {
                padding: 10,
            },
            {
                red: {
                    backgroundColor: "red",
                },
            },
        );

        expect(StyleSheet.create).lastCalledWith({
            base: {
                padding: 10,
                backgroundColor: "red",
            },
        });

        const tree = renderer.create(<MyView red />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("is called with the extended styles", () => {
        const MyView = simple(View, {
            padding: 10,
        });

        const RoundButton = simple(MyView, {
            borderRadius: 10,
        });

        expect(StyleSheet.create).lastCalledWith({
            base: {
                padding: 10,
                borderRadius: 10,
            },
        });

        const tree = renderer.create(<RoundButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("deeply merges extended styles", () => {
        const MyView = simple(View, {
            padding: 10,
            ":hover": {
                color: "red",
            },
        });

        const RoundButton = simple(MyView, {
            borderRadius: 10,
            ":hover": {
                color: "blue",
            },
        });

        expect(StyleSheet.create).lastCalledWith({
            base: {
                padding: 10,
                borderRadius: 10,
                ":hover": {
                    color: "blue",
                },
            },
        });

        const tree = renderer.create(<RoundButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
