"use strict";
// https://www.typescriptlang.org/play?jsx=2&esModuleInterop=true&q=143#example/typescript-with-react
// React is a popular library for creating user interfaces.
// It provides a JavaScript abstraction for creating view
// components using a JavaScript language extension called
// JSX.
exports.__esModule = true;
// We can then create a DateComponent which uses the
// DateProps interface, and renders the date.
var DateComponent = function (props) { return (React.createElement("time", { dateTime: props.iso8601Date }, props.message)); };
// Because this class can have both Props and State - it has
// two generic arguments which are used throughout the class.
// The React library comes with its own type definitions
// like these but are much more comprehensive. Let's bring
// those into our playground and explore a few components.
var React = require("react");
var PrintName = function (props) {
    return (React.createElement("div", null,
        React.createElement("p", { style: { fontWeight: props.priority ? "bold" : "normal" } }, props.name)));
};
// You can play with the new component's usage below:
var ShowUser = function (props) {
    return React.createElement(PrintName, { name: "Ned" });
};
// TypeScript supports providing intellisense inside
// the {} in an attribute
var username = "Cersei";
var ShowStoredUser = function (props) {
    return React.createElement(PrintName, { name: username, priority: true });
};
// TypeScript works with modern React code too, here you can
// see that count and setCount have correctly been inferred
// to use numbers based on the initial value passed into
// useState.
var react_1 = require("react");
var CounterExample = function () {
    var _a = react_1.useState(0), count = _a[0], setCount = _a[1];
    react_1.useEffect(function () {
        document.title = "You clicked " + count + " times";
    });
    return (React.createElement("div", null,
        React.createElement("p", null,
            "You clicked ",
            count,
            " times"),
        React.createElement("button", { onClick: function () { return setCount(count + 1); } }, "Click me")));
};
// React and TypeScript is a really, really big topic
// but the fundamentals are pretty small: TypeScript
// supports JSX, and the rest is handled by the React
// typings from Definitely Typed.
// You can learn more about using React with TypeScript
// from these sites:
//
// https://github.com/typescript-cheatsheets/react-typescript-cheatsheet
// https://egghead.io/courses/use-typescript-to-develop-react-applications
// https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935
