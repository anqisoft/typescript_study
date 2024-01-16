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

import {
	I18N_COLUMN_NAME_BOOLEAN,
	I18N_COLUMN_NAME_DATA,
	I18N_COLUMN_NAME_TYPE,
	I18N_COLUMN_NAME_VALUE,
	I18nInfo,
	LANG,
	LanguageNames,
} from '../i18n.ts';
import {
	DEFAULT_HEADINFO,
	getLengthOfUnknown,
	HeadInfo,
	logBoolIndexAndType,
	logBoolIndexAndTypeValueAndType,
	logBoolValueAndType,
	logNameAndValueTurple,
} from '../log.ts';
import { assertEqual, assertEqualAll, assertNotEqual } from '../std.ts';

/**
 * <en_us>Study boolean types</en_us>
 * <zh_cn>研究布尔类型</zh_cn>
 * <zh_tw>研究布林類型</zh_tw>
 */
export function studyBooleanTypes(levelNo1: number) {
	/*
		<en_us>see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean</en_us>
		<zh_cn>请参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean</zh_cn>
		<zh_tw>請參考：https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Boolean</zh_tw>
	*/

	console.log(`\n${levelNo1}. studyBooleanTypes()`);
	console.log(true, false);

	let codeNo = 0;

	displayNewBoolean();

	displayDoubleNotAndBoolean();

	compareEmptyArrayAndFalse();

	codeNo = displayBooleanValues(levelNo1, codeNo);

	codeNo = compareBooleanValuesAnd1Or0(levelNo1, codeNo);

	codeNo = convertValuesToBoolean(levelNo1, codeNo);

	codeNo = compareDoubleNotBooleanNewBoolean(levelNo1, codeNo);
}

function displayNewBoolean() {
	const i18nMessage: I18nInfo = {
		en_us:
			`Tips: Please use the basic types true and false, and convert other types of data to Boolean basic types via !! (equivalent to Boolean()), and forget about new Boolean() and Boolean(). Especially new Boolean(), it will take you too much time to adapt, and you will make mistakes if you are not careful--for example, if(new Boolean(false)) will always be true.`,
		zh_cn:
			`【提醒】请使用基本类型的true与false，并通过!!（与Boolean()等效）转换其它类型的数据到布尔基本类型，同时忘掉new Boolean()和Boolean()吧。尤其是new Boolean()，它会让您多花太多时间来适应，而且一不小心就会犯错——比如if(new Boolean(false))总能成立。`,
		zh_tw:
			`【提醒】請使用基本型別的true與false，並透過!!（與Boolean()等效）轉換其它型別的資料到布林基本型別，同時忘掉new Boolean()和Boolean()吧。 尤其是new Boolean()，它會讓您多花太多時間來適應，而且一不小心就會犯錯——比如if(new Boolean(false))總能成立。`,
	};
	console.log(`${i18nMessage[LANG]}`);
	// assertEqual(true, !!new Boolean(false));
	// assertEqual(true, !!new Boolean(0));
	// assertEqual(true, !!new Boolean(-0));
	// assertEqual(true, !!new Boolean(null));
	// assertEqual(true, !!new Boolean(NaN));
	// assertEqual(true, !!new Boolean(undefined));
	// assertEqual(true, !!new Boolean(''));
	assertEqualAll(
		true,
		!!new Boolean(false),
		!!new Boolean(0),
		!!new Boolean(-0),
		!!new Boolean(null),
		!!new Boolean(NaN),
		!!new Boolean(undefined),
		!!new Boolean(''),
	);

	// assertEqual(true, !!new Boolean(true));
	// assertEqual(true, !!new Boolean(1));
	// assertEqual(true, !!new Boolean(Infinity));
	// assertEqual(true, !!new Boolean('any'));
	// assertEqual(true, !!new Boolean({}));
	// assertEqual(true, !!new Boolean([]));
	assertEqualAll(
		true,
		!!new Boolean(true),
		!!new Boolean(1),
		!!new Boolean(Infinity),
		!!new Boolean('any'),
		!!new Boolean({}),
		!!new Boolean([]),
	);

	// assertEqual(false, new Boolean(false).valueOf());
	// assertEqual(false, new Boolean(0).valueOf());
	// assertEqual(false, new Boolean(-0).valueOf());
	// assertEqual(false, new Boolean(null).valueOf());
	// assertEqual(false, new Boolean(NaN).valueOf());
	// assertEqual(false, new Boolean(undefined).valueOf());
	// assertEqual(false, new Boolean('').valueOf());
	assertEqualAll(
		false,
		new Boolean(false).valueOf(),
		new Boolean(0).valueOf(),
		new Boolean(-0).valueOf(),
		new Boolean(null).valueOf(),
		new Boolean(NaN).valueOf(),
		new Boolean(undefined).valueOf(),
		new Boolean('').valueOf(),
	);

	// assertEqual(true, !!new Boolean(true).valueOf());
	// assertEqual(true, !!new Boolean(1).valueOf());
	// assertEqual(true, !!new Boolean(Infinity).valueOf());
	// assertEqual(true, !!new Boolean('any').valueOf());
	// assertEqual(true, !!new Boolean({}).valueOf());
	// assertEqual(true, !!new Boolean([]).valueOf());
	assertEqualAll(
		true,
		!!new Boolean(true).valueOf(),
		!!new Boolean(1).valueOf(),
		!!new Boolean(Infinity).valueOf(),
		!!new Boolean('any').valueOf(),
		!!new Boolean({}).valueOf(),
		!!new Boolean([]).valueOf(),
	);
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
		() => {},
		function () {},
		LanguageNames.en_us,
		LanguageNames.zh_cn,
	].forEach((value) => {
		assertEqual(!!value, Boolean(value));

		assertEqual(true, Boolean(new Boolean(value)));
	});
}

