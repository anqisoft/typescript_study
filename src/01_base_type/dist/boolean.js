"use strict";
/*
 * Copyright (c) 2023 anqisoft@gmail.com
 * boolean.ts
 *
 * <en_us>
 * Created on Wed Dec 20 2023 14:55:45
 * Feature:
 * </en_us>
 *
 * <zh_cn>
 * 创建：2023年12月20日 14:55:45
 * 功能：
 * </zh_cn>
 *
 * <zh_tw>
 * 創建：2023年12月20日 14:55:45
 * 功能：
 * </zh_tw>
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.studyBooleanTypes = void 0;
var i18n_ts_1 = require("../i18n.ts");
var log_ts_1 = require("../log.ts");
var std_ts_1 = require("../std.ts");
/**
 * <en_us>Study boolean types</en_us>
 * <zh_cn>研究布尔类型</zh_cn>
 * <zh_tw>研究布林類型</zh_tw>
 */
function studyBooleanTypes(levelNo1) {
    /*
        <en_us>see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean</en_us>
        <zh_cn>请参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean</zh_cn>
        <zh_tw>請參考：https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Boolean</zh_tw>
    */
    console.log("\n" + levelNo1 + ". studyBooleanTypes()");
    console.log(true, false);
    var codeNo = 0;
    displayNewBoolean();
    displayDoubleNotAndBoolean();
    compareEmptyArrayAndFalse();
    codeNo = displayBooleanValues(levelNo1, codeNo);
    codeNo = compareBooleanValuesAnd1Or0(levelNo1, codeNo);
    codeNo = convertValuesToBoolean(levelNo1, codeNo);
    codeNo = compareDoubleNotBooleanNewBoolean(levelNo1, codeNo);
}
exports.studyBooleanTypes = studyBooleanTypes;
function displayNewBoolean() {
    var i18nMessage = {
        en_us: "Tips: Please use the basic types true and false, and convert other types of data to Boolean basic types via !! (equivalent to Boolean()), and forget about new Boolean() and Boolean(). Especially new Boolean(), it will take you too much time to adapt, and you will make mistakes if you are not careful--for example, if(new Boolean(false)) will always be true.",
        zh_cn: "\u3010\u63D0\u9192\u3011\u8BF7\u4F7F\u7528\u57FA\u672C\u7C7B\u578B\u7684true\u4E0Efalse\uFF0C\u5E76\u901A\u8FC7!!\uFF08\u4E0EBoolean()\u7B49\u6548\uFF09\u8F6C\u6362\u5176\u5B83\u7C7B\u578B\u7684\u6570\u636E\u5230\u5E03\u5C14\u57FA\u672C\u7C7B\u578B\uFF0C\u540C\u65F6\u5FD8\u6389new Boolean()\u548CBoolean()\u5427\u3002\u5C24\u5176\u662Fnew Boolean()\uFF0C\u5B83\u4F1A\u8BA9\u60A8\u591A\u82B1\u592A\u591A\u65F6\u95F4\u6765\u9002\u5E94\uFF0C\u800C\u4E14\u4E00\u4E0D\u5C0F\u5FC3\u5C31\u4F1A\u72AF\u9519\u2014\u2014\u6BD4\u5982if(new Boolean(false))\u603B\u80FD\u6210\u7ACB\u3002",
        zh_tw: "\u3010\u63D0\u9192\u3011\u8ACB\u4F7F\u7528\u57FA\u672C\u578B\u5225\u7684true\u8207false\uFF0C\u4E26\u900F\u904E!!\uFF08\u8207Boolean()\u7B49\u6548\uFF09\u8F49\u63DB\u5176\u5B83\u578B\u5225\u7684\u8CC7\u6599\u5230\u5E03\u6797\u57FA\u672C\u578B\u5225\uFF0C\u540C\u6642\u5FD8\u6389new Boolean()\u548CBoolean()\u5427\u3002 \u5C24\u5176\u662Fnew Boolean()\uFF0C\u5B83\u6703\u8B93\u60A8\u591A\u82B1\u592A\u591A\u6642\u9593\u4F86\u9069\u61C9\uFF0C\u800C\u4E14\u4E00\u4E0D\u5C0F\u5FC3\u5C31\u6703\u72AF\u932F\u2014\u2014\u6BD4\u5982if(new Boolean(false))\u7E3D\u80FD\u6210\u7ACB\u3002"
    };
    console.log("" + i18nMessage[i18n_ts_1.LANG]);
    // assertEqual(true, !!new Boolean(false));
    // assertEqual(true, !!new Boolean(0));
    // assertEqual(true, !!new Boolean(-0));
    // assertEqual(true, !!new Boolean(null));
    // assertEqual(true, !!new Boolean(NaN));
    // assertEqual(true, !!new Boolean(undefined));
    // assertEqual(true, !!new Boolean(''));
    std_ts_1.assertEqualAll(true, !!new Boolean(false), !!new Boolean(0), !!new Boolean(-0), !!new Boolean(null), !!new Boolean(NaN), !!new Boolean(undefined), !!new Boolean(''));
    // assertEqual(true, !!new Boolean(true));
    // assertEqual(true, !!new Boolean(1));
    // assertEqual(true, !!new Boolean(Infinity));
    // assertEqual(true, !!new Boolean('any'));
    // assertEqual(true, !!new Boolean({}));
    // assertEqual(true, !!new Boolean([]));
    std_ts_1.assertEqualAll(true, !!new Boolean(true), !!new Boolean(1), !!new Boolean(Infinity), !!new Boolean('any'), !!new Boolean({}), !!new Boolean([]));
    // assertEqual(false, new Boolean(false).valueOf());
    // assertEqual(false, new Boolean(0).valueOf());
    // assertEqual(false, new Boolean(-0).valueOf());
    // assertEqual(false, new Boolean(null).valueOf());
    // assertEqual(false, new Boolean(NaN).valueOf());
    // assertEqual(false, new Boolean(undefined).valueOf());
    // assertEqual(false, new Boolean('').valueOf());
    std_ts_1.assertEqualAll(false, new Boolean(false).valueOf(), new Boolean(0).valueOf(), new Boolean(-0).valueOf(), new Boolean(null).valueOf(), new Boolean(NaN).valueOf(), new Boolean(undefined).valueOf(), new Boolean('').valueOf());
    // assertEqual(true, !!new Boolean(true).valueOf());
    // assertEqual(true, !!new Boolean(1).valueOf());
    // assertEqual(true, !!new Boolean(Infinity).valueOf());
    // assertEqual(true, !!new Boolean('any').valueOf());
    // assertEqual(true, !!new Boolean({}).valueOf());
    // assertEqual(true, !!new Boolean([]).valueOf());
    std_ts_1.assertEqualAll(true, !!new Boolean(true).valueOf(), !!new Boolean(1).valueOf(), !!new Boolean(Infinity).valueOf(), !!new Boolean('any').valueOf(), !!new Boolean({}).valueOf(), !!new Boolean([]).valueOf());
}
function displayDoubleNotAndBoolean() {
    // MDN web docs
    // const x1 = Boolean(expression); // use this...
    // const x2 = !!expression; // ...or this
    // const x3 = new Boolean(expression); // don't use this!
    //
    // const myFalse = new Boolean(false); // initial value of false
    // const true1 = Boolean(myFalse); // initial value of true
    // const myString = new Boolean("Hello"); // string object
    // const true2 = Boolean(myString); // initial value of true
    [
        1,
        0,
        -0,
        NaN,
        Infinity,
        undefined,
        null,
        0n,
        'test',
        '',
        {},
        [],
        Symbol(),
        function () { },
        function () { },
        i18n_ts_1.LanguageNames.en_us,
        i18n_ts_1.LanguageNames.zh_cn,
    ].forEach(function (value) {
        std_ts_1.assertEqual(!!value, Boolean(value));
        std_ts_1.assertEqual(true, Boolean(new Boolean(value)));
    });
}
function compareEmptyArrayAndFalse() {
    var i18nMessage = {
        en_us: "[] === false: false, because typeof [] is object, and typeof false is boolean, so they are not equal. \n[] == false: true, the difference in type will be ignored. The .toString() method of [] is called and converted to the empty string \"\", and the empty string is false when used as a basic Boolean value. So equal.",
        zh_cn: "[] === false: false\uFF0C\u56E0typeof []\u4E3Aobject\uFF0C\u800Ctypeof false\u4E3Aboolean\uFF0C\u6240\u4EE5\u4E0D\u76F8\u7B49\u3002\n[] == false: true\uFF0C\u56E0\u5FFD\u7565\u7C7B\u578B\u7684\u4E0D\u540C\uFF0C\u8C03\u7528[]\u7684.toString()\u65B9\u6CD5\u8F6C\u4E3A\u7A7A\u5B57\u7B26\u4E32\"\"\uFF0C\u800C\u7A7A\u5B57\u7B26\u4E32\u88AB\u5F53\u4F5C\u57FA\u7840\u5E03\u5C14\u503C\u4F7F\u7528\u65F6\u4E3Afalse\uFF0C\u6240\u4EE5\u76F8\u7B49\u3002",
        zh_tw: "[] === false: false\uFF0C\u56E0typeof []\u70BAobject\uFF0C\u800Ctypeof false\u70BAboolean\uFF0C\u6240\u4EE5\u4E0D\u76F8\u7B49\u3002\n[] == false: true\uFF0C\u56E0\u5FFD\u7565\u985E\u578B\u7684\u4E0D\u540C\uFF0C\u547C\u53EB[]\u7684.toString()\u65B9\u6CD5\u8F49\u70BA\u7A7A\u5B57\u4E32\"\"\uFF0C\u800C\u7A7A\u5B57\u4E32\u88AB\u7576\u4F5C\u57FA\u790E\u5E03\u6797\u503C\u4F7F\u7528\u6642\u70BAfalse\uFF0C \u6240\u4EE5\u76F8\u7B49\u3002"
    };
    console.log("\n" + i18nMessage[i18n_ts_1.LANG]);
    std_ts_1.assertEqual(false, [] === false);
    std_ts_1.assertEqual(true, [] == false);
}
function displayBooleanValues(levelNo1, codeNo) {
    var i18nMessage = {
        en_us: 'Shows the type of boolean constants (true and false).',
        zh_cn: '显示布尔常量（true与false）的类型。',
        zh_tw: '顯示布林常數（true與false）的類型。'
    };
    console.log("\n" + levelNo1 + "." + ++codeNo + " " + i18nMessage[i18n_ts_1.LANG]);
    log_ts_1.logBoolValueAndType([true, false]);
    i18nMessage = {
        en_us: 'Displays the type of boolean variables (true and false).',
        zh_cn: '显示布尔变量（true与false）的类型。',
        zh_tw: '顯示布林變數（true與false）的類型。'
    };
    console.log("\n" + levelNo1 + "." + ++codeNo + " " + i18nMessage[i18n_ts_1.LANG]);
    var _a = [true, false], TRUE_VAR = _a[0], FALSE_VAR = _a[1];
    log_ts_1.logBoolValueAndType([TRUE_VAR, FALSE_VAR]);
    i18nMessage = {
        en_us: "Define constants TRUE and FALSE and assign values to true and false respectively.\nDefine the constant array BOOLEAN_ARRAY and assign values to [true, false, TRUE, FALSE].\nIf this array is traversed through a for loop, the loop variable (or constant) will be\nautomatically inferred as string type, and only string type or any type is allowed,\nand the value is a sequence of subscripts - this is different from other languages\nfor...in or for each...in displays its value directly.\nTypescript needs to traverse the array itself with forEach, which is usually used with lambda.\nA single item can be used to directly correspond to the element, or (item, index) can correspond\nto the element and subscript (numeric type) respectively.",
        zh_cn: "\u5B9A\u4E49\u5E38\u91CFTRUE\u3001FALSE\uFF0C\u5206\u522B\u8D4B\u503C\u4E3Atrue\u548Cfalse\u3002\n\u5B9A\u4E49\u5E38\u91CF\u6570\u7EC4BOOLEAN_ARRAY\uFF0C\u8D4B\u503C\u4E3A[true, false, TRUE, FALSE]\u3002\n\u5982\u901A\u8FC7for\u5FAA\u73AF\u904D\u5386\u8FD9\u4E2A\u6570\u7EC4\uFF0C\u5FAA\u73AF\u53D8\u91CF\uFF08\u6216\u5E38\u91CF\uFF09\u5C06\u88AB\u81EA\u52A8\u63A8\u65AD\u4E3Astring\u7C7B\u578B\uFF0C\u4E14\u4EC5\u5141\u8BB8string\u7C7B\u578B\u6216any\u7C7B\u578B\uFF0C\u503C\u4E3A\u4E0B\u6807\u5E8F\u5217\n\u2014\u2014\u8FD9\u4E0D\u540C\u4E8E\u5176\u5B83\u8BED\u8A00\u4EE5for...in\u6216for each...in\u76F4\u63A5\u663E\u793A\u5176\u503C\u3002\ntypescript\u9700\u8981\u4EE5\u6570\u7EC4\u81EA\u8EAB\u7684forEach\u6765\u904D\u5386\uFF0C\u901A\u5E38\u914D\u5408lambda\u4F7F\u7528\uFF0C\u53EF\u7528\u5355\u4E2Aitem\u76F4\u63A5\u5BF9\u5E94\u5143\u7D20\uFF0C\u6216(item, index)\u5206\u522B\u5BF9\u5E94\u5143\u7D20\u4E0E\u4E0B\u6807\uFF08\u6570\u5B57\u7C7B\u578B\uFF09\u3002",
        zh_tw: "\u5B9A\u7FA9\u5E38\u6578TRUE\u3001FALSE\uFF0C\u5206\u5225\u8CE6\u503C\u70BAtrue\u548Cfalse\u3002\n\u5B9A\u7FA9\u5E38\u6578\u6578\u7D44BOOLEAN_ARRAY\uFF0C\u8CE6\u503C\u70BA[true, false, TRUE, FALSE]\u3002\n\u5982\u900F\u904Efor\u8FF4\u5708\u904D\u6B77\u9019\u500B\u6578\u7D44\uFF0C\u5FAA\u74B0\u8B8A\u6578\uFF08\u6216\u5E38\u6578\uFF09\u5C07\u81EA\u52D5\u63A8\u65B7\u70BAstring\u985E\u578B\uFF0C\u4E14\u50C5\u5141\u8A31string\u985E\u578B\u6216any\u985E\u578B\uFF0C\u503C\u70BA\u4E0B\u6A19\u5E8F\u5217\n\u2014\u2014\u9019\u4E0D\u540C\u65BC\u5176\u5B83\u8A9E\u8A00\u4EE5for...in\u6216 for each...in\u76F4\u63A5\u986F\u793A\u5176\u503C\u3002\ntypescript\u9700\u8981\u4EE5\u9663\u5217\u672C\u8EAB\u7684forEach\u4F86\u904D\u6B77\uFF0C\u901A\u5E38\u914D\u5408lambda\u4F7F\u7528\uFF0C\u53EF\u7528\u55AE\u4E00item\u76F4\u63A5\u5C0D\u61C9\u5143\u7D20\uFF0C\u6216(item, index)\u5206\u5225\u5C0D\u61C9\u5143\u7D20\u8207\u4E0B\u6A19\uFF08\u6578\u5B57\u985E\u578B\uFF09\u3002"
    };
    console.log("\n" + levelNo1 + "." + ++codeNo + " " + i18nMessage[i18n_ts_1.LANG]);
    var TRUE = true;
    var FALSE = false;
    var BOOLEAN_ARRAY = [true, false, TRUE, FALSE];
    log_ts_1.logBoolIndexAndType(BOOLEAN_ARRAY);
    log_ts_1.logBoolValueAndType(BOOLEAN_ARRAY);
    log_ts_1.logBoolIndexAndTypeValueAndType(BOOLEAN_ARRAY);
    return codeNo;
}
function compareBooleanValuesAnd1Or0(levelNo1, codeNo) {
    var i18nMessage = {
        en_us: 'Compare true and 1, false and 0.',
        zh_cn: '对比true与1、false与0。',
        zh_tw: '對比true與1、false與0。'
    };
    console.log("\n" + levelNo1 + "." + ++codeNo + " " + i18nMessage[i18n_ts_1.LANG]);
    std_ts_1.assertNotEqual(true, 1);
    std_ts_1.assertNotEqual(true, 0);
    std_ts_1.assertNotEqual(false, 1);
    std_ts_1.assertNotEqual(false, 0);
    {
        log_ts_1.logNameAndValueTurple([
            ['!!(true === 1 as unknown as boolean)', !!(true === 1)],
            ['!!(true == 1 as unknown as boolean)', !!(true == 1)],
            ['!!(false === 0 as unknown as boolean)', !!(false === 0)],
            ['!!(false == 0 as unknown as boolean)', !!(false == 0)],
        ], [
            __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_DATA }),
            __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_TYPE, minLength: 8 }),
        ], function (item) { return item; }, function (item, headInfo) {
            var NAME = item[0], VALUE = item[1];
            return [
                NAME.padStart(headInfo[0].maxLength).concat(''.padStart(headInfo[1].maxLength - ("" + VALUE).length)),
                VALUE,
            ];
        });
    }
    return codeNo;
}
function convertValuesToBoolean(levelNo1, codeNo) {
    var i18nMessage = {
        en_us: "Forcibly convert other types of values to Boolean values, display their values, the results of two negations, and their types.",
        zh_cn: "\u5F3A\u884C\u8F6C\u5176\u5B83\u7C7B\u578B\u7684\u503C\u5230\u5E03\u5C14\u503C\uFF0C\u663E\u793A\u5176\u503C\u3001\u4E24\u6B21\u53D6\u53CD\u7ED3\u679C\uFF0C\u53CA\u5176\u7C7B\u578B\u3002",
        zh_tw: "\u5F37\u884C\u8F49\u5176\u5B83\u985E\u578B\u7684\u503C\u5230\u5E03\u6797\u503C\uFF0C\u986F\u793A\u5176\u503C\u3001\u5169\u6B21\u53D6\u53CD\u7D50\u679C\uFF0C\u53CA\u5176\u985E\u578B\u3002"
    };
    console.log("\n" + levelNo1 + "." + ++codeNo + " " + i18nMessage[i18n_ts_1.LANG]);
    {
        log_ts_1.logNameAndValueTurple([
            ['!!1', !!1],
            ['!!0', !!0],
            ['!!undefined', !!undefined],
            ['!!null', !!null],
            ["!!'test'", !!'test'],
            ["!!''", !!''],
            ['!!{}', !!{}],
            ['!![]', !![]],
            ['!!LanguageNames.en_us', !!i18n_ts_1.LanguageNames.en_us],
            ['!!LanguageNames.zh_cn', !!i18n_ts_1.LanguageNames.zh_cn],
            ['<boolean> <unknown> 1', 1],
            ['<boolean> <unknown> 0', 0],
            ['1 as unknown as boolean', 1],
            ['0 as unknown as boolean', 0],
            ['true === 1 as unknown as boolean', true === 1],
            ['true == 1 as unknown as boolean', true == 1],
            ['false === 0 as unknown as boolean', false === 0],
            ['false == 0 as unknown as boolean', false == 0],
            ['undefined as unknown as boolean', undefined],
            ['null as unknown as boolean', null],
            ["'test' as unknown as boolean", 'test'],
            ["'' as unknown as boolean", ''],
            ['{} as unknown as boolean', {}],
            ['[] as unknown as boolean', []],
            [
                'LanguageNames.en_us as unknown as boolean',
                i18n_ts_1.LanguageNames.en_us,
            ],
            [
                'LanguageNames.zh_cn as unknown as boolean',
                i18n_ts_1.LanguageNames.zh_cn,
            ],
        ], [
            __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_DATA }),
            __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_VALUE }),
            __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_BOOLEAN, minLength: 8 }),
            __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_TYPE, minLength: 10 }),
        ], function (item) {
            var NAME = item[0], VALUE = item[1];
            return [NAME, VALUE, !!VALUE, typeof VALUE];
        }, function (item, headInfo) {
            var NAME = item[0], VALUE = item[1], BOOLEAN = item[2], TYPE = item[3];
            return [
                NAME.padStart(headInfo[0].maxLength).concat(''.padStart(headInfo[1].maxLength - log_ts_1.getLengthOfUnknown(VALUE) -
                    (typeof VALUE === 'string' ? 2 : 0))),
                // typeof VALUE === 'string' ? `'${VALUE}'`: (!!VALUE && typeof VALUE === 'object' ? VALUE.valueOf(): `${VALUE}`),
                (typeof VALUE === 'string'
                    ? "'" + VALUE + "'"
                    : (!!VALUE && typeof VALUE === 'object'
                        ? JSON.stringify(VALUE)
                        : "" + VALUE)).concat(''.padStart(headInfo[2].maxLength - ("" + BOOLEAN).length)),
                BOOLEAN,
                TYPE.padStart(headInfo[3].maxLength),
            ];
        });
    }
    i18nMessage = {
        en_us: "------------------------------------ [Conclusion] ------------------------------------\nIf you want to convert other types of values to Boolean type, you cannot convert it through \"as unknown as boolean\", but you need to add '!!' in front of it.\nWhen using '!!' conversion, 0, undefined, null and empty strings will be converted to false, and the rest will be converted to true.",
        zh_cn: "\u3010\u7ED3\u8BBA\u3011\n\u5982\u679C\u60F3\u8F6C\u5176\u5B83\u7C7B\u578B\u7684\u503C\u5230\u5E03\u5C14\u7C7B\u578B\uFF0C\u4E0D\u80FD\u901A\u8FC7\u201C as unknown as boolean\u201D\u6765\u8F6C\u6362\uFF0C\u800C\u9700\u8981\u5728\u524D\u9762\u52A0\u201C!!\u201D\u6765\u8F6C\u6362\u3002\n\u4F7F\u7528\u201C!!\u201D\u8F6C\u6362\u65F6\uFF0C0\u3001undefined\u3001null\u548C\u7A7A\u5B57\u7B26\u4E32\u4F1A\u8F6C\u4E3Afalse\uFF0C\u5176\u4F59\u8F6Ctrue\u3002",
        zh_tw: "\u3010\u7D50\u8AD6\u3011\n\u5982\u679C\u60F3\u8F49\u5176\u5B83\u985E\u578B\u7684\u503C\u5230\u5E03\u6797\u985E\u578B\uFF0C\u4E0D\u80FD\u900F\u904E\u300C as unknown as boolean\u300D\u4F86\u8F49\u63DB\uFF0C\u800C\u9700\u8981\u5728\u524D\u9762\u52A0\u4E0A\u300C!!\u300D\u4F86\u8F49\u63DB\u3002\n\u4F7F\u7528\u300C!!\u300D\u8F49\u63DB\u6642\uFF0C0\u3001undefined\u3001null\u548C\u7A7A\u5B57\u4E32\u6703\u8F49\u70BAfalse\uFF0C\u5176\u9918\u8F49true\u3002"
    };
    console.log("" + i18nMessage[i18n_ts_1.LANG]);
    return codeNo;
}
function compareDoubleNotBooleanNewBoolean(levelNo1, codeNo) {
    var i18nMessage = {
        en_us: "Compare: !!, Boolean() and new Boolean().",
        zh_cn: "\u5BF9\u6BD4\uFF1A!!\u3001Boolean()\u4E0Enew Boolean()\u3002",
        zh_tw: "\u5C0D\u6BD4\uFF1A!!\u3001Boolean()\u8207new Boolean()\u3002"
    };
    console.log("\n" + levelNo1 + "." + ++codeNo + " " + i18nMessage[i18n_ts_1.LANG]);
    {
        log_ts_1.logNameAndValueTurple([
            ['1', 1],
            ['0', 0],
            ['-0', -0],
            ['NaN', NaN],
            ['Infinity', Infinity],
            ['undefined', undefined],
            ['null', null],
            ['0n', 0n],
            ["'test'", 'test'],
            ["''", ''],
            ['{}', {}],
            ['[]', []],
            ['Symbol()', Symbol()],
            ['(()=>{})', function () { }],
            ['(function(){})', function () { }],
            ['LanguageNames.en_us', i18n_ts_1.LanguageNames.en_us],
            ['LanguageNames.zh_cn', i18n_ts_1.LanguageNames.zh_cn],
        ], [
            __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_DATA }),
            __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: '!!', minLength: 8 }),
            __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: 'Boolean()', minLength: 16 }),
            __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: 'new Boolean()', minLength: 18 }),
            __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: 'new Boolean().valueOf()', minLength: 23 }),
            __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: '!!(new Boolean())', minLength: 17 }),
        ], function (item) {
            var NAME = item[0], VALUE = item[1];
            return [
                NAME,
                !!VALUE,
                Boolean(VALUE),
                new Boolean(VALUE),
                new Boolean(VALUE).valueOf(),
                !!(new Boolean(VALUE)),
            ];
        }, function (item, headInfo) {
            var NAME = item[0], VALUE = item[1], BOOLEAN = item[2], NEW_BOOLEAN = item[3], NEW_BOOLEAN_VALUE_OF = item[4], NEW_BOOLEAN_VALUE = item[5];
            return [
                NAME.padStart(headInfo[0].maxLength).concat(''.padStart(headInfo[1].maxLength - ("" + VALUE).length)),
                VALUE,
                ''.padStart(headInfo[2].maxLength - 1 - BOOLEAN.toString().length),
                BOOLEAN,
                // ''.padStart(headInfo[3].maxLength - 1 - `${NEW_BOOLEAN_VALUE}`.toString().length),
                // NEW_BOOLEAN_VALUE,
                // ''.padStart(headInfo[3].maxLength - 1 - `${NEW_BOOLEAN}`.length),
                // ''.padStart(headInfo[3].maxLength - 1 - `${NEW_BOOLEAN}`.length - (typeof NEW_BOOLEAN === 'object' ? 11 : 0)),
                ''.padStart(headInfo[3].maxLength - 1 - ("" + NEW_BOOLEAN).length -
                    (NEW_BOOLEAN instanceof Boolean ? 11 : 0)),
                NEW_BOOLEAN,
                ''.padStart(headInfo[4].maxLength - 1 -
                    NEW_BOOLEAN_VALUE_OF.toString().length),
                NEW_BOOLEAN_VALUE_OF,
                ''.padStart(headInfo[5].maxLength - 1 - (!!NEW_BOOLEAN_VALUE).toString().length),
                !!NEW_BOOLEAN_VALUE,
            ];
        });
    }
    return codeNo;
}
