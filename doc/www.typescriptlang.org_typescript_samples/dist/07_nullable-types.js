// https://www.typescriptlang.org/play/?strictNullChecks=false&q=408
// JavaScript has two ways to declare values which don't
// exist, and TypeScript adds extra syntax which allows even
// more ways to declare something as optional or nullable.
// First up, the difference between the two JavaScript
// primitives: undefined and null
// Undefined is when something cannot be found or set
var emptyObj = {};
var anUndefinedProperty = emptyObj["anything"];
// Null is meant to be used when there is a conscious lack
// of a value.
var searchResults = {
    video: { name: "LEGO Movie" },
    text: null,
    audio: { name: "LEGO Movie Soundtrack" }
};
var userID = getID();
console.log("User Logged in: ", userID.toUpperCase());
// Only in strict mode the above will fail ^
// There are ways to tell TypeScript you know more, such as
// a type assertion or via a non-null assertion operator (!)
var definitelyString1 = getID();
var definitelyString2 = getID();
// Or you safely can check for the existence via an if:
if (userID) {
    console.log(userID);
}
// Optional Properties
// Void
// Void is the return type of a function which does not
// return a value.
var voidFunction = function () { };
var resultOfVoidFunction = voidFunction();
// This is usually an accident, and TypeScript keeps the void
// type around to let you get compiler errors - even though at
// runtime it would be an undefined.
