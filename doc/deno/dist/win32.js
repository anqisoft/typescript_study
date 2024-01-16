"use strict";
exports.__esModule = true;
// https://deno.land/x/win@0.2.0
var UI_WindowsAndMessaging_1 = require("https://win32.deno.dev/0.4.1/UI.WindowsAndMessaging");
var result = UI_WindowsAndMessaging_1.MessageBoxA(null, "Hello, world!", "Hello", UI_WindowsAndMessaging_1.MB_OKCANCEL); // 1 (OK) or 2 (Cancel)
console.log(result);
// import { MB_OKCANCEL, MessageBoxA } from "../api/UI/WindowsAndMessaging.ts";
// const result = MessageBoxA(
// null,
// "Hello, world!",
// "Hello",
// MB_OKCANCEL,
// );
// console.log(result);
