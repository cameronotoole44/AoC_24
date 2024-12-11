// import * as fs from 'fs';

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

import * as fs from 'fs';

function calculateMulWithControl(inputFilePath: string): number {
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
        } else if (match === "don't()") {
            isEnabled = false;
            console.log("don't() encountered. Mul disabled.");
        } else if (mulRegex.test(match)) {
            if (isEnabled) {
                const mulMatch = mulRegex.exec(match);
                if (mulMatch) {
                    const x = parseInt(mulMatch[1], 10);
                    const y = parseInt(mulMatch[2], 10);
                    const result = x * y;
                    sum += result;
                    console.log(`Processed mul(${x}, ${y}): Result = ${result}, Total Sum = ${sum}`);
                }
            } else {
                console.log(`Skipped disabled mul: ${match}`);
            }
        }
    }

    return sum;
}


const inputFilePath = 'input.txt';
const result = calculateMulWithControl(inputFilePath);
console.log(`The sum of all enabled mul results is: ${result}`);

// 