function compareEmptyArrayAndFalse() {
	const i18nMessage: I18nInfo = {
		en_us:
			`[] === false: false, because typeof [] is object, and typeof false is boolean, so they are not equal. \n[] == false: true, the difference in type will be ignored. The .toString() method of [] is called and converted to the empty string "", and the empty string is false when used as a basic Boolean value. So equal.`,
		zh_cn:
			`[] === false: false，因typeof []为object，而typeof false为boolean，所以不相等。\n[] == false: true，因忽略类型的不同，调用[]的.toString()方法转为空字符串""，而空字符串被当作基础布尔值使用时为false，所以相等。`,
		zh_tw:
			`[] === false: false，因typeof []為object，而typeof false為boolean，所以不相等。\n[] == false: true，因忽略類型的不同，呼叫[]的.toString()方法轉為空字串""，而空字串被當作基礎布林值使用時為false， 所以相等。`,
	};
	console.log(`\n${i18nMessage[LANG]}`);
	assertEqual(false, [] as unknown as boolean === false);
	assertEqual(true, [] as unknown as boolean == false);
}

function displayBooleanValues(levelNo1: number, codeNo: number): number {
	let i18nMessage: I18nInfo = {
		en_us: 'Shows the type of boolean constants (true and false).',
		zh_cn: '显示布尔常量（true与false）的类型。',
		zh_tw: '顯示布林常數（true與false）的類型。',
	};
	console.log(`\n${levelNo1}.${++codeNo} ${i18nMessage[LANG]}`);
	logBoolValueAndType([true, false]);

	i18nMessage = {
		en_us: 'Displays the type of boolean variables (true and false).',
		zh_cn: '显示布尔变量（true与false）的类型。',
		zh_tw: '顯示布林變數（true與false）的類型。',
	};
	console.log(`\n${levelNo1}.${++codeNo} ${i18nMessage[LANG]}`);
	const [TRUE_VAR, FALSE_VAR] = [true, false];
	logBoolValueAndType([TRUE_VAR, FALSE_VAR]);

	i18nMessage = {
		en_us: `Define constants TRUE and FALSE and assign values to true and false respectively.
Define the constant array BOOLEAN_ARRAY and assign values to [true, false, TRUE, FALSE].
If this array is traversed through a for loop, the loop variable (or constant) will be
automatically inferred as string type, and only string type or any type is allowed,
and the value is a sequence of subscripts - this is different from other languages
for...in or for each...in displays its value directly.
Typescript needs to traverse the array itself with forEach, which is usually used with lambda.
A single item can be used to directly correspond to the element, or (item, index) can correspond
to the element and subscript (numeric type) respectively.`,
		zh_cn: `定义常量TRUE、FALSE，分别赋值为true和false。
定义常量数组BOOLEAN_ARRAY，赋值为[true, false, TRUE, FALSE]。
如通过for循环遍历这个数组，循环变量（或常量）将被自动推断为string类型，且仅允许string类型或any类型，值为下标序列
——这不同于其它语言以for...in或for each...in直接显示其值。
typescript需要以数组自身的forEach来遍历，通常配合lambda使用，可用单个item直接对应元素，\
或(item, index)分别对应元素与下标（数字类型）。`,
		zh_tw: `定義常數TRUE、FALSE，分別賦值為true和false。
定義常數數組BOOLEAN_ARRAY，賦值為[true, false, TRUE, FALSE]。
如透過for迴圈遍歷這個數組，循環變數（或常數）將自動推斷為string類型，且僅允許string類型或any類型，值為下標序列
——這不同於其它語言以for...in或 for each...in直接顯示其值。
typescript需要以陣列本身的forEach來遍歷，通常配合lambda使用，可用單一item直接對應元素，\
或(item, index)分別對應元素與下標（數字類型）。`,
	};
	console.log(`\n${levelNo1}.${++codeNo} ${i18nMessage[LANG]}`);
	const TRUE = true;
	const FALSE = false;
	const BOOLEAN_ARRAY = [true, false, TRUE, FALSE];
	logBoolIndexAndType(BOOLEAN_ARRAY);
	logBoolValueAndType(BOOLEAN_ARRAY);
	logBoolIndexAndTypeValueAndType(BOOLEAN_ARRAY);

	return codeNo;
}

