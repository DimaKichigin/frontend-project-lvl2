import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fullPath = (file) => path.resolve(__dirname, '..', '__fixtures__', file);
const data = (file) => readFileSync(fullPath(file), 'utf8');

const filepath1 = fullPath('file1.json');
const filepath2 = fullPath('file2.json');

const ymlFile1 = fullPath('file3.yml');
const ymlFile2 = fullPath('file4.yml');

const expection1 = data('expection1.txt');
// const expection2 = ('expection2.txt');

test('correctness of comparing flat json files', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(expection1);
});

test('flat yml file comparison', () => {
  expect(genDiff(ymlFile1, ymlFile2)).toEqual(expection1);
});
