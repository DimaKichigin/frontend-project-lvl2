import { readFileSync } from 'fs';
import _ from 'lodash';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const readFile = (file) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fullPath = path.resolve(__dirname, '..', '__fixtures__', file);
  const data = readFileSync(fullPath, 'utf8');

  return data;
};
const genDiff = (dataParse1, dataParse2) => {
  const keys = _.union(_.keys(dataParse1), _.keys(dataParse2)).sort();
  let result = '{';

  const states = { new: '+', old: '-', unchanged: ' ' };
  keys.map((key) => {
    const value1 = dataParse1[key];
    const value2 = dataParse2[key];

    if (!_.has(dataParse1, key)) {
      result += `
      ${states.new} ${key}: ${value2}`;
    } else if (!_.has(dataParse2, key)) {
      result += `
      ${states.old} ${key}: ${value1}`;
    } else if (dataParse1[key] !== dataParse2[key]) {
      result += `
      ${states.old} ${key}: ${value1}
      ${states.new} ${key}: ${value2}`;
    } else {
      result += `
      ${states.unchanged} ${key}: ${value1}`;
    }
    return key;
  });
  return `${result}
}`;
};
export default (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const dataParse1 = JSON.parse(file1);
  const dataParse2 = JSON.parse(file2);

  console.log('Результат работы функции: ');
  console.log(genDiff(dataParse1, dataParse2));
  return genDiff(dataParse1, dataParse2);
  // genDiff(dataParse1, dataParse2);
};
