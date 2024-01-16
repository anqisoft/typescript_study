// https://www.typescriptlang.org/play/?q=245
// Conditional Types provide a way to do simple logic in the
// TypeScript type system. This is definitely an advanced
// feature, and it's quite feasible that you won't need to
// use this in your normal day to day code.
// Then depending on how much the type-system knows about
// the boolean, you will get different return types:
var stringReturnValue = getID(true);
var numberReturnValue = getID(false);
var stringOrNumber = getID(Math.random() < 0.5);
