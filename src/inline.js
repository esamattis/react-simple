import React from "react";
import cn from "classnames";

import createSimple from "./core";

const defaultNamePat = /^simple\(.*\)/;
var counter = 0;

const simple = createSimple(style => style, (
    self,
    Component,
    rule,
    {style, className, ...otherProps},
    altStyleName,
) => {
    const num = counter++;

    const makeDebugClass = className =>
        className && !defaultNamePat.test(className)
            ? className + "___" + num
            : null;

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
});

export default simple;
