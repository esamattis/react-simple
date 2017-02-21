import React from "react";
// eslint-disable-next-line import/no-unresolved
import {StyleSheet} from "react-native";
import flattenDeep from "lodash/fp/flattenDeep";
import createSimple from "./core";

const createStylesheets = styles =>
    styles.map(style => StyleSheet.create({base: style}).base);

const render = (self, Component, rule, {style, ...otherProps}) => {
    const props = {
        ...otherProps,
        style: flattenDeep([rule, style]).filter(Boolean),
    };

    return <Component {...props} />;
};

export default createSimple(createStylesheets, render);
