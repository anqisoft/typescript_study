/*
 * Copyright (c) 2023 anqisoft@gmail.com
 * std.ts
 *
 * <en_us>
 * Created on Sat Dec 16 2023 22:26:08
 * Feature:
 * </en_us>
 *
 * <zh_cn>
 * 创建：2023年12月16日 22:26:08
 * 功能：
 * </zh_cn>
 *
 * <zh_tw>
 * 創建：2023年12月16日 22:26:08
 * 功能：
 * </zh_tw>
 */
'use strict';
exports.__esModule = true;
exports.showPropertiesExcludeDuplicateFunctionsRecursion = exports.showPropertiesRecursion = exports.getStringArrayMaxLength = exports.getColumnsMaxLength = exports.getFirstColumnMaxLength = exports.assertEqualAll = exports.assertNotEqual = exports.assertEqual = exports.assert = void 0;
var i18n_ts_1 = require("./i18n.ts");
/**
 * <en_us>Check whether the condition is true, and throw an exception if it is not true. Derived from rust.</en_us>
 * <zh_cn>检查条件是否成立，若不成立则抛出异常。源于rust。</zh_cn>
 * <zh_tw>檢查條件是否成立，若不成立則拋出異常。源於rust。</zh_tw>
 *
 * @param condition
 * <en_us>Conditions to be tested.</en_us>
 * <zh_cn>需检测的条件。</zh_cn>
 * <zh_tw>需檢測的條件。</zh_tw>
 *
 * @param message
 * <en_us>The content displayed when an exception is thrown when the condition is not met.
 * If this parameter is omitted, "Condition is false" is displayed.</en_us>
 * <zh_cn>当条件不成立时抛出异常所显示的内容，若省略此参数，显示”条件不成立”。</zh_cn>
 * <zh_tw>當條件不成立時拋出異常所顯示的內容，若省略此參數，顯示「條件不成立」。</zh_tw>
 */
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "" + i18n_ts_1.I18N_ERROR_FLAG + i18n_ts_1.I18N_ERROR_CONDITION_NOT_MET);
    }
}
exports.assert = assert;
/**
 * <en_us>Compares two items and throws an exception if they are not exactly equal. Derived from rust.</en_us>
 * <zh_cn>对比两项，如非完全相等则抛出异常。源于rust。</zh_cn>
 * <zh_tw>對比兩項，如非完全相等則拋出異常。源於rust。</zh_tw>
 *
 * @param a
 * <en_us>The first item to compare.</en_us>
 * <zh_cn>要比较的第一项。</zh_cn>
 * <zh_tw>要比較的第一項。</zh_tw>
 *
 * @param b
 * <en_us>The second item to compare.</en_us>
 * <zh_cn>要比较的第二项。</zh_cn>
 * <zh_tw>要比較的第二項。</zh_tw>
 *
 * @param message
 * <en_us>When the two items being compared are not completely equal, an exception is thrown.
 * If this parameter is omitted, "${a} !== ${b}" will be displayed.</en_us>
 * <zh_cn>当所比较的两项不完全相等时，抛出异常所显示的内容，若省略此参数，显示“${a} !== ${b}”。</zh_cn>
 * <zh_tw>當所比較的兩項不完全相等時，拋出異常所顯示的內容，若省略此參數，顯示「${a} !== ${b}」。</zh_tw>
 */
// deno-lint-ignore no-explicit-any
function assertEqual(a, b, message) {
    if (a !== b) {
        throw new Error(message || "" + i18n_ts_1.I18N_ERROR_FLAG + a + " === " + b + i18n_ts_1.I18N_ERROR_POSTFIX);
    }
}
exports.assertEqual = assertEqual;
/**
 * <en_us>Compares two items and throws an exception if they are exactly equal. Derived from rust.</en_us>
 * <zh_cn>对比两项，如完全相等则抛出异常。源于rust。</zh_cn>
 * <zh_tw>對比兩項，如完全相等則拋出異常。源於rust。</zh_tw>
 *
 * @param a
 * <en_us>The first item to compare.</en_us>
 * <zh_cn>要比较的第一项。</zh_cn>
 * <zh_tw>要比較的第一項。</zh_tw>
 *
 * @param b
 * <en_us>The second item to compare.</en_us>
 * <zh_cn>要比较的第二项。</zh_cn>
 * <zh_tw>要比較的第二項。</zh_tw>
 *
 * @param message
 * <en_us>When the two items being compared are completely equal, an exception is thrown.
 * If this parameter is omitted, "${a} === ${b}" will be displayed.</en_us>
 * <zh_cn>当所比较的两项不完全相等时，抛出异常所显示的内容，若省略此参数，显示“${a} === ${b}”。</zh_cn>
 * <zh_tw>當所比較的兩項不完全相等時，拋出異常所顯示的內容，若省略此參數，顯示「${a} === ${b}」。</zh_tw>
 */
