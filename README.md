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
- `@media` queries
- css animations
- server side rendering
- and more: checkout the [glamor docs][glamor]

glamor `css`function can be imported with `import {css} from "react-simple"` if required

[glamor]: https://github.com/threepointone/glamor
