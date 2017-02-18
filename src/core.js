import omit from "lodash/fp/omit";
import pick from "lodash/fp/pick";
import pickBy from "lodash/fp/pickBy";
import deepmerge from "deepmerge";

const pickTruthty = pickBy(Boolean);

function getDisplayName(Component) {
    if (typeof Component === "string") {
        return Component;
    }

    return Component.displayName || Component.name || "Anonymous";
}

const createSimple = (createRule, render) =>
    function simple(Component, styles, alts = {}) {
        if (Component._styleWrapped) {
            return simple(
                Component._styleWrapped.Component,
                deepmerge(Component._styleWrapped.styles, styles),
                deepmerge(Component._styleWrapped.alts, alts),
            );
        }

        const rules = {__base: createRule(styles)};

        const altProps = Object.keys(alts);

        for (let key in alts) {
            rules[key] = createRule(deepmerge(styles, alts[key]));
        }

        function Simple(props) {
            const passProps = omit(altProps, props);
            const alt = Object.keys(pickTruthty(pick(altProps, props)));

            if (alt.length > 1) {
                throw new Error("Too many alt props: " + alt.join(", "));
            }

            const rule = rules[alt[0] || "__base"];

            return render(Simple, Component, rule, passProps, alt[0]);
        }

        Simple._styleWrapped = {
            Component,
            styles,
            alts,
        };

        Simple.displayName = "simple(" + getDisplayName(Component) + ")";

        Simple.create = el => simple(el, styles, alts);

        return Simple;
    };

export default createSimple;
