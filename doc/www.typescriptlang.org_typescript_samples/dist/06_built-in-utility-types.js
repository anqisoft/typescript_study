// https://www.typescriptlang.org/play/?strictNullChecks=true&q=149
var navigationInfo = {
    home: { title: "Home", url: "/" },
    about: { title: "About", url: "/about" },
    contact: { title: "Contact", url: "/contact" },
    stickers: { title: "Stickers", url: "/stickers/all" }
};
// InstanceType<Type>
// Creates a type which is an instance of a class, or object
// with a constructor function.
var StickerCollection = /** @class */ (function () {
    function StickerCollection() {
    }
    return StickerCollection;
}());
// ThisType<Type>
// Unlike other types, ThisType does not return a new
// type but instead manipulates the definition of this
// inside a function. You can only use ThisType when you
// have noImplicitThis turned on in your TSConfig.
// https://www.typescriptlang.org/docs/handbook/utility-types.html