// deno-lint-ignore no-explicit-any
function assertNotEqual(a, b, message) {
    if (a === b) {
        throw new Error(message || "" + i18n_ts_1.I18N_ERROR_FLAG + a + " !== " + b + i18n_ts_1.I18N_ERROR_POSTFIX);
    }
}
exports.assertNotEqual = assertNotEqual;
/**
 * <en_us>Compare the expected value with all check items. If all check items are equal to the expected value, it is successful. Otherwise, the expected value and the serial numbers and values of the items that are not equal are listed.</en_us>
 * <zh_cn>对比期望值和所有检查项，如果所有检查项全等于期望值则成功，否则列出期望值、不全等的项的序号及值。</zh_cn>
 * <zh_tw>比較期望值及所有檢查項，若所有檢查項全等於期望值則成功，否則列出期望值、不全等的項的序號及值。</zh_tw>
 *
 * @param expected
 * <en_us>Expected value, all checked items are expected to be equal to this.</en_us>
 * <zh_cn>期望值，期望所有检查项都全等于此项。</zh_cn>
 * <zh_tw>要比較的第一項。</zh_tw>
 *
 * @param values
 * <en_us>All items to be compared.</en_us>
 * <zh_cn>所有需比较的项。</zh_cn>
 * <zh_tw>所有需比較的項。</zh_tw>
 */
