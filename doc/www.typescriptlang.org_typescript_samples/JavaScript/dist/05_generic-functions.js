// https://www.typescriptlang.org/play?q=479#example/generic-functions
// Generics provide a way to use Types as variables in other
// types. Meta.
// We'll be trying to keep this example light, you can do
// a lot with generics and it's likely you will see some very
// complicated code using generics at some point - but that
// does not mean that generics are complicated.
// Let's start with an example where we wrap an input object
// in an array. We will only care about one variable in this
// case, the type which was passed in:
function wrapInArray(input) {
    return [input];
}
// Note: it's common to see Type referred to as T. This is
// culturally similar to how people use i in a for loop to
// represent index. T normally represents Type, so we'll
// be using the full name for clarity.
// Our function will use inference to always keep the type
// passed in the same as the type passed out (though
// it will be wrapped in an array).
var stringArray = wrapInArray("hello generics");
var numberArray = wrapInArray(123);
// We can verify this works as expected by checking
// if we can assign a string array to a function which
// should be an object array:
var notStringArray = wrapInArray({});
// You can also skip the generic inference by adding the
// type yourself also:
var stringArray2 = wrapInArray("");
// This function takes a set of objects which have a function
// for drawing to the screen
function renderToScreen(input) {
    input.forEach(function (i) { return i.draw(); });
}
var objectsWithDraw = [{ draw: function () { } }, { draw: function () { } }];
renderToScreen(objectsWithDraw);
// It will fail if draw is missing:
renderToScreen([{}, { draw: function () { } }]);
function addObjectToCache(obj, cache) {
    cache.save(obj);
    return cache;
}
// Now when the CacheHostGeneric is used, you need to tell
// it what ContentType is.
function addTypedObjectToCache(obj, cache) {
    cache.save(obj);
    return cache;
}
// That escalated pretty quickly in terms of syntax. However,
// this provides more safety. These are trade-offs, that you
// have more knowledge to make now. When providing APIs for
// others, generics offer a flexible way to let others use
// their own types with full code inference.
// For more examples of generics with classes and interfaces:
//
// example:advanced-classes
// example:typescript-with-react
// https://www.typescriptlang.org/docs/handbook/generics.html
