// https://www.typescriptlang.org/play?q=68#example/typing-functions
// TypeScript's inference can get you very far, but there
// are lots of extra ways to provide a richer way to document
// the shape of your functions.
// A good first place is to look at optional params, which
// is a way of letting others know you can skip params.
var i = 0;
var incrementIndex = function (value) {
    i += value === undefined ? 1 : value;
};
// This function can be called like:
incrementIndex();
incrementIndex(0);
incrementIndex(3);
// You can type parameters as functions, which provides
// type inference when you write the functions.
var callbackWithIndex = function (callback) {
    callback(i);
};
var callbackWithIndex2 = function (callback) {
    callback(i);
};
// These can be called like:
callbackWithIndex(function (index) {
    console.log(index);
});
// By hovering on index above, you can see how TypeScript
// has inferred the index to be a number correctly.
// TypeScript inference can work when passing a function
// as an instance reference too. To show this, we'll use
// a function which changed a number into string:
var numberToString = function (n) {
    return n.toString();
};
// This can be used in a function like map on an array
// to convert all numbers into a string, if you hover
// on stringedNumbers below you can see the expected types.
var stringedNumbers = [1, 4, 6, 10].map(function (i) { return numberToString(i); });
// We can use shorthand to have the function passed directly
// and get the same results with more focused code:
var stringedNumbersTerse = [1, 4, 6, 10].map(numberToString);
var printFormattedName = function (input) { };
printFormattedName({ name: "joey" });
printFormattedName({ name: "joey", age: 23 });
// If you'd like to learn more about index-signatures
// we recommend:
//
// https://www.typescriptlang.org/docs/handbook/interfaces.html#excess-property-checks
// https://basarat.gitbooks.io/typescript/docs/types/index-signatures.html
// You can also allow this kind of behavior everywhere
// via the tsconfig flag suppressExcessPropertyErrors -
// however, you can't know if others using your API have
// this set to off.
// Functions in JavaScript can accept different sets of params.
// There are two common patterns for describing these: union
// types for parameters/return, and function overloads.
// Using union types in your parameters makes sense if there
// are only one or two changes and documentation does not need
// to change between functions.
var boolOrNumberFunction = function (input) { };
boolOrNumberFunction(true);
boolOrNumberFunction(23);
var boolValue = boolOrNumberOrStringFunction(true);
var numberValue = boolOrNumberOrStringFunction(12);
var boolValue2 = boolOrNumberOrStringFunction("string");
// If you hover over the above values and functions you
// can see the right documentation and return values.
// Using function overloads can get you very far, however
// there's another tool for dealing with different types of
// inputs and return values and that is generics.
// These provide a way for you to have types as placeholder
// variables in type definitions.
// example:generic-functions
// example:function-chaining
