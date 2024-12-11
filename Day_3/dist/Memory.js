"use strict";
// import * as fs from 'fs';
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// function calculateMulSum(inputFilePath: string): number {
//     const input = fs.readFileSync(inputFilePath, 'utf-8');
//     const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
//     let match;
//     let sum = 0;
//     while ((match = regex.exec(input)) !== null) {
//         const x = parseInt(match[1], 10);
//         const y = parseInt(match[2], 10);
//         sum += x * y;
//     }
//     return sum;
// }
// const inputFilePath = 'input.txt';
// const result = calculateMulSum(inputFilePath);
// console.log(`The sum of all valid mul results is: ${result}`);
// The sum of all valid mul results is: 173517243
const fs = __importStar(require("fs"));
function calculateMulWithControl(inputFilePath) {
    const input = fs.readFileSync(inputFilePath, 'utf-8');
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/;
    const allMatchesRegex = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g;
    let isEnabled = true;
    let sum = 0;
    const matches = input.match(allMatchesRegex) || [];
    console.log("Parsed Matches:", matches);
    for (const match of matches) {
        if (match === 'do()') {
            isEnabled = true;
            console.log("do() encountered. Mul enabled.");
        }
        else if (match === "don't()") {
            isEnabled = false;
            console.log("don't() encountered. Mul disabled.");
        }
        else if (mulRegex.test(match)) {
            if (isEnabled) {
                const mulMatch = mulRegex.exec(match);
                if (mulMatch) {
                    const x = parseInt(mulMatch[1], 10);
                    const y = parseInt(mulMatch[2], 10);
                    const result = x * y;
                    sum += result;
                    console.log(`Processed mul(${x}, ${y}): Result = ${result}, Total Sum = ${sum}`);
                }
            }
            else {
                console.log(`Skipped disabled mul: ${match}`);
            }
        }
    }
    return sum;
}
const inputFilePath = 'input.txt';
const result = calculateMulWithControl(inputFilePath);
console.log(`The sum of all enabled mul results is: ${result}`);
