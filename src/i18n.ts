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

/*
    <en_us>International language list</en_us>
    <zh_cn>国际化语言清单</zh_cn>
    <zh_tw>國際化語言清單</zh_tw>
*/
export type Language = 'en_us' | 'zh_cn' | 'zh_tw';

/*
    <en_us>language</en_us>
    <zh_cn>语言</zh_cn>
    <zh_tw>語言</zh_tw>
*/
export const LANG: Language = 'en_us';
// export const LANG = 'zh_cn';
// export const LANG = 'zh_tw';

export enum LanguageNames {
	'en_us',
	'zh_cn',
	'zh_tw',
}

/*
    <en_us>i18n</en_us>
    <zh_cn>国际化</zh_cn>
    <zh_tw>國際化</zh_tw>
*/
export interface I18nInfo {
	[key: string]: string;

	en_us: string;
	zh_cn: string;
	zh_tw: string;
}

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
export function getChineseCharCount(str: string): number {
	// https://cloud.tencent.com/developer/article/1820782
	return str.length - str.replace(/[\u4E00-\u9FCB]/g, '').length;
}

export const I18N_IS = {
	en_us: ' is ',
	zh_cn: '是',
	zh_tw: '是',
}[LANG];

export const I18N_CONCLUSION = {
	en_us: 'Conclusion: ',
	zh_cn: '结论：',
	zh_tw: '結論：',
}[LANG];

export const I18N_NOT_SAME_ITEM_COUNT_POSTFIX = {
	en_us: ' items are not valid: ',
	zh_cn: '项不匹配：',
	zh_tw: '項不匹配：',
}[LANG];

export const I18N_EXPECTED_VALUE = {
	en_us: 'Expected: ',
	zh_cn: '期望值：',
	zh_tw: '期望值：',
}[LANG];

export const I18N_ACTUAL_VALUE = {
	en_us: 'Actual: ',
	zh_cn: '实际值：',
	zh_tw: '實際值：',
}[LANG];

export const I18N_ERROR_FLAG = {
	en_us: '[Error]',
	zh_cn: '【错误】',
	zh_tw: '【錯誤】',
}[LANG];

export const I18N_ERROR_POSTFIX = {
	en_us: ' is wrong.',
	zh_cn: '不正确。',
	zh_tw: '不正確。',
}[LANG];

export const I18N_ERROR_CONDITION_NOT_MET = {
	en_us: 'Condition not met.',
	zh_cn: '条件不满足。',
	zh_tw: '條件不滿足。',
}[LANG];

export const I18N_COLUMN_NAME_INDEX = {
	en_us: 'Index',
	zh_cn: ' 序号',
	zh_tw: ' 序號',
}[LANG];

export const I18N_COLUMN_NAME_DATA = {
	en_us: 'Data',
	zh_cn: '数据',
	zh_tw: '數據',
}[LANG];

export const I18N_COLUMN_NAME_BOOLEAN = {
	en_us: 'Boolean',
	zh_cn: '布尔',
	zh_tw: '布爾',
}[LANG];

export const I18N_COLUMN_NAME_VALUE = {
	en_us: 'Value',
	zh_cn: '   值',
	zh_tw: '   值',
}[LANG];

export const I18N_COLUMN_NAME_TYPE = {
	en_us: 'Type',
	zh_cn: ' 类型',
	zh_tw: ' 類型',
}[LANG];

export const I18N_ITS_TYPEF_IS = {
	en_us: 'its type is ',
	zh_cn: '类型是',
	zh_tw: '類型是',
}[LANG];

export const I18N_AND_ITS_TYPEF_IS = {
	en_us: ', and its type is ',
	zh_cn: '，类型是',
	zh_tw: '，類型是',
}[LANG];

