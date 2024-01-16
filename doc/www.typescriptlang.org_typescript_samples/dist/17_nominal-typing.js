// https://www.typescriptlang.org/play/?q=188
// A nominal type system means that each type is unique
// and even if types have the same data you cannot assign
// across types.
// We will use a function to transform a string to
// a ValidatedInputString - but the point worth noting
// is that we're just _telling_ TypeScript that it's true.
var validateUserInput = function (input) {
    var simpleValidatedInput = input.replace(/\</g, "≤");
    return simpleValidatedInput;
};
// Now we can create functions which will only accept
// our new nominal type, and not the general string type.
var printName = function (name) {
    console.log(name);
};
// For example, here's some unsafe input from a user, going
// through the validator and then being allowed to be printed:
var input = "alert('bobby tables')";
var validatedInput = validateUserInput(input);
printName(validatedInput);
// On the other hand, passing the un-validated string to
// printName will raise a compiler error:
printName(input);
// You can read a comprehensive overview of the
// different ways to create nominal types, and their
// trade-offs in this 400 comment long GitHub issue:
//
// https://github.com/Microsoft/TypeScript/issues/202
//
// and this post is a great summary:
//
// https://michalzalecki.com/nominal-typing-in-typescript/
