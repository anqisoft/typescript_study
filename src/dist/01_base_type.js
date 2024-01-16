/*
 * Copyright (c) 2023 anqisoft@gmail.com
 * 01_base_type.ts
 *
 * <en_us>
 * Created on Sat Dec 16 2023 16:04:44
 * Feature: Demonstrates typescript basic types.
 * </en_us>
 *
 * <zh_cn>
 * 创建：2023年12月16日 16:04:44
 * 功能：演示typescript基础类型。
 * </zh_cn>
 *
 * <zh_tw>
 * 創建：2023年12月16日 16:04:44
 * 功能：演示typescript基礎類型。
 * </zh_tw>
 */
'use strict';
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
var i18n_ts_1 = require("./i18n.ts");
var log_ts_1 = require("./log.ts");
var boolean_ts_1 = require("./01_base_type/boolean.ts");
var number_ts_1 = require("./01_base_type/number.ts");
function compareSomeValues(levelNo1) {
    console.log("\n" + levelNo1 + ". compareSomeValues()");
    console.log({
        en_us: "Compare some values that look the same.",
        zh_cn: "\u6BD4\u8F83\u4E00\u4E9B\u770B\u8D77\u6765\u76F8\u540C\u7684\u503C\u3002",
        zh_tw: "\u6BD4\u8F03\u4E00\u4E9B\u770B\u8D77\u4F86\u76F8\u540C\u7684\u503C\u3002"
    }[i18n_ts_1.LANG]);
    log_ts_1.logNameAndValueTurple([
        [1, 1],
        [0, 0],
        [-0, -0],
        [NaN, NaN],
        [Infinity, Infinity],
        [undefined, undefined],
        [null, null],
        [0n, 0n],
        ['test', 'test'],
        ['', ''],
        [{}, {}],
        [[], []],
        [Symbol(), Symbol()],
        [function () { }, function () { }],
        [function () { }, function () { }],
        [i18n_ts_1.LanguageNames.en_us, i18n_ts_1.LanguageNames.en_us],
        [i18n_ts_1.LanguageNames.zh_cn, i18n_ts_1.LanguageNames.zh_cn],
        [true, true],
        [false, false],
        [new Boolean(true), new Boolean(true)],
        [new Boolean(false), new Boolean(false)],
    ].map(function (item) { return [item[0], item[1]]; }), [
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: 'a' }),
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: 'b' }),
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: 'a === b', minLength: 8 }),
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: 'a == b', minLength: 8 }),
        __assign(__assign({}, log_ts_1.DEFAULT_HEADINFO), { title: '!!a', minLength: 8 }),
    ], function (item) {
        var _a = item, A = _a[0], B = _a[1];
        // return [A, B, A === B, A == B, !!A === !!B];
        return [A, B, A === B, A == B, !!A];
    }, function (item, headInfo) {
        var _a = item, A = _a[0], B = _a[1], STRICT_EQUALITY = _a[2], EQUALITY = _a[3], DOUBLE_NOT = _a[4];
        // const VALUE = typeof A === 'symbol' ? 'Symbol()' : `${A}`;
        var VALUE = log_ts_1.getFriendlyTitle(A);
        return [
            // `${A}`.padStart(headInfo[0].maxLength),
            // `${B}`.padStart(headInfo[1].maxLength),
            VALUE.padStart(headInfo[0].maxLength),
            VALUE.padStart(headInfo[1].maxLength),
            ''.padStart(headInfo[2].maxLength - 1 - (STRICT_EQUALITY + '').length),
            STRICT_EQUALITY,
            ''.padStart(headInfo[3].maxLength - 1 - (EQUALITY + '').length),
            EQUALITY,
            ''.padStart(headInfo[4].maxLength - 1 - (DOUBLE_NOT + '').length),
            DOUBLE_NOT,
        ];
    });
}
function displayTypeofValues(levelNo1) {
    // bigint boolean function number object string symbol undefined
}
/*
    <en_us>Test in sequence.</en_us>
    <zh_cn>按序测试。</zh_cn>
    <zh_tw>按序測試。</zh_tw>
*/
(function () {
    var levelNo1 = 0;
    [
        boolean_ts_1.studyBooleanTypes,
        number_ts_1.studyNumberTypes,
        compareSomeValues,
    ].forEach(function (f) {
        try {
            f(++levelNo1);
        }
        catch (error) {
            console.error(error);
        }
    });
})();