// deno-lint-ignore no-explicit-any
function assertEqualAll(expected) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var message = '';
    var count = 0;
    values.forEach(function (value, index) {
        if (expected !== value) {
            message += "\n" + (2 + index) + ". " + value;
            count += 1;
        }
    });
    if (count) {
        throw new Error("" + count + i18n_ts_1.I18N_NOT_SAME_ITEM_COUNT_POSTFIX + "\n" + i18n_ts_1.I18N_EXPECTED_VALUE + expected + message);
    }
}
exports.assertEqualAll = assertEqualAll;
function getFirstColumnMaxLength(nameAndValueTurple) {
    var maxLength = 0;
    nameAndValueTurple.map(function (item) { return item[0].length; }).forEach(function (length) {
        maxLength = Math.max(length, maxLength);
    });
    return maxLength;
}
exports.getFirstColumnMaxLength = getFirstColumnMaxLength;
function getColumnsMaxLength(nameAndValueTurple, firstColumnMinLength, secondColumnMinLength) {
    var firstColumnMaxLength = firstColumnMinLength;
    var secondColumnMaxLength = secondColumnMinLength;
    nameAndValueTurple.forEach(function (item) {
        var NAME = item[0], VALUE = item[1];
        firstColumnMaxLength = Math.max(NAME.length, firstColumnMaxLength);
        secondColumnMaxLength = Math.max(("" + VALUE).length, secondColumnMaxLength);
    });
    return [firstColumnMaxLength, secondColumnMaxLength];
}
exports.getColumnsMaxLength = getColumnsMaxLength;
function getStringArrayMaxLength(stringArray) {
    var maxLength = 0;
    stringArray.map(function (item) { return item.length; }).forEach(function (length) {
        maxLength = Math.max(length, maxLength);
    });
    return maxLength;
}
exports.getStringArrayMaxLength = getStringArrayMaxLength;
// /*
//     <en_us>test</en_us>
//     <zh_cn>测试</zh_cn>
//     <zh_tw>測試</zh_tw>
// */
// (() => {
// 	try {
// 		assert(1 === 1);
// 	} catch (error) {
// 		console.error(error);
// 	}
// 	try {
// 		assertEqual(1, 1);
// 	} catch (error) {
// 		console.error(error);
// 	}
// 	try {
// 		assertNotEqual(1, 2);
// 	} catch (error) {
// 		console.error(error);
// 	}
// 	try {
// 		assert(!true);
// 	} catch (error) {
// 		console.error(error);
// 	}
//     /*
//         Error: [Error]Condition not met.
//         at assert (file:///P:/anqi/Desktop/tech/ts/projects/typescript_study/src/std.ts:41:9)
//         at file:///P:/anqi/Desktop/tech/ts/projects/typescript_study/src/std.ts:124:3
//         at file:///P:/anqi/Desktop/tech/ts/projects/typescript_study/src/std.ts:185:1
//     */
// 	try {
// 		assertEqual(1, 2);
// 	} catch (error) {
// 		console.error(error);
// 	}
//     /*
//         Error: [Error]1 === 2 is wrong.
//         at assertEqual (file:///P:/anqi/Desktop/tech/ts/projects/typescript_study/src/std.ts:69:9)
//         at file:///P:/anqi/Desktop/tech/ts/projects/typescript_study/src/std.ts:138:3
//         at file:///P:/anqi/Desktop/tech/ts/projects/typescript_study/src/std.ts:198:1
//     */
// 	try {
// 		assertNotEqual(1, 1);
// 	} catch (error) {
// 		console.error(error);
// 	}
//     /*
//         Error: [Error]1 !== 1 is wrong.
//         at assertNotEqual (file:///P:/anqi/Desktop/tech/ts/projects/typescript_study/src/std.ts:97:9)
//         at file:///P:/anqi/Desktop/tech/ts/projects/typescript_study/src/std.ts:150:3
//         at file:///P:/anqi/Desktop/tech/ts/projects/typescript_study/src/std.ts:207:1
//     */
// 	try {
// 		throw 'message';
// 	} catch (error) {
// 		/*
// 			<en_us>same</en_us>
// 			<zh_cn>console.error(error)与console.log(error）得到相同结果。</zh_cn>
// 			<zh_tw>console.error(error)與console.log(error）得到相同結果。</zh_tw>
// 		*/
// 		console.error(error);
// 		console.log(error);
// 		/*
// 			<en_us>
// 			When an exception is thrown by throwing a string, its type is string,
// 			and the traversal will be displayed character by character.
//             </en_us>
// 			<zh_cn>当通过throw一个字符串抛出异常时，其类型为string，遍历将逐字符显示。</zh_cn>
// 			<zh_tw>當透過throw一個字串拋出異常時，其類型為string，遍歷將逐字元顯示。</zh_tw>
// 		*/
// 		console.log(`typeof error${I18N_IS}${typeof error}${I18N_PERIOD}`);
// 		for (const p in error) {
// 			console.log(`error[${p}] is ${error[p]}`);
// 		}
// 	}
//     /*
//         message
//         message
//         typeof error is string.
//         error[0] is m
//         error[1] is e
//         error[2] is s
//         error[3] is s
//         error[4] is a
//         error[5] is g
//         error[6] is e
//     */
// 	try {
// 		throw new Error('message');
// 	} catch (error) {
// 		/*
// 			<en_us>same</en_us>
// 			<zh_cn>console.error(error)与console.log(error）得到相同结果。</zh_cn>
// 			<zh_tw>console.error(error)與console.log(error）得到相同結果。</zh_tw>
// 		*/
// 		console.error(error);
// 		console.log(error);
// 		/*
// 			<en_us>When an Error class is thrown, the type is object, and nothing is displayed when traversing.</en_us>
// 			<zh_cn>当抛出一个Error类时，类型为object，遍历时不显示任何内容。</zh_cn>
// 			<zh_tw>當拋出一個Error類別時，類型為object，遍歷時不顯示任何內容。</zh_tw>
// 		*/
// 		console.log(`typeof error${I18N_IS}${typeof error}${I18N_PERIOD}`);
// 		for (const p in error) {
// 			console.log(`error[${p}] is ${error[p]}`);
// 		}
// 	}
//     /*
//         Error: message
//             at file:///P:/anqi/Desktop/tech/ts/projects/typescript_study/src/std.ts:199:9
//             at file:///P:/anqi/Desktop/tech/ts/projects/typescript_study/src/std.ts:219:1
//         Error: message
//             at file:///P:/anqi/Desktop/tech/ts/projects/typescript_study/src/std.ts:199:9
//             at file:///P:/anqi/Desktop/tech/ts/projects/typescript_study/src/std.ts:219:1
//         typeof error is object.
//     */
// })();
/**
 * @param object
 * @param prefix
 * @param no
 * @param level
 * @param stopLevel
 */
