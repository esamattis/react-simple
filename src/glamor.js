import React from "react";
import cn from "classnames";
import {css} from "glamor";

import createSimple from "./core";

const defaultNamePat = /^simple\(.*\)/;
var counter = 0;

const simple = createSimple(css, (
    self,
    Component,
    rule,
    {className, ...otherProps},
    altStyleName,
) => {
    const num = counter++;

    const makeDebugClass = className =>
        className && !defaultNamePat.test(className)
            ? className + "___" + num
            : null;

    const props = {
        ...otherProps,
        className: cn(
            makeDebugClass(self.displayName),
            makeDebugClass(altStyleName),
            className,
            String(rule),
        ),
    };

    return <Component {...props} />;
});

const viewStyles = {
    boxSizing: "border-box",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flexShrink: 0,
    alignContent: "flex-start",
    border: 0,
    margin: 0,
    padding: 0,
    minWidth: 0,
};

export const View = simple("div", viewStyles);
View.displayName = "View";
export {css};
export default simple;