/*
	<en_us>period, dot or full stop</en_us>
	<zh_cn>句号</zh_cn>
	<zh_tw>句號</zh_tw>
*/
export const I18N_PERIOD = {
	en_us: '.',
	zh_cn: '。',
	zh_tw: '。',
}[LANG];
/*
	<en_us>comma</en_us>
	<zh_cn>逗号</zh_cn>
	<zh_tw>逗號</zh_tw>
*/
export const I18N_COMMA = {
	en_us: ', ',
	zh_cn: '，',
	zh_tw: '，',
}[LANG];
/*
	<en_us>colon</en_us>
	<zh_cn>冒号</zh_cn>
	<zh_tw>冒號</zh_tw>
*/
export const I18N_COLON = {
	en_us: ': ',
	zh_cn: '：',
	zh_tw: '：',
}[LANG];
/*
	<en_us>semicolon</en_us>
	<zh_cn>分号</zh_cn>
	<zh_tw>分號</zh_tw>
*/
export const I18N_SEMICOLON = {
	en_us: ';',
	zh_cn: '；',
	zh_tw: '；',
}[LANG];
/*
	<en_us>tilde</en_us>
	<zh_cn>波浪符</zh_cn>
	<zh_tw>波浪符</zh_tw>
*/
export const I18N_TILDE = {
	en_us: '~',
	zh_cn: '~',
	zh_tw: '~',
}[LANG];
/*
	<en_us>exclamation mark(en_bg), exclamation point(en_us)</en_us>
	<zh_cn>惊叹号</zh_cn>
	<zh_tw>驚嘆號</zh_tw>
*/
export const I18N_EXCLAMATION_MARK = {
	en_us: '!',
	zh_cn: '！',
	zh_tw: '！',
}[LANG];

/*
	<en_us>dash</en_us>
	<zh_cn>破折号</zh_cn>
	<zh_tw>破折號</zh_tw>
*/
export const I18N_DASH = {
	en_us: '--',
	zh_cn: '——',
	zh_tw: '——',
}[LANG];

// /*
//     <en_us>test</en_us>
//     <zh_cn>测试</zh_cn>
//     <zh_tw>測試</zh_tw>
// */
// (() => {
//     const MESSAGE: I18nInfo = {
//         en_us: 'en',
//         zh_cn: '简体',
//         zh_tw: '繁體',
//     };

//     console.log(MESSAGE[LANG]);
// })();

/*
<en_us></en_us><zh_cn>打印机</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>内存</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>以太网</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>以太网</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>光标</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>光盘</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>光驱</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>软驱</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>总线</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>盘片</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>硬件</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>硬盘</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>磁盘</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>磁道</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>端口</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>端口</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>接口</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>算子</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>算法</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>芯片</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>芯片组</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>芯片</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>闪存</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>鼠标</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>U盘</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>二极管</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>三极管</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>声卡</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>扫描仪</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>调制解调器</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>笔记本电脑</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>数码</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>网络</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>服务器</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>局域网</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>个人数字助理</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>拨号上网</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>高速缓存</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>高速缓存</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>蓝牙</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>机器人</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>宏指令</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>宏病毒</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>程序</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>程序库</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>程序代码</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>头文件</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>驱动程序</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>软件</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>软盘</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>图标</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>桌面</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>滚动条</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>短信</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>数据库</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>操作系统</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>函数</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>函数库</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>面向对象</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>面向服務架构</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>构造函数</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>析构函数</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>扩展名</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>模块</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>伪代码</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>集成</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>默认</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>串行</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>位图</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>例程</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>全角</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>兼容</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>前缀</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>后缀</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>加载</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>半角</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>变量</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>噪声</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>在线</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>字体文件</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>字体</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>字段</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>字符</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>字节</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>存盘</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>寻址</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>尾注</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>异步</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>打印</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>括号</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>控件</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>权限</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>词组</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>交互式</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>优先级</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>传感</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>便携式</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>信息论</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>循环</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>写保护</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>分辨率</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>人工智能</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>因特网</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>移动电话</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>移动电话</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>宽带</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>链接</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>域名</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>带宽</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>创建</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>打开</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>数据结构</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>模拟</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>固件</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>文件</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>可执行文件</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>网上邻居</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>回收站</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>知识产权</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>纯文本</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>图像</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>控制键</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>数字修复</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>脚本</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>插件</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>源代码</zh_cn><zh_tw></zh_tw>
<en_us></en_us><zh_cn>实时</zh_cn><zh_tw></zh_tw>
*/
