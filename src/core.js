import omit from "lodash/fp/omit";
import pick from "lodash/fp/pick";
import pickBy from "lodash/fp/pickBy";
import flattenDeep from "lodash/fp/flattenDeep";
import mapValues from "lodash/mapValues";
import deepmerge from "deepmerge";

const pickTruthty = pickBy(Boolean);

function getDisplayName(Component) {
    if (typeof Component === "string") {
        return Component;
    }

    return Component.displayName || Component.name || "Anonymous";
}

function mergeAlts(parent, current) {
    const alts = {};

    Object.keys(parent).forEach(key => {
        alts[key] = parent[key];
    });

    Object.keys(current).forEach(key => {
        alts[key] = flattenDeep([alts[key], current[key]]).filter(Boolean);
    });

    return alts;
}

const createSimple = (createRule, render) =>
    function simple(Component, styles, alts = {}) {
        if (Component._styleWrapped) {
            const parentAlts = Component._styleWrapped.alts;

            return simple(
                Component._styleWrapped.Component,
                flattenDeep([Component._styleWrapped.styles, styles]),
                mergeAlts(parentAlts, alts),
            );
        }

        const rules = {__base: createRule(flattenDeep([styles]))};

        const altProps = Object.keys(alts);

        for (let key in alts) {
            rules[key] = createRule(flattenDeep([styles, alts[key]]));
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
