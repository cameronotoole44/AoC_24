import * as fs from 'fs';

function countXMASOccurrences(inputFilePath: string): number {
    const input = fs.readFileSync(inputFilePath, 'utf-8');
    const grid = input.split('\n').map(line => line.trim());
    const word = "XMAS";
    const directions = [
        [0, 1],  // right
        [1, 0],  // down
        [1, 1],  // down right diagonal
        [1, -1], // down-left diagonal
        [0, -1], // left
        [-1, 0], // up
        [-1, -1], // up-left diagonal
        [-1, 1],  // up-right diagonal
    ];

    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function isValid(x: number, y: number): boolean {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }

    function matchesWord(startX: number, startY: number, dirX: number, dirY: number): boolean {
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
