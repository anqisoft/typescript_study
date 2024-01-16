// https://www.typescriptlang.org/play/?q=111
// Any is the TypeScript escape clause. You can use any to
// either declare a section of your code to be dynamic and
// JavaScript like, or to work around limitations in the
// type system.
// A good case for any is JSON parsing:
var myObject = JSON.parse("{}");
// Any declares to TypeScript to trust your code as being
// safe because you know more about it. Even if that is
// not strictly true. For example, this code would crash:
myObject.x.y.z;
debug("a string");
debug(23);
debug({ color: "blue" });
swap(pair);
// The call to swap is allowed because the argument can be
// matched by replacing the first any in pair with number
// and the second `any` with string.
// If tuples are new to you, see: example:tuples
// Unknown is a sibling type to any, if any is about saying
// "I know what's best", then unknown is a way to say "I'm
// not sure what is best, so you need to tell TS the type"
// example:unknown-and-never
