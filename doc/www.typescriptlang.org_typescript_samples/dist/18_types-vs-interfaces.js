// https://www.typescriptlang.org/play/?q=230
// There are two main tools to declare the shape of an
// object: interfaces and type aliases.
//
// They are very similar, and for the most common cases
// act the same.
var bird1 = { wings: 2 };
var bird2 = { wings: 2 };
// Because TypeScript is a structural type system,
// it's possible to intermix their use too.
var bird3 = bird1;
var owl = { wings: 2, nocturnal: true };
var chicken = { wings: 2, colourful: false, flies: false };
// That said, we recommend you use interfaces over type
// aliases. Specifically, because you will get better error
// messages. If you hover over the following errors, you can
// see how TypeScript can provide terser and more focused
// messages when working with interfaces like Chicken.
owl = chicken;
chicken = owl;
// Depending on your goals, this difference could be a
// positive or a negative. However for publicly exposed
// types, it's a better call to make them an interface.
// One of the best resources for seeing all of the edge
// cases around types vs interfaces, this stack overflow
// thread is a good place to start:
// https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types/52682220#52682220