function compareBooleanValuesAnd1Or0(levelNo1: number, codeNo: number) {
	const i18nMessage: I18nInfo = {
		en_us: 'Compare true and 1, false and 0.',
		zh_cn: '对比true与1、false与0。',
		zh_tw: '對比true與1、false與0。',
	};
	console.log(`\n${levelNo1}.${++codeNo} ${i18nMessage[LANG]}`);
	assertNotEqual(true, 1);
	assertNotEqual(true, 0);
	assertNotEqual(false, 1);
	assertNotEqual(false, 0);
	{
		logNameAndValueTurple(
			[
				['!!(true === 1 as unknown as boolean)', !!(true === 1 as unknown as boolean)],
				['!!(true == 1 as unknown as boolean)', !!(true == 1 as unknown as boolean)],

				['!!(false === 0 as unknown as boolean)', !!(false === 0 as unknown as boolean)],
				['!!(false == 0 as unknown as boolean)', !!(false == 0 as unknown as boolean)],
			],
			[
				{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_DATA },
				{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_TYPE, minLength: 8 },
			],
			(item: NameAndValueTurple) => item,
			(item: Array<unknown>, headInfo: HeadInfoArray) => {
				const [NAME, VALUE] = item;
				return [
					(NAME as string).padStart(headInfo[0].maxLength).concat(
						''.padStart(headInfo[1].maxLength - `${VALUE}`.length),
					),
					VALUE,
				];
			},
		);
	}

	return codeNo;
}

