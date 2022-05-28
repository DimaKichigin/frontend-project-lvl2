import { readFileSync } from 'fs';
import path from 'path';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const fullPath = (file) => path.resolve(process.cwd(), file);
const getContent = (file) => readFileSync(fullPath(file), 'utf8');

const expection1 = getContent('__fixtures__/expection1.txt');
const expection2 = getContent('__fixtures__/expection2.txt');
const expection3 = getContent('__fixtures__/expection3.txt');
const expection4 = getContent('__fixtures__/expection4.txt');

test.each(['json', 'yml'])('genDiff', (extention) => {
  const filepath1 = fullPath(`__fixtures__/file1.${extention}`);
  const filepath2 = fullPath(`__fixtures__/file2.${extention}`);
  const filepath3 = fullPath(`__fixtures__/file3.${extention}`);
  const filepath4 = fullPath(`__fixtures__/file4.${extention}`);
  const testFlatFile = genDiff(filepath1, filepath2);
  expect(testFlatFile).toBe(expection1);
  const testStylish = genDiff(filepath3, filepath4, 'stylish');
  expect(testStylish).toBe(expection2);
  const testPlain = genDiff(filepath3, filepath4, 'plain');
  expect(testPlain).toBe(expection3);
  const testJson = genDiff(filepath3, filepath4, 'json');
  expect(testJson).toBe(expection4);
});
