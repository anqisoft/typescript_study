/*
 * Copyright (c) 2023 anqisoft@gmail.com
 * globalThis.ts
 *
 * <en_us>
 * Created on Wed Dec 20 2023 07:27:35
 * Feature:
 * </en_us>
 *
 * <zh_cn>
 * 创建：2023年12月20日 07:27:35
 * 功能：
 * </zh_cn>
 *
 * <zh_tw>
 * 創建：2023年12月20日 07:27:35
 * 功能：
 * </zh_tw>
 */

import {
	showPropertiesExcludeDuplicateFunctionsRecursion,
	showPropertiesRecursion,
	StringIndex,
} from '../std.ts';

export function studyGolbalThis() {
	const OBJECTS: Array<[string, object]> = [];
	const FUNCTIONS: Array<[string, object]> = [];
	const NULLS: Array<string> = [];
	showPropertyList(NULLS, OBJECTS, FUNCTIONS);

	showSummary(NULLS, OBJECTS, FUNCTIONS);

	// const excludeFunctionCode = true;
	const excludeFunctionCode = false;

	const functionArray: Array<string> = [];
	displayFunctions(FUNCTIONS, functionArray, excludeFunctionCode);
	displayObjects(OBJECTS, functionArray, 10, excludeFunctionCode);
}

function showSummary(NULLS: string[], OBJECTS: [string, object][], FUNCTIONS: [string, object][]) {
	console.log('\n');

	const FUNCTION_COUNT = FUNCTIONS.length;
	console.log(
		FUNCTION_COUNT < 10 ? ' ' : '',
		FUNCTION_COUNT,
		'function properties: ',
		FUNCTIONS.map((item) => item[0]).join(', '),
	);

	const NULL_COUNT = NULLS.length;
	console.log(NULL_COUNT < 10 ? ' ' : '', NULL_COUNT, 'null properties: ', NULLS.join(', '));

	const OBJECT_COUNT = OBJECTS.length;
	console.log(
		OBJECT_COUNT < 10 ? ' ' : '',
		OBJECT_COUNT,
		'object(not null) properties: ',
		OBJECTS.map((item) => item[0]).join(', '),
	);
}

function showPropertyList(
	NULLS: string[],
	OBJECTS: [string, object][],
	FUNCTIONS: [string, object][],
) {
	let index = 0;
	for (const P in globalThis) {
		if (P === 'Deno') continue;
		const VALUE = (globalThis as unknown as StringIndex)[P];
		const TYPE = typeof VALUE;
		++index;
		console.log(index < 10 ? ' ' : '', index, P, TYPE);

		const TURPLE: [string, object] = [P, VALUE as unknown as object];
		switch (TYPE) {
			case 'object':
				if (VALUE === null) {
					NULLS.push(P);
				} else {
					OBJECTS.push(TURPLE);
				}
				break;
			case 'function':
				FUNCTIONS.push(TURPLE);
				break;
			default:
				break;
		}
	}
}

function displayFunctions(
	FUNCTIONS: [string, object][],
	functionArray: Array<string>,
	excludeFunctionCode = false,
) {
	console.log(`\nfunction count: ${FUNCTIONS.length}`);
	FUNCTIONS.forEach((item, index) => {
		const [NAME] = item;

		const NO = index + 1;
		console.log(NO < 10 ? ' ' : '', NO, NAME);
	});
	FUNCTIONS.forEach((item, index) => {
		const [NAME] = item;
		const NO = index + 1;
		const CODE = `${item[1]}`;

		if (!functionArray.indexOf(CODE)) {
			functionArray.push(CODE);
		}

		// console.log('\n\n', ` // ${NO < 10 ? ' ': ''}`, NO, NAME);
		// console.log(`  ${CODE.startsWith('function ') ? CODE.replace(/\n/g, '\n  '):CODE}`);
		console.log('\n');
		console.log(`// ${NO < 10 ? ' ' : ''}`, NO, NAME);
		if (!excludeFunctionCode) {
			console.log(`${CODE.startsWith('function ') ? CODE : CODE.replace(/\n[ ][ ]/g, '\n')}`);
		}
	});
}

function displayObjects(
	OBJECTS: [string, object][],
	functionArray: Array<string>,
	stopLevel = 3,
	excludeFunctionCode = false,
) {
	console.log(`\nobject count: ${OBJECTS.length}`);
	// OBJECTS.forEach((item, index) => {
	// 	console.log((index + 1).toString().padStart(2).concat('. globalThis.', item[0]));
	// });

	OBJECTS.forEach((item, index) => {
		const [NAME, VALUE] = item;

		const NO = index + 1;
		console.log(NO, `globalThis.${NAME}`);

		// showPropertiesRecursion(VALUE, `globalThis.${NAME}`, NO.toString(), 0, 10);
		showPropertiesExcludeDuplicateFunctionsRecursion(
			VALUE,
			`globalThis.${NAME}`,
			NO.toString(),
			functionArray,
			0,
			stopLevel,
			excludeFunctionCode,
		);
	});
}
