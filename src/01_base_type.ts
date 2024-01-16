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

import { LANG, LanguageNames } from './i18n.ts';

import { DEFAULT_HEADINFO, getFriendlyTitle, HeadInfo, logNameAndValueTurple } from './log.ts';

import { studyBooleanTypes } from './01_base_type/boolean.ts';
import { studyNumberTypes } from './01_base_type/number.ts';

function compareSomeValues(levelNo1: number) {
	console.log(`\n${levelNo1}. compareSomeValues()`);
	console.log(
		{
			en_us: `Compare some values that look the same.`,
			zh_cn: `比较一些看起来相同的值。`,
			zh_tw: `比較一些看起來相同的值。`,
		}[LANG],
	);
	logNameAndValueTurple(
		[
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
			[() => {}, () => {}],
			[function () {}, function () {}],
			[LanguageNames.en_us, LanguageNames.en_us],
			[LanguageNames.zh_cn, LanguageNames.zh_cn],
			[true, true],
			[false, false],
			[new Boolean(true), new Boolean(true)],
			[new Boolean(false), new Boolean(false)],
		].map((item) => [item[0] as string, item[1]]),
		[
			{ ...DEFAULT_HEADINFO, title: 'a' },
			{ ...DEFAULT_HEADINFO, title: 'b' },
			{ ...DEFAULT_HEADINFO, title: 'a === b', minLength: 8 },
			{ ...DEFAULT_HEADINFO, title: 'a == b', minLength: 8 },
			// { ...DEFAULT_HEADINFO, title: '!!a === !!b', minLength: 12 },
			{ ...DEFAULT_HEADINFO, title: '!!a', minLength: 8 },
		],
		(item: NameAndValueTurple) => {
			const [A, B] = item as [unknown, unknown];
			// return [A, B, A === B, A == B, !!A === !!B];
			return [A, B, A === B, A == B, !!A];
		},
		(item: Array<unknown>, headInfo: HeadInfoArray) => {
			const [A, B, STRICT_EQUALITY, EQUALITY, DOUBLE_NOT] = item as [
				unknown,
				unknown,
				boolean,
				boolean,
				boolean,
			];
			// const VALUE = typeof A === 'symbol' ? 'Symbol()' : `${A}`;
			const VALUE = getFriendlyTitle(A);

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
		},
	);
}

function displayTypeofValues(levelNo1: number) {
	// bigint boolean function number object string symbol undefined
}

/*
    <en_us>Test in sequence.</en_us>
    <zh_cn>按序测试。</zh_cn>
    <zh_tw>按序測試。</zh_tw>
*/
(function () {
	let levelNo1 = 0;
	[
		studyBooleanTypes,
		studyNumberTypes,

		compareSomeValues,
	].forEach((f: (levelNo1: number) => void) => {
		try {
			f(++levelNo1);
		} catch (error) {
			console.error(error);
		}
	});
})();
