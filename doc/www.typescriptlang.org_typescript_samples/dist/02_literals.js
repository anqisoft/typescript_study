// https://www.typescriptlang.org/play/?q=98
// TypeScript has some fun special cases for literals in
// source code.
// In part, a lot of the support is covered in type widening
// and narrowing ( example:type-widening-and-narrowing ) and it's
// worth covering that first.
// A literal is a more concrete subtype of a collective type.
// What this means is that "Hello World" is a string, but a
// string is not "Hello World" inside the type system.
var helloWorld = "Hello World";
var hiWorld = "Hi World"; // this is a string because it is let
allowsAnyString(helloWorld);
allowsAnyString(hiWorld);
allowsOnlyHello(helloWorld);
allowsOnlyHello(hiWorld);
allowsFirstFiveNumbers(1);
allowsFirstFiveNumbers(10);
var potentiallyAnyNumber = 3;
allowsFirstFiveNumbers(potentiallyAnyNumber);
// At first glance, this rule isn't applied to complex objects.
var myUser = {
    name: "Sabrina"
};
// See how it transforms `name: "Sabrina"` to `name: string`
// even though it is defined as a constant. This is because
// the name can still change any time:
myUser.name = "Cynthia";
// Because myUser's name property can change, TypeScript
// cannot use the literal version in the type system. There
// is a feature which will allow you to do this however.
var myUnchangingUser = {
    name: "Fatma"
};
// When "as const" is applied to the object, then it becomes
// a object literal which doesn't change instead of a
// mutable object which can.
myUnchangingUser.name = "Raîssa";
// "as const" is a great tool for fixtured data, and places
// where you treat code as literals inline. "as const" also
// works with arrays:
var exampleUsers = [{ name: "Brian" }, { name: "Fahrooq" }];