function convertValuesToBoolean(levelNo1: number, codeNo: number) {
	let i18nMessage: I18nInfo = {
		en_us:
			`Forcibly convert other types of values to Boolean values, display their values, the results of two negations, and their types.`,
		zh_cn: `强行转其它类型的值到布尔值，显示其值、两次取反结果，及其类型。`,
		zh_tw: `強行轉其它類型的值到布林值，顯示其值、兩次取反結果，及其類型。`,
	};
	console.log(`\n${levelNo1}.${++codeNo} ${i18nMessage[LANG]}`);
	{
		logNameAndValueTurple(
			[
				['!!1', !!1],
				['!!0', !!0],
				['!!undefined', !!undefined],
				['!!null', !!null],
				["!!'test'", !!'test'],
				["!!''", !!''],
				['!!{}', !!{}],
				['!![]', !![]],
				['!!LanguageNames.en_us', !!LanguageNames.en_us],
				['!!LanguageNames.zh_cn', !!LanguageNames.zh_cn],

				['<boolean> <unknown> 1', <boolean> <unknown> 1],
				['<boolean> <unknown> 0', <boolean> <unknown> 0],

				['1 as unknown as boolean', 1 as unknown as boolean],
				['0 as unknown as boolean', 0 as unknown as boolean],

				['true === 1 as unknown as boolean', true === 1 as unknown as boolean],
				['true == 1 as unknown as boolean', true == 1 as unknown as boolean],

				['false === 0 as unknown as boolean', false === 0 as unknown as boolean],
				['false == 0 as unknown as boolean', false == 0 as unknown as boolean],

				['undefined as unknown as boolean', undefined as unknown as boolean],
				['null as unknown as boolean', null as unknown as boolean],

				["'test' as unknown as boolean", 'test' as unknown as boolean],
				["'' as unknown as boolean", '' as unknown as boolean],

				['{} as unknown as boolean', {} as unknown as boolean],
				['[] as unknown as boolean', [] as unknown as boolean],

				[
					'LanguageNames.en_us as unknown as boolean',
					LanguageNames.en_us as unknown as boolean,
				],
				[
					'LanguageNames.zh_cn as unknown as boolean',
					LanguageNames.zh_cn as unknown as boolean,
				],
				// ["['a'] as unknown as boolean", ['a'] as unknown as boolean],
			],
			[
				{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_DATA },
				{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_VALUE },
				{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_BOOLEAN, minLength: 8 },
				{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_TYPE, minLength: 10 },
			],
			(item: NameAndValueTurple) => {
				const [NAME, VALUE] = item;
				return [NAME, VALUE, !!VALUE, typeof VALUE];
			},
			(item: Array<unknown>, headInfo: HeadInfoArray) => {
				const [NAME, VALUE, BOOLEAN, TYPE] = item;
				return [
					(NAME as string).padStart(headInfo[0].maxLength).concat(
						''.padStart(
							headInfo[1].maxLength - getLengthOfUnknown(VALUE) -
								(typeof VALUE === 'string' ? 2 : 0),
						),
					),
					// typeof VALUE === 'string' ? `'${VALUE}'`: (!!VALUE && typeof VALUE === 'object' ? VALUE.valueOf(): `${VALUE}`),
					(typeof VALUE === 'string'
						? `'${VALUE}'`
						: (!!VALUE && typeof VALUE === 'object'
							? JSON.stringify(VALUE)
							: `${VALUE}`)).concat(
							''.padStart(headInfo[2].maxLength - `${BOOLEAN}`.length),
						),
					BOOLEAN,
					(TYPE as string).padStart(headInfo[3].maxLength),
				];
			},
		);
	}
	i18nMessage = {
		en_us:
			`------------------------------------ [Conclusion] ------------------------------------
If you want to convert other types of values to Boolean type, you cannot convert it through "as unknown as boolean", but you need to add '!!' in front of it.
When using '!!' conversion, 0, undefined, null and empty strings will be converted to false, and the rest will be converted to true.`,
		zh_cn:
			`【结论】\n如果想转其它类型的值到布尔类型，不能通过“ as unknown as boolean”来转换，而需要在前面加“!!”来转换。
使用“!!”转换时，0、undefined、null和空字符串会转为false，其余转true。`,
		zh_tw:
			`【結論】\n如果想轉其它類型的值到布林類型，不能透過「 as unknown as boolean」來轉換，而需要在前面加上「!!」來轉換。
使用「!!」轉換時，0、undefined、null和空字串會轉為false，其餘轉true。`,
	};
	console.log(`${i18nMessage[LANG]}`);

	return codeNo;
}

