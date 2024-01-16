/*
 * Copyright (c) 2023 anqisoft@gmail.com
 * global.ts
 *
 * <en_us>
 * Created on Sun Dec 17 2023 08:04:52
 * Feature: Provide public types, constants, etc.
 * </en_us>
 *
 * <zh_cn>
 * 创建：2023年12月17日 08:04:52
 * 功能：提供公用类型、常量等。
 * </zh_cn>
 *
 * <zh_tw>
 * 創建：2023年12月17日 08:04:52
 * 功能：提供公用類型、常數等。
 * </zh_tw>
 */
'use strict';
exports.__esModule = true;
exports.I18N_DASH = exports.I18N_EXCLAMATION_MARK = exports.I18N_TILDE = exports.I18N_SEMICOLON = exports.I18N_COLON = exports.I18N_COMMA = exports.I18N_PERIOD = exports.I18N_AND_ITS_TYPEF_IS = exports.I18N_ITS_TYPEF_IS = exports.I18N_COLUMN_NAME_TYPE = exports.I18N_COLUMN_NAME_VALUE = exports.I18N_COLUMN_NAME_BOOLEAN = exports.I18N_COLUMN_NAME_DATA = exports.I18N_COLUMN_NAME_INDEX = exports.I18N_ERROR_CONDITION_NOT_MET = exports.I18N_ERROR_POSTFIX = exports.I18N_ERROR_FLAG = exports.I18N_ACTUAL_VALUE = exports.I18N_EXPECTED_VALUE = exports.I18N_NOT_SAME_ITEM_COUNT_POSTFIX = exports.I18N_CONCLUSION = exports.I18N_IS = exports.getChineseCharCount = exports.LanguageNames = exports.LANG = void 0;
/*
    <en_us>language</en_us>
    <zh_cn>语言</zh_cn>
    <zh_tw>語言</zh_tw>
*/
exports.LANG = 'en_us';
// export const LANG = 'zh_cn';
// export const LANG = 'zh_tw';
var LanguageNames;
(function (LanguageNames) {
    LanguageNames[LanguageNames["en_us"] = 0] = "en_us";
    LanguageNames[LanguageNames["zh_cn"] = 1] = "zh_cn";
    LanguageNames[LanguageNames["zh_tw"] = 2] = "zh_tw";
})(LanguageNames = exports.LanguageNames || (exports.LanguageNames = {}));
/**
 * <en_us>Get the number of Chinese characters.</en_us>
 * <zh_cn>获取中文字符数。</zh_cn>
 * <zh_tw>取得中文字元數。</zh_tw>
 *
 * @param str
 * <en_us>Raw string.</en_us>
 * <zh_cn>原始字符串。</zh_cn>
 * <zh_tw>原始字串。</zh_tw>
 *
 * @returns
 * <en_us>The number of Chinese characters is currently in the unicode range of \u4E00-\u9FCB.</en_us>
 * <zh_cn>中文字符数，目前取unicode为\u4E00-\u9FCB区间的。</zh_cn>
 * <zh_tw>中文字元數，目前取unicode為\u4E00-\u9FCB區間的。</zh_tw>
 */
