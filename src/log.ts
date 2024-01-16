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

import {
	getChineseCharCount,
	I18N_COLUMN_NAME_DATA,
	I18N_COLUMN_NAME_INDEX,
	I18N_COLUMN_NAME_TYPE,
	I18N_COLUMN_NAME_VALUE,
} from './i18n.ts';

export type HeadInfo = {
	title: string;
	chineseCharCount: number;
	minLength: number;
	maxLength: number;
	notPadStart: boolean;
};
export const DEFAULT_HEADINFO: HeadInfo = {
	title: '',
	chineseCharCount: 0,
	minLength: 0,
	maxLength: 0,
	notPadStart: false,
};

export type NameAndValueTurple = [string, unknown];
export type NameAndValueTurpleArray = NameAndValueTurple[];
export type HeadInfoArray = Array<HeadInfo>;

export function logNameAndValueTurple(
	nameAndValueTurple: NameAndValueTurpleArray,
	headInfo: HeadInfoArray,
	parseDataFunc: (item: NameAndValueTurple) => Array<unknown>,
	parseOutDataFunc: (item: Array<unknown>, headInfo: HeadInfoArray) => Array<unknown>,
): void {
	const DATA_ARRAY = nameAndValueTurple.map((item) => parseDataFunc(item));
	headInfo.forEach((head, head_index) => {
		head.chineseCharCount = getChineseCharCount(head.title);
		if (!head.notPadStart) {
			let maxLength = Math.max(head.minLength, head.title.length - head.chineseCharCount);
			DATA_ARRAY.forEach((row) => {
				const VALUE = row[head_index];
				// 'Symbol()'.length => 8
				maxLength = Math.max(
					maxLength,
					typeof VALUE === 'symbol'
						? 8
						: (VALUE instanceof Boolean
							? 14 + (VALUE.valueOf() ? 4 : 5)
							: `${row[head_index]}`.length),
				);
			});
			head.maxLength = maxLength;
		}
	});
	console.log(
		...headInfo.map((head) =>
			head.notPadStart
				? head.title
				: head.title.padStart(head.maxLength - head.chineseCharCount)
		),
	);
	DATA_ARRAY.map((item) => parseOutDataFunc(item, headInfo)).forEach((array) =>
		console.log(...array)
	);
}

export function getLengthOfUnknown(value: unknown): number {
	return ((value && typeof value === 'object') ? JSON.stringify(value) : `${value}`).length;
}

export function logBoolIndexAndType(values: Array<boolean>): void {
	logNameAndValueTurple(
		values.map((item, index) => [index.toString(), item]),
		[
			{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_INDEX, minLength: 6 },
			{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_TYPE, minLength: 8 },
		],
		(item: NameAndValueTurple) => item,
		(item: Array<unknown>, headInfo: HeadInfoArray) => {
			const INDEX = (item[0] as number * 1) as number;
			const TYPE = typeof INDEX;
			return [
				''.padStart(headInfo[0].maxLength - 1 - (INDEX + '').length),
				INDEX,
				''.padStart(headInfo[1].maxLength - 1 - (TYPE + '').length),
				TYPE,
			];
		},
	);
}
export function logBoolValueAndType(values: Array<boolean>): void {
	logNameAndValueTurple(
		values.map((item) => [`${item}`, item]),
		[
			{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_VALUE, minLength: 6 },
			{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_TYPE, minLength: 8 },
		],
		(item: NameAndValueTurple) => item,
		(item: Array<unknown>, headInfo: HeadInfoArray) => {
			const VALUE = item[1] as boolean;
			const TYPE = typeof VALUE;
			return [
				// VALUE ? ' ': '',
				''.padStart(headInfo[0].maxLength - 1 - (VALUE + '').length),
				VALUE,
				''.padStart(headInfo[1].maxLength - 1 - (TYPE + '').length),
				TYPE,
			];
		},
	);
}

export function logBoolIndexAndTypeValueAndType(values: Array<boolean>): void {
	logNameAndValueTurple(
		values.map((item, index) => [index.toString(), item]),
		[
			{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_INDEX, minLength: 6 },
			{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_TYPE, minLength: 8 },
			{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_VALUE, minLength: 6 },
			{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_TYPE, minLength: 8 },
		],
		(item: NameAndValueTurple) => item,
		(item: Array<unknown>, headInfo: HeadInfoArray) => {
			const INDEX = (item[0] as number * 1) as number;
			const INDEX_TYPE = typeof INDEX;
			const VALUE = item[1] as boolean;
			const VALUE_TYPE = typeof VALUE;
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
		},
	);
}

export function logDataAndValue(source: NameAndValueTurpleArray): void {
	logNameAndValueTurple(
		source,
		[
			{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_DATA },
			{ ...DEFAULT_HEADINFO, title: I18N_COLUMN_NAME_VALUE },
		],
		(item: NameAndValueTurple) => item,
		(item: Array<unknown>, headInfo: HeadInfoArray) => {
			const [NAME, VALUE] = item;
			return [
				(NAME as string).padStart(headInfo[0].maxLength).concat(
					''.padStart(headInfo[1].maxLength - getLengthOfUnknown(VALUE)),
				),
				VALUE,
			];
		},
	);
}

export function getFriendlyTitle(data: unknown): string {
	// bigint boolean function number object string symbol undefined
	//  boolean function number object   undefined
	switch (typeof data) {
		case 'symbol':
			return 'Symbol()';
		case 'string':
			return `'${data}'`;
		case 'bigint':
			return `${data}n`;
		case 'object':
			if (data instanceof Boolean) {
				return `new Boolean(${data.valueOf()})`;
			}
			return JSON.stringify(data);
		default:
			return `${data}`;
	}
}