function compareDoubleNotBooleanNewBoolean(levelNo1: number, codeNo: number) {
	const i18nMessage: I18nInfo = {
		en_us: `Compare: !!, Boolean() and new Boolean().`,
		zh_cn: `对比：!!、Boolean()与new Boolean()。`,
		zh_tw: `對比：!!、Boolean()與new Boolean()。`,
	};
	console.log(`\n${levelNo1}.${++codeNo} ${i18nMessage[LANG]}`);
	{
		logNameAndValueTurple(
			[
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
				['(()=>{})', () => {}],
				['(function(){})', function () {}],
				['LanguageNames.en_us', LanguageNames.en_us],
				['LanguageNames.zh_cn', LanguageNames.zh_cn],
			],
			[
				{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_DATA },
				{ ...DEFAULT_HEADINFO, title: '!!', minLength: 8 },
				{ ...DEFAULT_HEADINFO, title: 'Boolean()', minLength: 16 },
				{ ...DEFAULT_HEADINFO, title: 'new Boolean()', minLength: 18 },
				{ ...DEFAULT_HEADINFO, title: 'new Boolean().valueOf()', minLength: 23 },
				{ ...DEFAULT_HEADINFO, title: '!!(new Boolean())', minLength: 17 },
			],
			(item: NameAndValueTurple) => {
				const [NAME, VALUE] = item;
				return [
					NAME,
					!!VALUE,
					Boolean(VALUE),
					new Boolean(VALUE),
					new Boolean(VALUE).valueOf(),
					!!(new Boolean(VALUE)),
				];
			},
			(item: Array<unknown>, headInfo: HeadInfoArray) => {
				const [NAME, VALUE, BOOLEAN, NEW_BOOLEAN, NEW_BOOLEAN_VALUE_OF, NEW_BOOLEAN_VALUE] =
					item;
				return [
					(NAME as string).padStart(headInfo[0].maxLength).concat(
						''.padStart(headInfo[1].maxLength - `${VALUE}`.length),
					),
					VALUE,

					''.padStart(
						headInfo[2].maxLength - 1 - (BOOLEAN as boolean).toString().length,
					),
					BOOLEAN,
					// ''.padStart(headInfo[3].maxLength - 1 - `${NEW_BOOLEAN_VALUE}`.toString().length),
					// NEW_BOOLEAN_VALUE,
					// ''.padStart(headInfo[3].maxLength - 1 - `${NEW_BOOLEAN}`.length),
					// ''.padStart(headInfo[3].maxLength - 1 - `${NEW_BOOLEAN}`.length - (typeof NEW_BOOLEAN === 'object' ? 11 : 0)),
					''.padStart(
						headInfo[3].maxLength - 1 - `${NEW_BOOLEAN}`.length -
							(NEW_BOOLEAN instanceof Boolean ? 11 : 0),
					),
					NEW_BOOLEAN,
					''.padStart(
						headInfo[4].maxLength - 1 -
							(NEW_BOOLEAN_VALUE_OF as boolean).toString().length,
					),
					NEW_BOOLEAN_VALUE_OF,
					''.padStart(
						headInfo[5].maxLength - 1 - (!!NEW_BOOLEAN_VALUE).toString().length,
					),
					!!NEW_BOOLEAN_VALUE,
				];
			},
		);
	}

	return codeNo;
}
