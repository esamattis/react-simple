module.exports = require("babel-plugin-display-name-custom").createPlugin({
    modules: {
        "react-simple": {default: true},
        "react-simple/inline": {default: true},
    },
});
