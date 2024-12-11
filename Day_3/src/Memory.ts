import * as fs from 'fs';

function calculateMulSum(inputFilePath: string): number {

    const input = fs.readFileSync(inputFilePath, 'utf-8');

    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

    let match;
    let sum = 0;

    while ((match = regex.exec(input)) !== null) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        sum += x * y;
    }

    return sum;
}


const inputFilePath = 'input.txt';
const result = calculateMulSum(inputFilePath);
console.log(`The sum of all valid mul results is: ${result}`);
