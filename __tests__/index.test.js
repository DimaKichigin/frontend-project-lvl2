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
const ymlFile3 = fullPath('file3.yml');
const ymlFile4 = fullPath('file4.yml');
const filepath5 = fullPath('file5.json');
const filepath6 = fullPath('file6.json');
const ymlFile7 = fullPath('file7.yml');
const ymlFile8 = fullPath('file8.yml');

const expection1 = data('expection1.txt');
const expection2 = data('expection2.txt');
const expection3 = data('expection3.txt');
const expection4 = data('expection4.txt');

test('correctness of comparing flat json files', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(expection1);
});

test('flat yml file comparison', () => {
  expect(genDiff(ymlFile3, ymlFile4)).toEqual(expection1);
});

test('stylish comparison format', () => {
  expect(genDiff(filepath5, filepath6, 'stylish')).toEqual(expection2);
  expect(genDiff(ymlFile7, ymlFile8, 'stylish')).toEqual(expection2);
});

test('flat comparison format', () => {
  expect(genDiff(filepath5, filepath6, 'plain')).toEqual(expection3);
  expect(genDiff(ymlFile7, ymlFile8, 'plain')).toEqual(expection3);
});

test('json comparison format', () => {
  expect(genDiff(filepath5, filepath6, 'json')).toEqual(expection4);
  expect(genDiff(ymlFile7, ymlFile8, 'json')).toEqual(expection4);
});
