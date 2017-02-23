import React from "react";
import cn from "classnames";

import createSimple from "./core";

const defaultNamePat = /^simple\(.*\)/;

const combineStyles = styles =>
    styles.reduce((acc, style) => Object.assign(acc, style), {});

const render = (
    self,
    Component,
    rule,
    {style, className, ...otherProps},
    altStyleName,
) => {
    const makeDebugClass = className =>
        className && !defaultNamePat.test(className) ? className + "__" : null;

    const mergedStyles = {
        ...rule,
        ...style,
    };

    const props = {
        ...otherProps,
        style: mergedStyles,
        className: cn(
            makeDebugClass(self.displayName),
            makeDebugClass(altStyleName),
            className,
        ),
    };

    return <Component {...props} />;
};

export default createSimple(combineStyles, render);
