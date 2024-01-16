// https://www.typescriptlang.org/play/?strictFunctionTypes=false&q=56
// Without a background in type theory, you're unlikely
// to be familiar with the idea of a type system being "sound".
// Soundness is the idea that the compiler can make guarantees
// about the type a value has at runtime, and not just
// during compilation. This is normal for most programming
// languages that are built with types from day one.
// Building a type system which models a language which has
// existed for a few decades however becomes about making
// decisions with trade-offs on three qualities: Simplicity,
// Usability and Soundness.
// With TypeScript's goal of being able to support all JavaScript
// code, the language tends towards simplicity and usability
// when presented with ways to add types to JavaScript.
// Let's look at a few cases where TypeScript is provably
// not sound, to understand what those trade-offs would look
// like otherwise.
// Type Assertions
var usersAge = "23";
function listenForEvent(eventType, handler) { }
// You can re-declare the parameter type to be a subtype of
// the declaration. Above, handler expected a type InputEvent
// but in the below usage examples - TypeScript accepts
// a type which has additional properties.
listenForEvent("keyboard", function (event) { });
listenForEvent("mouse", function (event) { });
// This can go all the way back to the smallest common type:
listenForEvent("mouse", function (event) { });
// But no further:
listenForEvent("mouse", function (event) { });
// This covers the real-world pattern of event listener
// in JavaScript, at the expense of having being sound.
// TypeScript can raise an error when this happens via
// `strictFunctionTypes`. Or, you could work around this
// particular case with function overloads,
// see: example:typing-functions
// Void special casing
// Parameter Discarding
// To learn about special cases with function parameters
// see example:structural-typing
// Rest Parameters
// Rest parameters are assumed to all be optional, this means
// TypeScript will not have a way to enforce the number of
// parameters available to a callback.
function getRandomNumbers(count, callback) { }
getRandomNumbers(2, function (first, second) { return console.log([first, second]); });
getRandomNumbers(400, function (first) { return console.log(first); });
// Void Functions Can Match to a Function With a Return Value
// A function which returns a void function, can accept a
// function which takes any other type.
var getPI = function () { return 3.14; };
function runFunction(func) {
    func();
}
runFunction(getPI);
// For more information on the places where soundness of the
// type system is compromised, see:
// https://github.com/Microsoft/TypeScript/wiki/FAQ#type-system-behavior
// https://github.com/Microsoft/TypeScript/issues/9825
// https://www.typescriptlang.org/docs/handbook/type-compatibility.html
