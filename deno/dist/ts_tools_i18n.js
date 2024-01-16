"use strict";
/*
 * Copyright (c) 2024 anqisoft@gmail.com
 * ts_tools_i18n.ts
 * Technology: deno, typescript.
 * i18n: ...<en_us>...</en_us>...<zh_cn>...</zh_cn>...<zh_tw>...</zh_tw>...
 *
 * Functions:
 *   splitComments(sourceFilename: string, commentFilesPath: string): boolean
 *   joinComments(sourceFilename: string, commentFilesPath: string): boolean
 *   splitReadmeFiles(sourceFilenames: string[]): boolean
 *   splitFiles(sourcePaths: string[]): boolean
 *
 * Usage:
 *   deno run --allow-read --allow-write ts_tools_i18n.ts splitComments ~sourceFilename~ ~commentFilesPath~
 *   deno run --allow-read --allow-write ts_tools_i18n.ts joinComments ~sourceFilename~ ~commentFilesPath~
 *   deno run --allow-read --allow-write ts_tools_i18n.ts splitReadmeFiles ~sourceFilename1~[ ~sourceFilename2~ [...]]
 *   deno run --allow-read --allow-write ts_tools_i18n.ts splitFiles ~sourcePath1~[ ~sourcePath2~ [...]]
 *
 * <en_us>
 * Created on Tue Jan 09 2024 11:28:16
 * Feature: For codes, documents, etc., translate simplified content (such as comments) into English and traditional Chinese, split files with three natural language contents into corresponding i18n directories, etc.
 * </en_us>
 *
 * <zh_cn>
 * 创建：2024年1月9日 11:28:16
 * 功能：
 * </zh_cn>
 *
 * <zh_tw>
 * 創建：2024年1月9日 11:28:16
 * 功能：
 * </zh_tw>
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.splitFiles = exports.splitReadmeFiles = exports.joinComments = exports.splitComments = void 0;
/* references:
https://github.com/luhuiguo/chinese-utils/
https://github.com/NLPchina/nlp-lang

https://github.com/uutool/hanzi-convert/
https://github.com/liuyueyi/quick-chinese-transfer
https://github.com/willonboy/ChineseToPinYin

https://github.com/luhuiguo/chinese-utils/blob/master/src/main/resources/simplified.txt

https://www.npmjs.com/package/hanzi-tools 1.2.26 • Public • Published 2 years ago
《汉字工具》是四种工具的集合。 Hanzi Tools is a collection of four different tools.
segment - 分词。 Divide text into words.
pinyinify - 转换汉字为拼音。 Convert Chinese characters to pinyin.
simplify - 转换简体汉字为繁体汉字。 Convert traditional characters to simplified characters.
traditionalize - 转换繁体汉字为简体汉字。 Convert simplified characters to traditional characters.
tag - 词性标注。 Part-of-speech tagging.

https://www.cnblogs.com/livelab/p/14111142.html

https://github.com/YuChunTsao/Translate
google translate. zh-TW to en
<script>
    function googleTranslateElementInit() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'zh-TW',
            autoDisplay: false
        }, 'google_translate_element');
        var a = document.querySelector("#google_translate_element select");
        a.selectedIndex=1;
        a.dispatchEvent(new Event('change'));
    }
</script>

<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
*/
/// <reference lib="deno.ns" />
var mod_ts_1 = require("https://deno.land/std@0.211.0/assert/mod.ts");
var path = require("https://deno.land/std@0.204.0/path/mod.ts");
// https://deno.land/std@0.211.0/fs/exists.ts exists, existsSync, ExistsOptions
// import { type ExistsOptions } from "https://deno.land/std@0.211.0/fs/exists.ts"; isReadable/isDirectory/isFile
var exists_ts_1 = require("https://deno.land/std@0.211.0/fs/exists.ts");
var separator_ts_1 = require("https://deno.land/std@0.211.0/path/separator.ts");
var index_ts_1 = require("./ts_cn_and_tw/index.ts");
// eg: { SEP: "\\", SEP_PATTERN: /[\\/]+/ }
var START_FLAG_LENGTH = 7;
var FILE_WRITE_MODE = { mode: 511 };
var FILE_WRITE_IF_NOT_EXIST_MODE = { createNew: true, mode: 511 };
function splitComments(sourceFilename, commentFilesPath) {
    try {
        var fileInfo = Deno.statSync(sourceFilename);
        mod_ts_1.assert(fileInfo.isFile);
        Deno.mkdirSync(commentFilesPath, { recursive: true });
        mod_ts_1.assert(Deno.statSync(commentFilesPath).isDirectory);
        var SOURCE_CONTENT = Deno.readTextFileSync(sourceFilename);
        // ...<en_us>...</en_us>...<zh_cn>...</zh_cn>...<zh_tw>...</zh_tw>...
        var SPLIT_LEVEL_ONE = SOURCE_CONTENT.split('<en_us>');
        // remove the first one.
        SPLIT_LEVEL_ONE.shift();
        var US_COMMENTS_1 = [];
        var CN_COMMENTS_1 = [];
        var TW_COMMENTS_1 = [];
        SPLIT_LEVEL_ONE.forEach(function (seg, index) {
            // ...</en_us>...<zh_cn>...</zh_cn>...<zh_tw>...</zh_tw>...
            var EN_US_END_POS = seg.indexOf('</en_us>');
            mod_ts_1.assert(EN_US_END_POS > -1, index + ": EN_US_END_POS not right.\n" + seg);
            var ZH_CN_START_POS = seg.indexOf('<zh_cn>');
            mod_ts_1.assert(ZH_CN_START_POS > EN_US_END_POS, index + ": ZH_CN_START_POS not right.\n" + seg);
            var ZH_CN_END_POS = seg.indexOf('</zh_cn>');
            mod_ts_1.assert(ZH_CN_END_POS > ZH_CN_START_POS, index + ": ZH_CN_END_POS not right.\n" + seg);
            var ZH_TW_START_POS = seg.indexOf('<zh_tw>');
            mod_ts_1.assert(ZH_TW_START_POS > ZH_CN_END_POS, index + ": ZH_TW_START_POS not right.\n" + seg);
            var ZH_TW_END_POS = seg.indexOf('</zh_tw>');
            mod_ts_1.assert(ZH_TW_END_POS > ZH_TW_START_POS, index + ": ZH_TW_END_POS not right.\n" + seg);
            var EN_US_COMMENT = seg.substring(0, EN_US_END_POS);
            var ZH_CN_COMMENT = seg.substring(ZH_CN_START_POS + START_FLAG_LENGTH, ZH_CN_END_POS);
            var ZH_TW_COMMENT = seg.substring(ZH_TW_START_POS + START_FLAG_LENGTH, ZH_TW_END_POS);
            US_COMMENTS_1.push("<en_us>" + EN_US_COMMENT + "</en_us>");
            CN_COMMENTS_1.push("<zh_cn>" + ZH_CN_COMMENT + "</zh_cn>");
            TW_COMMENTS_1.push("<zh_tw>" + ZH_TW_COMMENT + "</zh_tw>");
        });
        var GOAL_PATH_1 = path.join(commentFilesPath, sourceFilename.split(separator_ts_1.SEP).pop(), separator_ts_1.SEP);
        Deno.mkdirSync(GOAL_PATH_1, { recursive: true });
        [
            ['en_us', US_COMMENTS_1],
            ['zh_cn', CN_COMMENTS_1],
            ['zh_tw', TW_COMMENTS_1],
        ].forEach(function (langAndData, index) {
            var LANG = langAndData[0];
            var FILE_CONTENT = langAndData[1].join('\n');
            Deno.writeTextFileSync(path.join(GOAL_PATH_1, LANG + ".original.txt"), FILE_CONTENT, FILE_WRITE_MODE);
            var OTHER_FILENAME = path.join(GOAL_PATH_1, LANG + ".txt");
            if (!exists_ts_1.existsSync(OTHER_FILENAME)) {
                Deno.writeTextFileSync(OTHER_FILENAME, index === 2 ? index_ts_1.cn2tw(CN_COMMENTS_1.join('\n')) : FILE_CONTENT, FILE_WRITE_IF_NOT_EXIST_MODE);
            }
        });
        return true;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
exports.splitComments = splitComments;
function joinComments(sourceFilename, commentFilesPath) {
    try {
        var fileInfo = Deno.statSync(sourceFilename);
        mod_ts_1.assert(fileInfo.isFile);
        mod_ts_1.assert(Deno.statSync(commentFilesPath).isDirectory);
    }
    catch (e) {
        console.error(e);
        return false;
    }
    return true;
}
exports.joinComments = joinComments;
function splitReadmeFiles(sourceFilenames) {
    try {
    }
    catch (e) {
        console.error(e);
        return false;
    }
    return true;
}
exports.splitReadmeFiles = splitReadmeFiles;
function splitFiles(sourcePaths) {
    try {
    }
    catch (e) {
        console.error(e);
        return false;
    }
    return true;
}
exports.splitFiles = splitFiles;
(function () {
    var START_DATE = new Date();
    var _a = Deno.args, command = _a[0], source = _a[1], others = _a.slice(2);
    switch (command) {
        case 'splitComments':
            console.log(splitComments(source, others[0]));
            break;
        case 'joinComments':
            console.log(joinComments(source, others[0]));
            break;
        case 'splitReadmeFiles':
            console.log(splitReadmeFiles(__spreadArrays([source], others)));
            break;
        case 'splitFiles':
            console.log(splitFiles(__spreadArrays([source], others)));
            break;
        default:
            break;
    }
    var END_DATE = new Date();
    var USED_MILLISECONDS = END_DATE.getTime() - START_DATE.getTime();
    console.log('Used', USED_MILLISECONDS, 'milliseconds, it is equivalent to ', parseFloat((USED_MILLISECONDS / 1000).toFixed(4)));
})();
/*
https://github.com/dabing1022/Blog/blob/f078084798e360970782220860c0675e2c21502b/AlfredWorkFlows/GoogleTranslate/translate.py#L9
# coding: utf-8

import requests
import url

CN_EN_URL = 'http://translate.google.cn/#zh-CN/en/'
EN_CN_URL = 'http://translate.google.cn/#en/zh-CN/'

def cn2en(cnCotent):
    r = requests.get('https://api.github.com/user', auth=('user', 'pass'))
    print(r.json())

if __name__ == '__main__':
    cn2en('test')
*/
/*
https://github.com/qrpcode/letsPPT/blob/92f551c0b5a626b346f736b297e65221b6ad504e/pptbuilder/src/main/java/cc/pptshow/build/pptbuilder/util/TranslationUtil.java#L23
package cc.pptshow.build.pptbuilder.util;

import cc.pptshow.build.pptbuilder.constant.BConstant;
import cc.pptshow.build.pptbuilder.domain.vo.BaiduVo;
import cc.pptshow.build.pptbuilder.domain.vo.TransResult;
import cn.hutool.core.net.URLDecoder;
import cn.hutool.crypto.digest.MD5;
import com.alibaba.fastjson.JSON;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;

import java.nio.charset.StandardCharsets;
import java.util.Objects;
import java.util.Optional;

@Slf4j
public class TranslationUtil {

    private static final String APP_ID = "20210206000691977";
    private static final String APP_KEY = "aFPq9ypcAnaAzOQLFVbF";

    public static String cn2En(String query) {
        try {
            OkHttpClient client = new OkHttpClient().newBuilder()
                    .build();
            String salt = Long.toString(System.currentTimeMillis());
            String md5 = MD5.create().digestHex(APP_ID + query + salt + APP_KEY);
            Request request = new Request.Builder()
                    .url("http://api.fanyi.baidu.com/api/trans/vip/translate?q="
                            + URLDecoder.decode(query, StandardCharsets.UTF_8) +
                            "&from=zh&to=en&appid=" + APP_ID + "&salt=" + salt + "&sign=" + md5
                    )
                    .get()
                    .build();
            Response response = client.newCall(request).execute();
            BaiduVo baiduVo = JSON.parseObject(Objects.requireNonNull(response.body()).string(), BaiduVo.class);
            return Optional.ofNullable(baiduVo)
                    .map(BaiduVo::getTransResult)
                    .flatMap(l -> l.stream().findFirst())
                    .map(TransResult::getDst)
                    .orElse(BConstant.LOREM_IPSUM_EN);
        } catch (Throwable t) {
            log.error("[翻译出错] ", t);
            return BConstant.LOREM_IPSUM_EN;
        }
    }

}
*/
/*
https://github.com/diyanqi/GoogleTranslateMakeGrass
*/
