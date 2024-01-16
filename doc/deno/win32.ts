// https://deno.land/x/win@0.2.0
import {
    MB_OKCANCEL,
    MessageBoxA,
//   } from "https://deno.land/x/win@0.2.0/api/UI/WindowsAndMessaging.ts";
  } from "https://win32.deno.dev/0.4.1/UI.WindowsAndMessaging";

  const result = MessageBoxA(
    null,
    "Hello, world!",
    "Hello",
    MB_OKCANCEL,
  ); // 1 (OK) or 2 (Cancel)

console.log(result);

// import { MB_OKCANCEL, MessageBoxA } from "../api/UI/WindowsAndMessaging.ts";

// const result = MessageBoxA(
// null,
// "Hello, world!",
// "Hello",
// MB_OKCANCEL,
// );
// console.log(result);
