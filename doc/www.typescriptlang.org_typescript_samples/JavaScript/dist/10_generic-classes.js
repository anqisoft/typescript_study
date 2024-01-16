// https://www.typescriptlang.org/play?q=462#example/generic-classes
// This example is mostly in TypeScript, because it is much
// easier to understand this way first. At the end we'll
// cover how to create the same class but using JSDoc instead.
// Generic Classes are a way to say that a particular type
// depends on another type. For example, here is a drawer
// which can hold any sort of object, but only one type:
var Drawer = /** @class */ (function () {
    function Drawer() {
        this.contents = [];
    }
    Drawer.prototype.add = function (object) {
        this.contents.push(object);
    };
    Drawer.prototype.remove = function () {
        return this.contents.pop();
    };
    return Drawer;
}());
// We can create a Drawer just for socks by passing in the
// type Sock when we create a new Drawer:
var sockDrawer = new Drawer();
// Now we can add or remove socks to the drawer:
sockDrawer.add({ color: "white" });
var mySock = sockDrawer.remove();
// As well as creating a drawer for TShirts:
var tshirtDrawer = new Drawer();
tshirtDrawer.add({ size: "m" });
// If you're a bit eccentric, you could even create a drawer
// which mixes Socks and TShirts by using a union:
var mixedDrawer = new Drawer();
// Creating a class like Drawer without the extra TypeScript
// syntax requires using the template tag in JSDoc. In this
// example we define the template variable, then provide
// the properties on the class:
// To have this work in the playground, you'll need to change
// the settings to be a JavaScript file, and delete the
// TypeScript code above
/**
 * @template {{}} ClothingType
 */
var Dresser = /** @class */ (function () {
    function Dresser() {
        /** @type {ClothingType[]} */
        this.contents = [];
    }
    /** @param {ClothingType} object */
    Dresser.prototype.add = function (object) {
        this.contents.push(object);
    };
    /** @return {ClothingType} */
    Dresser.prototype.remove = function () {
        return this.contents.pop();
    };
    return Dresser;
}());
// Then we create a new type via JSDoc:
/**
 * @typedef {Object} Coat An item of clothing
 * @property {string} color The colour for coat
 */
// Then when we create a new instance of that class
// we use @type to assign the variable as a Dresser
// which handles Coats.
/** @type {Dresser<Coat>} */
var coatDresser = new Dresser();
coatDresser.add({ color: "green" });
var coat = coatDresser.remove();
