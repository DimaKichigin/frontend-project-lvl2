// import { expect, toEqual } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fullPath = (file) => path.resolve(__dirname, '..', '__fixtures__', file);
const data = (file) => readFileSync(fullPath(file), 'utf8');

const fullPath1 = fullPath('file1.json');
const fullPath2 = fullPath('file2.json');

const expection = data('index.txt');
// console.log('Ожидаемый txt файл: ');
// console.log(expection);
test('correctness of comparing flat json files', () => {
  expect(genDiff(fullPath1, fullPath2)).toEqual(expection);
});
