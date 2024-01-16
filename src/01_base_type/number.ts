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

import { assertEqual, assertEqualAll } from '../std.ts';
import {
	I18N_COLUMN_NAME_DATA,
	I18N_COLUMN_NAME_VALUE,
	I18nInfo,
	LANG,
	LanguageNames,
} from '../i18n.ts';
import {
	DEFAULT_HEADINFO,
	HeadInfo,
	HeadInfoArray,
	logDataAndValue,
	logNameAndValueTurple,
	NameAndValueTurple,
	NameAndValueTurpleArray,
} from '../log.ts';

/**
 * <en_us>Study number types</en_us>
 * <zh_cn>研究数字类型</zh_cn>
 * <zh_tw>研究數字類型</zh_tw>
 */
export function studyNumberTypes(levelNo1: number) {
	/*
		<en_us>see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number</en_us>
		<zh_cn>请参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number</zh_cn>
		<zh_tw>請參考：https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Number</zh_tw>
	*/

	console.log(`\n${levelNo1}. studyNumberTypes()`);

	// showConvertErrors();
	// logSomeNumbers();
	compareSomeNumbers();

	let codeNo = 0;
	codeNo = showSpecialNumbers(levelNo1, codeNo);

	codeNo = convertOtherTypeValuesToNumber(levelNo1, codeNo);

	codeNo = tryParseIntAndParseFloat(levelNo1, codeNo);

	codeNo = tryIsNaNAndIsFinite(levelNo1, codeNo);

	codeNo = showNumberStaticProperties(levelNo1, codeNo);
}

function showConvertErrors() {
	// Ok
	{
		const BIGINT = Number(10n);
		console.log(BIGINT);
	}

	// TypeError: Cannot convert a Symbol value to a number
	try {
		const SYMBOL = Number(Symbol());
		console.log(SYMBOL);
	} catch (error) {
		console.error(error);
	}

	// TypeError: Cannot convert a BigInt value to a number
	try {
		const BIGINT = +(10n as unknown as number);
		console.log(BIGINT);
	} catch (error) {
		console.error(error);
	}

	// TypeError: Cannot convert a Symbol value to a number
	try {
		const SYMBOL = +(Symbol() as unknown as number);
		console.log(SYMBOL);
	} catch (error) {
		console.error(error);
	}
}

/** */
function logSomeNumbers() {
	console.log(
		0b10,
		0o76543210,
		9876543210,
		0xFEDCBA9876543210,
	);
	console.log(
		NaN,
		Infinity,
		Number.MIN_VALUE,
		Number.MIN_SAFE_INTEGER,
		Number.MAX_VALUE,
		Number.MAX_SAFE_INTEGER,
	);
	console.log(
		Math.E,
		Math.LN10,
		Math.LN2,
		Math.LOG2E,
	);
	console.log(
		Math.LOG10E,
		Math.PI,
		Math.SQRT1_2,
		Math.SQRT2,
	);
}

function compareSomeNumbers() {
	// 255
	assertEqualAll(255, 255.0, 0xff, 0b11111111, 0.255e3);

	// 10
	assertEqualAll(10, 10.0, 0xa, 0o12, 0b1010, 1e1);
}

