"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const stream_1 = require("stream");
// Читаємо дані з input.txt, перетворюємо рядки в верхній регістр і записуємо результат в output.txt
const readStream = fs.createReadStream('input.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('output.txt', { encoding: 'utf-8' });
class UpperCaseTransform extends stream_1.Transform {
    _transform(chunk, encoding, callback) {
        const upperCaseData = chunk.toString().toUpperCase();
        callback(null, upperCaseData);
    }
}
const transformStream = new UpperCaseTransform();
readStream.pipe(transformStream).pipe(writeStream);
console.log('Програма завершила виконання');
