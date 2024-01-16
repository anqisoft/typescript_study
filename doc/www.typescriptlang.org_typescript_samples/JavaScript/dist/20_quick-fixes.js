// https://www.typescriptlang.org/play?q=428#example/quick-fixes
// TypeScript provides quick-fix recommendations for
// common accidents. Prompts show up in your editor based
// on these recommendations.
// For example TypeScript can provide quick-fixes
// for typos in your types:
var eulersNumber = 2.7182818284;
eulersNumber.toStrang();
//           ^______^ - select this to see the light bulb
var ExampleClass = /** @class */ (function () {
    function ExampleClass() {
    }
    ExampleClass.prototype.method = function () {
        this.notDeclared = 10;
    };
    return ExampleClass;
}());
