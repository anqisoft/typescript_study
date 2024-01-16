// https://www.typescriptlang.org/play?q=156#example/mixins
// Mixins are a faux-multiple inheritance pattern for classes
// in JavaScript which TypeScript has support for. The pattern
// allows you to create a class which is a merge of many
// classes.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Then we can create a series of classes which extend
// the final class by wrapping it. This pattern works well
// when similar objects have different capabilities.
// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:
function Scale(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Mixins may not declare private/protected properties
            // however, you can use ES2020 private fields
            _this._scale = 1;
            return _this;
        }
        class_1.prototype.setScale = function (scale) {
            this._scale = scale;
        };
        Object.defineProperty(class_1.prototype, "scale", {
            get: function () {
                return this._scale;
            },
            enumerable: false,
            configurable: true
        });
        return class_1;
    }(Base));
}
// This mixin adds extra methods around alpha composition
// something which modern computers use to create depth:
function Alpha(Base) {
    return /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.alpha = 1;
            return _this;
        }
        class_2.prototype.setHidden = function () {
            this.alpha = 0;
        };
        class_2.prototype.setVisible = function () {
            this.alpha = 1;
        };
        class_2.prototype.setAlpha = function (alpha) {
            this.alpha = alpha;
        };
        return class_2;
    }(Base));
}
// A simple sprite base class which will then be extended:
var Sprite = /** @class */ (function () {
    function Sprite(name) {
        this.name = "";
        this.x = 0;
        this.y = 0;
        this.name = name;
    }
    return Sprite;
}());
// Here we create two different types of sprites
// which have different capabilities:
var ModernDisplaySprite = Alpha(Scale(Sprite));
var EightBitSprite = Scale(Sprite);
// Creating instances of these classes shows that
// the objects have different sets of properties
// and methods due to their mixins:
var flappySprite = new ModernDisplaySprite("Bird");
flappySprite.x = 10;
flappySprite.y = 20;
flappySprite.setVisible();
flappySprite.setScale(0.8);
console.log(flappySprite.scale);
var gameBoySprite = new EightBitSprite("L block");
gameBoySprite.setScale(0.3);
// Fails because an EightBitSprite does not have
// the mixin for changing alphas:
gameBoySprite.setAlpha(0.5);
// We can then create a mixin which relies on the function
// present in the parameter to the GConstructor above.
function Jumpable(Base) {
    return /** @class */ (function (_super) {
        __extends(class_3, _super);
        function class_3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_3.prototype.jump = function () {
            // This mixin knows about setXYAcceleration now
            this.setXYAcceleration(0, 20);
        };
        return class_3;
    }(Base));
}
// We cannot create this sprite until there is a class
// in the mixin hierarchy which adds setXYAcceleration:
var UserSprite = new Jumpable(ModernDisplaySprite);