function showSpecialNumbers(levelNo1: number, codeNo: number): number {
	const i18nMessage: I18nInfo = {
		en_us: `Display special values:`,
		zh_cn: `显示特殊值：`,
		zh_tw: `顯示特殊值：`,
	};
	console.log(`\n${levelNo1}.${++codeNo} ${i18nMessage[LANG]}`);
	logDataAndValue([
		['0b10', 0b10],
		['0o76543210', 0o76543210],
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

function convertOtherTypeValuesToNumber(levelNo1: number, codeNo: number) {
	const i18nMessage: I18nInfo = {
		en_us: `Convert values from other types to numeric types.`,
		zh_cn: `从其它类型的值转数字类型。`,
		zh_tw: `從其它類型的值轉數字類型。`,
	};
	console.log(`\n${levelNo1}.${++codeNo} ${i18nMessage[LANG]}`);
	let number_var = 0;
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
	number_var = LanguageNames.en_us;
	assertEqual(number_var, 0);
	number_var = LanguageNames.zh_cn;
	assertEqual(number_var, 1);
	number_var = LanguageNames.zh_tw;
	assertEqual(number_var, 2);
	// Number(Symbol()) => TypeError: Cannot convert a Symbol value to a number
	const NAME_AND_VALUE_ARRAY: NameAndValueTurpleArray = [
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
		['LanguageNames.en_us', LanguageNames.en_us],
		['LanguageNames.zh_cn', LanguageNames.zh_cn],
		['LanguageNames.zh_tw', LanguageNames.zh_tw],
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
	logDataAndValue(NAME_AND_VALUE_ARRAY.map((item) => {
		const NAME = item[0] as string;
		const value = item[1];
		return [NAME, Number(value)];
	}));

	NAME_AND_VALUE_ARRAY.pop();
	logNameAndValueTurple(
		NAME_AND_VALUE_ARRAY,
		[
			{ ...DEFAULT_HEADINFO, title: 'v' },
			{ ...DEFAULT_HEADINFO, title: '+v' },
			{ ...DEFAULT_HEADINFO, title: 'Number(v)', minLength: 12 },
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
		(item: NameAndValueTurple) => {
			const [NAME, VALUE] = item as NameAndValueTurple;
			return [NAME, +(VALUE as number), Number(VALUE)];
		},
		(item: Array<unknown>, headInfo: HeadInfoArray) => {
			const [NAME, ADD_VALUE, NUMBER] = item as [
				string,
				number,
				number,
			];

			return [
				NAME.padStart(headInfo[0].maxLength),
				ADD_VALUE.toString().padStart(headInfo[1].maxLength),
				NUMBER.toString().padStart(headInfo[2].maxLength),
			];
		},
	);
	return codeNo;
}

function tryParseIntAndParseFloat(levelNo1: number, codeNo: number) {
	let i18nMessage: I18nInfo = {
		en_us: `Test parseInt(string: string, radix?: number)`,
		zh_cn: `测试parseInt(string: string, radix?: number)`,
		zh_tw: `測試parseInt(string: string, radix?: number)`,
	};
	console.log(`\n${levelNo1}.${++codeNo} ${i18nMessage[LANG]}`);
	const PARSE_INT_FROM = '10';
	const RADIX_ARRAY: Array<number> = [];
	for (let i = 2; i <= 36; ++i) {
		RADIX_ARRAY.push(i);
	}
	logDataAndValue(
		RADIX_ARRAY.map(
			(index) => [`parseInt('${PARSE_INT_FROM}', ${index})`, parseInt(PARSE_INT_FROM, index)],
		),
	);

	const FROM_stringArray = [
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
	logDataAndValue(
		FROM_stringArray.map((from) => [`parseInt('${from}')`, parseInt(from)]),
	);

	i18nMessage = {
		en_us: `Test parseFloat(string: string)`,
		zh_cn: `测试parseFloat(string: string)`,
		zh_tw: `測試parseFloat(string: string)`,
	};
	console.log(`\n${levelNo1}.${++codeNo} ${i18nMessage[LANG]}`);
	logDataAndValue(
		FROM_stringArray.map((from) => [`parseFloat('${from}')`, parseFloat(from)]),
	);

	return codeNo;
}

function tryIsNaNAndIsFinite(levelNo1: number, codeNo: number) {
	const i18nMessage: I18nInfo = {
		en_us: `Test isNaN(number: number) and isFinite(number: number)`,
		zh_cn: `测试isNaN(number: number)和isFinite(number: number)`,
		zh_tw: `測試isNaN(number: number)和isFinite(number: number)`,
	};
	console.log(`\n${levelNo1}.${++codeNo} ${i18nMessage[LANG]}`);
	logNameAndValueTurple(
		[
			0,
			1,
			true,
			false,
			null,
			Infinity,
			NaN,
			undefined,
		].map((item) => [`${item}`, item]),
		[
			{ ...DEFAULT_HEADINFO, title: 'v' },
			{ ...DEFAULT_HEADINFO, title: 'isNaN(v)', minLength: 11 },
			{ ...DEFAULT_HEADINFO, title: '', notPadStart: true },
			{ ...DEFAULT_HEADINFO, title: 'isFinite(v)', minLength: 11 },
		],
		(item: NameAndValueTurple) => {
			const [NAME, VALUE] = item;
			return [NAME, isNaN(VALUE as number), isFinite(VALUE as number)];
		},
		(item: Array<unknown>, headInfo: HeadInfoArray) => {
			const [NAME, IS_NAN_VALUE, IS_FINITE_VALUE] = item;
			return [
				(NAME as string).padStart(headInfo[0].maxLength).concat(
					''.padStart(headInfo[1].maxLength - `${IS_NAN_VALUE}`.length),
				),
				IS_NAN_VALUE,
				''.padStart(headInfo[3].maxLength - 1 - `${IS_FINITE_VALUE}`.length),
				IS_FINITE_VALUE,
			];
		},
	);
	return codeNo;
}

function showNumberStaticProperties(levelNo1: number, codeNo: number): number {
	// // [
	// Number.EPSILON;
	// Number.POSITIVE_INFINITY;
	// // ]

	const i18nMessage: I18nInfo = {
		en_us: ``,
		zh_cn: `显示Number类型的静态属性`,
		zh_tw: ``,
	};
	console.log(`\n${levelNo1}.${++codeNo} ${i18nMessage[LANG]}`);
	logNameAndValueTurple(
		[
			Number.prototype,
			Number.EPSILON,
			Number.MAX_SAFE_INTEGER,
			Number.MIN_SAFE_INTEGER,
			Number.MAX_VALUE,
			Number.MIN_VALUE,
			Number.NaN,
			Number.NEGATIVE_INFINITY,
			Number.POSITIVE_INFINITY,
		].map((item) => [`${item}`, item]),
		[
			{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_DATA },
			{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_VALUE },
		],
		(item: NameAndValueTurple) => {
			const [NAME, VALUE] = item;
			return [NAME, isNaN(VALUE as number), isFinite(VALUE as number)];
		},
		(item: Array<unknown>, headInfo: HeadInfoArray) => {
			const [NAME, IS_NAN_VALUE, IS_FINITE_VALUE] = item;
			return [
				(NAME as string).padStart(headInfo[0].maxLength).concat(
					''.padStart(headInfo[1].maxLength - `${IS_NAN_VALUE}`.length),
				),
				IS_NAN_VALUE,
				''.padStart(headInfo[3].maxLength - 1 - `${IS_FINITE_VALUE}`.length),
				IS_FINITE_VALUE,
			];
		},
	);

	return codeNo;
}
