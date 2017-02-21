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
            create: jest.fn(s => s),
        },
    }),
    {virtual: true},
);

describe("native backend", () => {
    beforeEach(() => {
        StyleSheet.create.mockClear();
    });

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

        expect(StyleSheet.create.mock.calls).toEqual([
            [
                {
                    base: {
                        padding: 10,
                    },
                },
            ],
        ]);
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

        expect(StyleSheet.create.mock.calls).toEqual([
            [{base: {padding: 10}}],
            [{base: {padding: 10}}],
            [{base: {backgroundColor: "red"}}],
        ]);

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

        expect(StyleSheet.create.mock.calls).toEqual([
            [{base: {padding: 10}}],
            [{base: {padding: 10}}],
            [{base: {borderRadius: 10}}],
        ]);

        const tree = renderer.create(<RoundButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
