import React from "react";
import cn from "classnames";
import {css} from "glamor";
import omit from "lodash/fp/omit";
import pick from "lodash/fp/pick";
import pickBy from "lodash/fp/pickBy";
import deepmerge from "deepmerge";

const pickTruthty = pickBy(Boolean);
const defaultNamePat = /^simple\(.*\)/;

function getDisplayName(Component) {
    if (typeof Component === "string") {
        return Component;
    }

    return Component.displayName || Component.name || "Anonymous";
}

var compnentCounter = 0;

function simple(Component, styles, alts = {}) {
    const num = compnentCounter++;
    const makeDebugClass = className =>
        className && !defaultNamePat.test(className) ? className + "___" + num : null;

    if (Component._styleWrapped) {
        return simple(
            Component._styleWrapped.Component,
            deepmerge(Component._styleWrapped.styles, styles),
            deepmerge(Component._styleWrapped.alts, alts),
        );
    }

    const rules = {__base: css(styles)};

    const altProps = Object.keys(alts);

    for (let key in alts) {
        rules[key] = css(deepmerge(styles, alts[key]));
    }

    function Simple({className, ...otherProps}) {
        const passProps = omit(altProps, otherProps);
        const alt = Object.keys(pickTruthty(pick(altProps, otherProps)));

        if (alt.length > 1) {
            throw new Error("Too many alt props: " + alt.join(", "));
        }

        const rule = rules[alt[0] || "__base"];

        const props = {
            ...passProps,
            className: cn(
                makeDebugClass(Simple.displayName),
                makeDebugClass(alt[0]),
                className,
                String(rule),
            ),
        };

        return <Component {...props} />;
    }

    Simple._styleWrapped = {
        Component,
        styles,
        alts,
    };

    Simple.displayName = "simple(" + getDisplayName(Component) + ")";

    Simple.create = el => simple(el, styles, alts);

    return Simple;
}

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