function getChineseCharCount(str) {
    // https://cloud.tencent.com/developer/article/1820782
    return str.length - str.replace(/[\u4E00-\u9FCB]/g, '').length;
}
exports.getChineseCharCount = getChineseCharCount;
exports.I18N_IS = {
    en_us: ' is ',
    zh_cn: '是',
    zh_tw: '是'
}[exports.LANG];
exports.I18N_CONCLUSION = {
    en_us: 'Conclusion: ',
    zh_cn: '结论：',
    zh_tw: '結論：'
}[exports.LANG];
exports.I18N_NOT_SAME_ITEM_COUNT_POSTFIX = {
    en_us: ' items are not valid: ',
    zh_cn: '项不匹配：',
    zh_tw: '項不匹配：'
}[exports.LANG];
exports.I18N_EXPECTED_VALUE = {
    en_us: 'Expected: ',
    zh_cn: '期望值：',
    zh_tw: '期望值：'
}[exports.LANG];
exports.I18N_ACTUAL_VALUE = {
    en_us: 'Actual: ',
    zh_cn: '实际值：',
    zh_tw: '實際值：'
}[exports.LANG];
exports.I18N_ERROR_FLAG = {
    en_us: '[Error]',
    zh_cn: '【错误】',
    zh_tw: '【錯誤】'
}[exports.LANG];
exports.I18N_ERROR_POSTFIX = {
    en_us: ' is wrong.',
    zh_cn: '不正确。',
    zh_tw: '不正確。'
}[exports.LANG];
exports.I18N_ERROR_CONDITION_NOT_MET = {
    en_us: 'Condition not met.',
    zh_cn: '条件不满足。',
    zh_tw: '條件不滿足。'
}[exports.LANG];
exports.I18N_COLUMN_NAME_INDEX = {
    en_us: 'Index',
    zh_cn: ' 序号',
    zh_tw: ' 序號'
}[exports.LANG];
exports.I18N_COLUMN_NAME_DATA = {
    en_us: 'Data',
    zh_cn: '数据',
    zh_tw: '數據'
}[exports.LANG];
exports.I18N_COLUMN_NAME_BOOLEAN = {
    en_us: 'Boolean',
    zh_cn: '布尔',
    zh_tw: '布爾'
}[exports.LANG];
exports.I18N_COLUMN_NAME_VALUE = {
    en_us: 'Value',
    zh_cn: '   值',
    zh_tw: '   值'
}[exports.LANG];
exports.I18N_COLUMN_NAME_TYPE = {
    en_us: 'Type',
    zh_cn: ' 类型',
    zh_tw: ' 類型'
}[exports.LANG];
exports.I18N_ITS_TYPEF_IS = {
    en_us: 'its type is ',
    zh_cn: '类型是',
    zh_tw: '類型是'
}[exports.LANG];
exports.I18N_AND_ITS_TYPEF_IS = {
    en_us: ', and its type is ',
    zh_cn: '，类型是',
    zh_tw: '，類型是'
}[exports.LANG];
/*
    <en_us>period, dot or full stop</en_us>
    <zh_cn>句号</zh_cn>
    <zh_tw>句號</zh_tw>
*/
exports.I18N_PERIOD = {
    en_us: '.',
    zh_cn: '。',
    zh_tw: '。'
}[exports.LANG];
/*
    <en_us>comma</en_us>
    <zh_cn>逗号</zh_cn>
    <zh_tw>逗號</zh_tw>
*/
exports.I18N_COMMA = {
    en_us: ', ',
    zh_cn: '，',
    zh_tw: '，'
}[exports.LANG];
/*
    <en_us>colon</en_us>
    <zh_cn>冒号</zh_cn>
    <zh_tw>冒號</zh_tw>
*/
exports.I18N_COLON = {
    en_us: ': ',
    zh_cn: '：',
    zh_tw: '：'
}[exports.LANG];
/*
    <en_us>semicolon</en_us>
    <zh_cn>分号</zh_cn>
    <zh_tw>分號</zh_tw>
*/
exports.I18N_SEMICOLON = {
    en_us: ';',
    zh_cn: '；',
    zh_tw: '；'
}[exports.LANG];
/*
    <en_us>tilde</en_us>
    <zh_cn>波浪符</zh_cn>
    <zh_tw>波浪符</zh_tw>
*/
exports.I18N_TILDE = {
    en_us: '~',
    zh_cn: '~',
    zh_tw: '~'
}[exports.LANG];
/*
    <en_us>exclamation mark(en_bg), exclamation point(en_us)</en_us>
    <zh_cn>惊叹号</zh_cn>
    <zh_tw>驚嘆號</zh_tw>
*/
exports.I18N_EXCLAMATION_MARK = {
    en_us: '!',
    zh_cn: '！',
    zh_tw: '！'
}[exports.LANG];
/*
    <en_us>dash</en_us>
    <zh_cn>破折号</zh_cn>
    <zh_tw>破折號</zh_tw>
*/
exports.I18N_DASH = {
    en_us: '--',
    zh_cn: '——',
    zh_tw: '——'
}[exports.LANG];
