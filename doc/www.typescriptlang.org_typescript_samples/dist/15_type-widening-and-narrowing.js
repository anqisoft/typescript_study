// https://www.typescriptlang.org/play/?q=280
// It might be easiest to start of the discussion of
// widening and narrowing with an example:
var welcomeString = "Hello There";
var replyString = "Hey";
// Aside from the text differences of the strings, welcomeString
// is a const (which means the value will never change)
// and replyString is a let (which means it can change).
// If you hover over both variables, you get very different
// type information from TypeScript:
//
//   const welcomeString: "Hello There"
//
//   let replyString: string
// TypeScript has inferred the type of welcomeString to be
// the literal string "Hello There", whereas replyString
// is general string.
// This is because a let needs to have a wider type, you
// could set replyString to be any other string - which means
// it has a wider set of possibilities.
replyString = "Hi :wave:";
// This will fail in strict mode only
quantumString.length;
// In strict mode the onus is on the code author to ensure
// that the type has been narrowed to the non-null type.
// Usually this is as simple as an if check:
if (quantumString) {
    quantumString.length;
}
// In strict mode the type quantumString has two representations.
// Inside the if, the type was narrowed to just string.
// You can see more examples of narrowing in:
//
// example:union-and-intersection-types
// example:discriminate-types
// And even more resources on the web:
//
// https://mariusschulz.com/blog/literal-type-widening-in-typescript
// https://sandersn.github.io/manual/Widening-and-Narrowing-in-Typescript.html
