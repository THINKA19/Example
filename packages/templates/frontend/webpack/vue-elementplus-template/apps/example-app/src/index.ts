import { buildMessage } from "./message.js";

const name = process.env.APP_NAME ?? "world";
console.log(buildMessage(name, [1, 2, 3]));
