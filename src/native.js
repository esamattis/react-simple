import React from "react";
// eslint-disable-next-line import/no-unresolved
import {StyleSheet} from "react-native";
import createSimple from "./core";

const simple = createSimple(styles => StyleSheet.create({base: styles}), (
    self,
    Component,
    rule,
    {style, ...otherProps},
) => {
    const props = {
        ...otherProps,
        style: style ? [rule.base, style] : rule.base,
    };

    return <Component {...props} />;
});

export default simple;
