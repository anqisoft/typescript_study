/*
 * Copyright (c) 2023 anqisoft@gmail.com
 * log.ts
 *
 * <en_us>
 * Created on Tue Dec 19 2023 13:59:46
 * Feature:
 * </en_us>
 *
 * <zh_cn>
 * 创建：2023年12月19日 13:59:46
 * 功能：
 * </zh_cn>
 *
 * <zh_tw>
 * 創建：2023年12月19日 13:59:46
 * 功能：
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
exports.getFriendlyTitle = exports.logDataAndValue = exports.logBoolIndexAndTypeValueAndType = exports.logBoolValueAndType = exports.logBoolIndexAndType = exports.getLengthOfUnknown = exports.logNameAndValueTurple = exports.DEFAULT_HEADINFO = void 0;
var i18n_ts_1 = require("./i18n.ts");
exports.DEFAULT_HEADINFO = {
    title: '',
    chineseCharCount: 0,
    minLength: 0,
    maxLength: 0,
    notPadStart: false
};
function logNameAndValueTurple(nameAndValueTurple, headInfo, parseDataFunc, parseOutDataFunc) {
    var DATA_ARRAY = nameAndValueTurple.map(function (item) { return parseDataFunc(item); });
    headInfo.forEach(function (head, head_index) {
        head.chineseCharCount = i18n_ts_1.getChineseCharCount(head.title);
        if (!head.notPadStart) {
            var maxLength_1 = Math.max(head.minLength, head.title.length - head.chineseCharCount);
            DATA_ARRAY.forEach(function (row) {
                var VALUE = row[head_index];
                // 'Symbol()'.length => 8
                maxLength_1 = Math.max(maxLength_1, typeof VALUE === 'symbol'
                    ? 8
                    : (VALUE instanceof Boolean
                        ? 14 + (VALUE.valueOf() ? 4 : 5)
                        : ("" + row[head_index]).length));
            });
            head.maxLength = maxLength_1;
        }
    });
    console.log.apply(console, headInfo.map(function (head) {
        return head.notPadStart
            ? head.title
            : head.title.padStart(head.maxLength - head.chineseCharCount);
    }));
    DATA_ARRAY.map(function (item) { return parseOutDataFunc(item, headInfo); }).forEach(function (array) {
        return console.log.apply(console, array);
    });
}
exports.logNameAndValueTurple = logNameAndValueTurple;
function getLengthOfUnknown(value) {
    return ((value && typeof value === 'object') ? JSON.stringify(value) : "" + value).length;
}
exports.getLengthOfUnknown = getLengthOfUnknown;
function logBoolIndexAndType(values) {
    logNameAndValueTurple(values.map(function (item, index) { return [index.toString(), item]; }), [
        __assign(__assign({}, exports.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_INDEX, minLength: 6 }),
        __assign(__assign({}, exports.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_TYPE, minLength: 8 }),
    ], function (item) { return item; }, function (item, headInfo) {
        var INDEX = (item[0] * 1);
        var TYPE = typeof INDEX;
        return [
            ''.padStart(headInfo[0].maxLength - 1 - (INDEX + '').length),
            INDEX,
            ''.padStart(headInfo[1].maxLength - 1 - (TYPE + '').length),
            TYPE,
        ];
    });
}
exports.logBoolIndexAndType = logBoolIndexAndType;
function logBoolValueAndType(values) {
    logNameAndValueTurple(values.map(function (item) { return ["" + item, item]; }), [
        __assign(__assign({}, exports.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_VALUE, minLength: 6 }),
        __assign(__assign({}, exports.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_TYPE, minLength: 8 }),
    ], function (item) { return item; }, function (item, headInfo) {
        var VALUE = item[1];
        var TYPE = typeof VALUE;
        return [
            // VALUE ? ' ': '',
            ''.padStart(headInfo[0].maxLength - 1 - (VALUE + '').length),
            VALUE,
            ''.padStart(headInfo[1].maxLength - 1 - (TYPE + '').length),
            TYPE,
        ];
    });
}
exports.logBoolValueAndType = logBoolValueAndType;
function logBoolIndexAndTypeValueAndType(values) {
    logNameAndValueTurple(values.map(function (item, index) { return [index.toString(), item]; }), [
        __assign(__assign({}, exports.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_INDEX, minLength: 6 }),
        __assign(__assign({}, exports.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_TYPE, minLength: 8 }),
        __assign(__assign({}, exports.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_VALUE, minLength: 6 }),
        __assign(__assign({}, exports.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_TYPE, minLength: 8 }),
    ], function (item) { return item; }, function (item, headInfo) {
        var INDEX = (item[0] * 1);
        var INDEX_TYPE = typeof INDEX;
        var VALUE = item[1];
        var VALUE_TYPE = typeof VALUE;
        return [
            ''.padStart(headInfo[0].maxLength - 1 - (INDEX + '').length),
            INDEX,
            ''.padStart(headInfo[1].maxLength - 1 - (INDEX_TYPE + '').length),
            INDEX_TYPE,
            ''.padStart(headInfo[2].maxLength - 1 - (VALUE + '').length),
            VALUE,
            ''.padStart(headInfo[3].maxLength - 1 - (VALUE_TYPE + '').length),
            VALUE_TYPE,
        ];
    });
}
exports.logBoolIndexAndTypeValueAndType = logBoolIndexAndTypeValueAndType;
function logDataAndValue(source) {
    logNameAndValueTurple(source, [
        __assign(__assign({}, exports.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_DATA }),
        __assign(__assign({}, exports.DEFAULT_HEADINFO), { title: i18n_ts_1.I18N_COLUMN_NAME_VALUE }),
    ], function (item) { return item; }, function (item, headInfo) {
        var NAME = item[0], VALUE = item[1];
        return [
            NAME.padStart(headInfo[0].maxLength).concat(''.padStart(headInfo[1].maxLength - getLengthOfUnknown(VALUE))),
            VALUE,
        ];
    });
}
exports.logDataAndValue = logDataAndValue;
function getFriendlyTitle(data) {
    // bigint boolean function number object string symbol undefined
    //  boolean function number object   undefined
    switch (typeof data) {
        case 'symbol':
            return 'Symbol()';
        case 'string':
            return "'" + data + "'";
        case 'bigint':
            return data + "n";
        case 'object':
            if (data instanceof Boolean) {
                return "new Boolean(" + data.valueOf() + ")";
            }
            return JSON.stringify(data);
        default:
            return "" + data;
    }
}
exports.getFriendlyTitle = getFriendlyTitle;
