"use strict";
/*
 * Copyright (c) 2023 anqisoft@gmail.com
 * number.ts
 *
 * <en_us>
 * Created on Wed Dec 20 2023 15:06:39
 * Feature:
 * </en_us>
 *
 * <zh_cn>
 * 创建：2023年12月20日 15:06:39
 * 功能：
 * </zh_cn>
 *
 * <zh_tw>
 * 創建：2023年12月20日 15:06:39
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
exports.studyNumberTypes = void 0;
var std_ts_1 = require("../std.ts");
var i18n_ts_1 = require("../i18n.ts");
var log_ts_1 = require("../log.ts");
/**
 * <en_us>Study number types</en_us>
 * <zh_cn>研究数字类型</zh_cn>
 * <zh_tw>研究數字類型</zh_tw>
 */
function studyNumberTypes(levelNo1) {
    /*
        <en_us>see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number</en_us>
        <zh_cn>请参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number</zh_cn>
        <zh_tw>請參考：https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Number</zh_tw>
    */
    console.log("\n" + levelNo1 + ". studyNumberTypes()");
    // showConvertErrors();
    // logSomeNumbers();
    compareSomeNumbers();
    var codeNo = 0;
    codeNo = showSpecialNumbers(levelNo1, codeNo);
    codeNo = convertOtherTypeValuesToNumber(levelNo1, codeNo);
    codeNo = tryParseIntAndParseFloat(levelNo1, codeNo);
    codeNo = tryIsNaNAndIsFinite(levelNo1, codeNo);
    codeNo = showNumberStaticProperties(levelNo1, codeNo);
}
exports.studyNumberTypes = studyNumberTypes;
function showConvertErrors() {
    // Ok
    {
        var BIGINT = Number(10n);
        console.log(BIGINT);
    }
    // TypeError: Cannot convert a Symbol value to a number
    try {
        var SYMBOL = Number(Symbol());
        console.log(SYMBOL);
    }
    catch (error) {
        console.error(error);
    }
    // TypeError: Cannot convert a BigInt value to a number
    try {
        var BIGINT = +10n;
        console.log(BIGINT);
    }
    catch (error) {
        console.error(error);
    }
    // TypeError: Cannot convert a Symbol value to a number
    try {
        var SYMBOL = +Symbol();
        console.log(SYMBOL);
    }
    catch (error) {
        console.error(error);
    }
}
/** */
function logSomeNumbers() {
    console.log(2, 16434824, 9876543210, 0xFEDCBA9876543210);
    console.log(NaN, Infinity, Number.MIN_VALUE, Number.MIN_SAFE_INTEGER, Number.MAX_VALUE, Number.MAX_SAFE_INTEGER);
    console.log(Math.E, Math.LN10, Math.LN2, Math.LOG2E);
    console.log(Math.LOG10E, Math.PI, Math.SQRT1_2, Math.SQRT2);
}
function compareSomeNumbers() {
    // 255
    std_ts_1.assertEqualAll(255, 255.0, 0xff, 255, 0.255e3);
    // 10
    std_ts_1.assertEqualAll(10, 10.0, 0xa, 10, 10, 1e1);
}
function showSpecialNumbers(levelNo1, codeNo) {
    var i18nMessage = {
        en_us: "Display special values:",
        zh_cn: "\u663E\u793A\u7279\u6B8A\u503C\uFF1A",
        zh_tw: "\u986F\u793A\u7279\u6B8A\u503C\uFF1A"
    };
    console.log("\n" + levelNo1 + "." + ++codeNo + " " + i18nMessage[i18n_ts_1.LANG]);
    log_ts_1.logDataAndValue([
        ['0b10', 2],
        ['0o76543210', 16434824],
        ['9876543210', 9876543210],
        ['0xFEDCBA9876543210', 0xFEDCBA9876543210],
        ['Number.MIN_VALUE', Number.MIN_VALUE],
        ['Number.MIN_SAFE_INTEGER', Number.MIN_SAFE_INTEGER],
        ['Number.MAX_VALUE', Number.MAX_VALUE],
        ['Number.MAX_SAFE_INTEGER', Number.MAX_SAFE_INTEGER],
        ['NaN', NaN],
        ['Infinity', Infinity],
        ['-Infinity', -Infinity],
        ['Math.E', Math.E],
        ['Math.LN10', Math.LN10],
        ['Math.LN2', Math.LN2],
        ['Math.LOG2E', Math.LOG2E],
        ['Math.LOG10E', Math.LOG10E],
        ['Math.PI', Math.PI],
        ['Math.SQRT1_2', Math.SQRT1_2],
        ['Math.SQRT2', Math.SQRT2],
    ]);
    return codeNo;
}
function convertOtherTypeValuesToNumber(levelNo1, codeNo) {
    var i18nMessage = {
        en_us: "Convert values from other types to numeric types.",
        zh_cn: "\u4ECE\u5176\u5B83\u7C7B\u578B\u7684\u503C\u8F6C\u6570\u5B57\u7C7B\u578B\u3002",
        zh_tw: "\u5F9E\u5176\u5B83\u985E\u578B\u7684\u503C\u8F49\u6578\u5B57\u985E\u578B\u3002"
    };
    console.log("\n" + levelNo1 + "." + ++codeNo + " " + i18nMessage[i18n_ts_1.LANG]);
    var number_var = 0;
    // Type 'undefined' is not assignable to type 'number'.deno-ts(2322)
    // number_var = undefined;
    // number_var = void(0);
    // number_var = void;
    //Type 'null' is not assignable to type 'number'.deno-ts(2322)
    // number_var = null;
    // Type 'never[]' is not assignable to type 'number'.deno-ts(2322)
    // number_var = [];
    // Type '{}' is not assignable to type 'number'.deno-ts(2322)
    // number_var = {};
    // Type 'string' is not assignable to type 'number'.deno-ts(2322)
    // number_var = '0';
    // Type 'string' is not assignable to type 'number'.deno-ts(2322)
    // number_var = '1';
    number_var = i18n_ts_1.LanguageNames.en_us;
    std_ts_1.assertEqual(number_var, 0);
    number_var = i18n_ts_1.LanguageNames.zh_cn;
    std_ts_1.assertEqual(number_var, 1);
    number_var = i18n_ts_1.LanguageNames.zh_tw;
    std_ts_1.assertEqual(number_var, 2);
    // Number(Symbol()) => TypeError: Cannot convert a Symbol value to a number
    var NAME_AND_VALUE_ARRAY = [
        ["'0'", '0'],
        ["'1'", '1'],
        ["'0b10'", '0b10'],
        ["'0o10'", '0o10'],
        ["'0x10'", '0x10'],
        ['true', true],
        ['false', false],
        ['undefined', undefined],
        ['null', null],
        ['{}', {}],
        ['[]', []],
        ['LanguageNames.en_us', i18n_ts_1.LanguageNames.en_us],
        ['LanguageNames.zh_cn', i18n_ts_1.LanguageNames.zh_cn],
        ['LanguageNames.zh_tw', i18n_ts_1.LanguageNames.zh_tw],
        ["'      123      \\n    '", '      123      \n    '],
        ["''", ''],
        ["'   '", '   '],
        ["'1,234'", '1,234'],
        ["'+123'", '+123'],
        ["'-123'", '-123'],
        ["'++123'", '++123'],
        ["'--123'", '--123'],
        ["'+ 123'", '+ 123'],
        ["'- 123'", '- 123'],
        ['NaN', NaN],
        ['Infinity', Infinity],
        ['-Infinity', -Infinity],
        ["'0123'", '0123'],
        ['10n', 10n],
    ];
    log_ts_1.logDataAndValue(NAME_AND_VALUE_ARRAY.map(function (item) {
        var NAME = item[0];
        var value = item[1];
        return [NAME, Number(value)];
    }));
    NAME_AND_VALUE_ARRAY.pop();
    log_ts_1.logNameAndValueTurple(NAME_AND_VALUE_ARRAY, [
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: 'v' }),
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: '+v' }),
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: 'Number(v)', minLength: 12 }),
    ], 
    // (item: NameAndValueTurple) => {
    // 	const [NAME, VALUE] = item as NameAndValueTurple;
    // 	return [NAME, +(VALUE as number), Number(VALUE), VALUE];
    // },
    // (item: Array<unknown>, headInfo: HeadInfoArray) => {
    // 	const [NAME, ADD_VALUE, NUMBER, VALUE] = item as [
    // 		string,
    // 		number,
    // 		number,
    // 		unknown,
    // 	];
    // 	const TITLE = getFriendlyTitle(VALUE);
    // 	return [
    // 		TITLE.padStart(headInfo[0].maxLength),
    // 		ADD_VALUE.toString().padStart(headInfo[1].maxLength),
    // 		NUMBER.toString().padStart(headInfo[2].maxLength),
    // 	];
    // },
    function (item) {
        var _a = item, NAME = _a[0], VALUE = _a[1];
        return [NAME, +VALUE, Number(VALUE)];
    }, function (item, headInfo) {
        var _a = item, NAME = _a[0], ADD_VALUE = _a[1], NUMBER = _a[2];
        return [
            NAME.padStart(headInfo[0].maxLength),
            ADD_VALUE.toString().padStart(headInfo[1].maxLength),
            NUMBER.toString().padStart(headInfo[2].maxLength),
        ];
    });
    return codeNo;
}
function tryParseIntAndParseFloat(levelNo1, codeNo) {
    var i18nMessage = {
        en_us: "Test parseInt(string: string, radix?: number)",
        zh_cn: "\u6D4B\u8BD5parseInt(string: string, radix?: number)",
        zh_tw: "\u6E2C\u8A66parseInt(string: string, radix?: number)"
    };
    console.log("\n" + levelNo1 + "." + ++codeNo + " " + i18nMessage[i18n_ts_1.LANG]);
    var PARSE_INT_FROM = '10';
    var RADIX_ARRAY = [];
    for (var i = 2; i <= 36; ++i) {
        RADIX_ARRAY.push(i);
    }
    log_ts_1.logDataAndValue(RADIX_ARRAY.map(function (index) { return ["parseInt('" + PARSE_INT_FROM + "', " + index + ")", parseInt(PARSE_INT_FROM, index)]; }));
    var FROM_stringArray = [
        '0.0',
        '1.0',
        '10',
        '0x10',
        '0o10',
        '0b10',
        'undefined',
        'null',
        'true',
        'false',
    ];
    log_ts_1.logDataAndValue(FROM_stringArray.map(function (from) { return ["parseInt('" + from + "')", parseInt(from)]; }));
    i18nMessage = {
        en_us: "Test parseFloat(string: string)",
        zh_cn: "\u6D4B\u8BD5parseFloat(string: string)",
        zh_tw: "\u6E2C\u8A66parseFloat(string: string)"
    };
    console.log("\n" + levelNo1 + "." + ++codeNo + " " + i18nMessage[i18n_ts_1.LANG]);
    log_ts_1.logDataAndValue(FROM_stringArray.map(function (from) { return ["parseFloat('" + from + "')", parseFloat(from)]; }));
    return codeNo;
}
function tryIsNaNAndIsFinite(levelNo1, codeNo) {
    var i18nMessage = {
        en_us: "Test isNaN(number: number) and isFinite(number: number)",
        zh_cn: "\u6D4B\u8BD5isNaN(number: number)\u548CisFinite(number: number)",
        zh_tw: "\u6E2C\u8A66isNaN(number: number)\u548CisFinite(number: number)"
    };
    console.log("\n" + levelNo1 + "." + ++codeNo + " " + i18nMessage[i18n_ts_1.LANG]);
    log_ts_1.logNameAndValueTurple([
        0,
        1,
        true,
        false,
        null,
        Infinity,
        NaN,
        undefined,
    ].map(function (item) { return ["" + item, item]; }), [
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: 'v' }),
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: 'isNaN(v)', minLength: 11 }),
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: '', notPadStart: true }),
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: 'isFinite(v)', minLength: 11 }),
    ], function (item) {
        var NAME = item[0], VALUE = item[1];
        return [NAME, isNaN(VALUE), isFinite(VALUE)];
    }, function (item, headInfo) {
        var NAME = item[0], IS_NAN_VALUE = item[1], IS_FINITE_VALUE = item[2];
        return [
            NAME.padStart(headInfo[0].maxLength).concat(''.padStart(headInfo[1].maxLength - ("" + IS_NAN_VALUE).length)),
            IS_NAN_VALUE,
            ''.padStart(headInfo[3].maxLength - 1 - ("" + IS_FINITE_VALUE).length),
            IS_FINITE_VALUE,
        ];
    });
    return codeNo;
}
function showNumberStaticProperties(levelNo1, codeNo) {
    // // [
    // Number.EPSILON;
    // Number.POSITIVE_INFINITY;
    // // ]
    var i18nMessage = {
        en_us: "",
        zh_cn: "\u663E\u793ANumber\u7C7B\u578B\u7684\u9759\u6001\u5C5E\u6027",
        zh_tw: ""
    };
    console.log("\n" + levelNo1 + "." + ++codeNo + " " + i18nMessage[i18n_ts_1.LANG]);
    log_ts_1.logNameAndValueTurple([
        Number.prototype,
        Number.EPSILON,
        Number.MAX_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
        Number.MAX_VALUE,
        Number.MIN_VALUE,
        Number.NaN,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY,
    ].map(function (item) { return ["" + item, item]; }), [
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_DATA }),
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_VALUE }),
    ], function (item) {
        var NAME = item[0], VALUE = item[1];
        return [NAME, isNaN(VALUE), isFinite(VALUE)];
    }, function (item, headInfo) {
        var NAME = item[0], IS_NAN_VALUE = item[1], IS_FINITE_VALUE = item[2];
        return [
            NAME.padStart(headInfo[0].maxLength).concat(''.padStart(headInfo[1].maxLength - ("" + IS_NAN_VALUE).length)),
            IS_NAN_VALUE,
            ''.padStart(headInfo[3].maxLength - 1 - ("" + IS_FINITE_VALUE).length),
            IS_FINITE_VALUE,
        ];
    });
    return codeNo;
}
