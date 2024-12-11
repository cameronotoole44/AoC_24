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
const fs = __importStar(require("fs"));
function countXMASOccurrences(inputFilePath) {
    const input = fs.readFileSync(inputFilePath, 'utf-8');
    const grid = input.split('\n').map(line => line.trim());
    const word = "XMAS";
    const directions = [
        [0, 1], // right
        [1, 0], // down
        [1, 1], // down right diagonal
        [1, -1], // down-left diagonal
        [0, -1], // left
        [-1, 0], // up
        [-1, -1], // up-left diagonal
        [-1, 1], // up-right diagonal
    ];
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    function isValid(x, y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
    function matchesWord(startX, startY, dirX, dirY) {
        for (let i = 0; i < word.length; i++) {
            const newX = startX + i * dirX;
            const newY = startY + i * dirY;
            if (!isValid(newX, newY) || grid[newX][newY] !== word[i]) {
                return false;
            }
        }
        return true;
    }
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            for (const [dirX, dirY] of directions) {
                if (matchesWord(x, y, dirX, dirY)) {
                    count++;
                }
            }
        }
    }
    return count;
}
const inputFilePath = 'input.txt';
const result = countXMASOccurrences(inputFilePath);
console.log(`The total number of XMAS occurrences is: ${result}`);
