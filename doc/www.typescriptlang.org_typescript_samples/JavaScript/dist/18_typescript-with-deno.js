"use strict";
// https://www.typescriptlang.org/play/?q=100#example/typescript-with-deno
// Deno is a work-in-progress JavaScript and TypeScript
// runtime based on v8 with a focus on security.
exports.__esModule = true;
// https://deno.land
// Deno has a sandbox-based permissions system which reduces the
// access JavaScript has to the file-system or the network and uses
// http based imports which are downloaded and cached locally.
// Here is an example of using deno for scripting:
var compose_ts_1 = require("https://deno.land/x/denofun/lib/compose.ts");
function greet(name) {
    return "Hello, " + name + "!";
}
function makeLoud(x) {
    return x.toUpperCase();
}
var greetLoudly = compose_ts_1["default"](makeLoud, greet);
// Echos "HELLO, WORLD!."
greetLoudly("world");
var concat_ts_1 = require("https://deno.land/x/denofun/lib/concat.ts");
// Returns "helloworld"
concat_ts_1["default"]("hello", "world");