function showPropertiesRecursion(object, prefix, no, level, stopLevel) {
    if (stopLevel === void 0) { stopLevel = 3; }
    var subIndex = 0;
    var NEXT_LEVEL = level + 1;
    for (var P in object) {
        if (P === 'Deno')
            continue;
        var SUB_ITEM = object[P];
        var TYPE = typeof SUB_ITEM;
        ++subIndex;
        // console.log(NEXT_PREFIX, subIndex < 10 ? ' ' : '', subIndex, P, TYPE);
        var NEXT_NO = no + "." + subIndex;
        var NEXT_PREFIX = prefix + "." + P;
        var isFunction = TYPE === 'function';
        var isObject = TYPE === 'object';
        console.log(NEXT_NO, NEXT_PREFIX, TYPE, isFunction || isObject ? '' : "" + SUB_ITEM);
        if (isFunction) {
            var CODE = SUB_ITEM.toString();
            console.log("" + (CODE.startsWith('function ') ? CODE : CODE.replace(/\n[ ][ ]/g, '\n')));
        }
        if (level < stopLevel && typeof SUB_ITEM === 'object' && SUB_ITEM !== null) {
            if (NEXT_PREFIX.indexOf('.window.window') || NEXT_PREFIX.indexOf('.self.self')) {
                continue;
            }
            showPropertiesRecursion(SUB_ITEM, NEXT_PREFIX, NEXT_NO, NEXT_LEVEL, stopLevel);
        }
    }
}
exports.showPropertiesRecursion = showPropertiesRecursion;
/**
 * @param object
 * @param prefix
 * @param no
 * @param number
 * @param level
 * @param stopLevel
 */
function showPropertiesExcludeDuplicateFunctionsRecursion(object, prefix, no, functionArray, level, stopLevel, excludeFunctionCode) {
    if (stopLevel === void 0) { stopLevel = 3; }
    if (excludeFunctionCode === void 0) { excludeFunctionCode = false; }
    var subIndex = 0;
    var NEXT_LEVEL = level + 1;
    for (var P in object) {
        if (P === 'Deno')
            continue;
        var SUB_ITEM = object[P];
        var TYPE = typeof SUB_ITEM;
        ++subIndex;
        // console.log(NEXT_PREFIX, subIndex < 10 ? ' ' : '', subIndex, P, TYPE);
        var NEXT_NO = no + "." + subIndex;
        var NEXT_PREFIX = prefix + "." + P;
        var isFunction = TYPE === 'function';
        var isObject = TYPE === 'object';
        console.log(NEXT_NO, NEXT_PREFIX, TYPE, (isFunction || isObject) ? '' : "" + SUB_ITEM);
        if (isFunction) {
            var CODE = SUB_ITEM.toString();
            if (!functionArray.indexOf(CODE)) {
                functionArray.push(CODE);
                if (!excludeFunctionCode) {
                    console.log("" + (CODE.startsWith('function ') ? CODE : CODE.replace(/\n[ ][ ]/g, '\n')));
                }
            }
        }
        if (level < stopLevel && typeof SUB_ITEM === 'object' && SUB_ITEM !== null) {
            if (NEXT_PREFIX.indexOf('.window.window') || NEXT_PREFIX.indexOf('.self.self')) {
                continue;
            }
            showPropertiesExcludeDuplicateFunctionsRecursion(SUB_ITEM, NEXT_PREFIX, NEXT_NO, functionArray, NEXT_LEVEL, stopLevel, excludeFunctionCode);
        }
    }
}
exports.showPropertiesExcludeDuplicateFunctionsRecursion = showPropertiesExcludeDuplicateFunctionsRecursion;
