# react-simple

Simple style only components for React.

Install

    yarn add react-simple  

Usage

```js
import simple from "react-simple";

const Button = simple("button", {
    padding: 10,
});
// <Button>click</Button>


// extend existing components
const RedButtonWithPadding = simple(Button, {
    backgroundColor: "red",
});


// reuse styles for different component types
const LinkWithPadding = simple(Button.create("a"), {
    textDecoration: "none",
});
// <LinkWithPadding href="/link">link</LinkWithPadding>


// simple style toggles
const Button = simple("button", {
    padding: 10,
}, {
    rounded: {
        borderRadius: 5,
    },
});
// <Button rounded>click</Button>


// can extend 3rd party commponents too
import {Link} from "react-router";

const RedLink = simple(Link, {
    backgroundColor: "red",
});
// <Link to="/hello">Hello</Link>
```

The css-in-js engine is [glamor][] which means following features:

- automatic vendor prefixes
- pseudo :classes/::elements
- media queries
- css animations
- server side rendering
- and more: checkout the [glamor docs][glamor]

glamor `css`function can be imported with `import {css} from "react-simple"` if required

[glamor]: https://github.com/threepointone/glamor

# Babel Plugin

> This is totally optional!

By default components created using `simple` do not get proper component names
which means they won't get very helpful names in [React Developer Tools][devtools].
This can be mitigated using the bundled `react-simple/babel` Babel plugin which infers
the component names from the variable declarations.

[devtools]: https://github.com/facebook/react-devtools

The use it add `react-simple/babel` to your `.babelrc`

```json
{
    "presets": ["es2015", "react"],
    "plugins": [
        "react-simple/babel"
    ]
}
```

In practice this means that instead of

![default](https://raw.githubusercontent.com/epeli/react-simple/master/demo/assets/simple-default.png)

you will get

![default](https://raw.githubusercontent.com/epeli/react-simple/master/demo/assets/simple-babel.png)

as you can see it will also add class names corresponding the component names
so even without the React specfic devtools you will get better insights

![default](https://raw.githubusercontent.com/epeli/react-simple/master/demo/assets/simple-dom.png)

You can see this live at https://epeli.github.io/react-simple/ Source code is under `demo/`.

This feature is powered by [babel-plugin-display-name-custom][].

[babel-plugin-display-name-custom]: https://github.com/epeli/babel-plugin-display-name-custom
