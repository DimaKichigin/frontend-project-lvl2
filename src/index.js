import { readFileSync } from 'fs';
import _ from 'lodash';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// 1. загрузить 2 файла в программу

const readFile = (file) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fullPath = path.resolve(__dirname, '..', '__fixtures__', file);
  const data = readFileSync(fullPath, 'utf8');

  return data;
};
const genDiff = (dataParse1, dataParse2) => {
  const keys1 = _.keys(dataParse1);
  const keys2 = _.keys(dataParse2);
  const keys = _.union(keys1, keys2);

  const result = {};
  for (const key of keys) {
    // console.log(key, _.has(dataParse1, key), _.has(dataParse2, key));
  // if (!_.has(dataParse1, key)) {
  //   result[key] = '-';
  // } else if (!_.has(dataParse2, key)) {
  //   result[key] = '+';
  // } else if (dataParse1[key] !== dataParse2[key]) {
  //   result[key] = ''
  // } else {
  //   result[key] = ''
  // }
  }
  return result;
};
export default (filepath1, filepath2) => {
  // const data = readFileSync(path, 'utf8')
  // через readFileSync получаем пути до файлов, она читает путь и выдает данные

  // записываю в переменную данные с файлов
  // 2. распарсить 2 файла
  // const dataParse = JSON.parse(data); // JSON.parse парсить данные

  // в path приходят пути до файла из filepath1 и filepath2
  // записываю их в константы, на выходе 2 обьекта

  // const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  // const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf8');

  const file1 = readFile(filepath1);
  const file2 = readFile(filepath1); // 2

  console.log(file1);
  console.log(file2);

  const dataParse1 = JSON.parse(file1);
  const dataParse2 = JSON.parse(file2);

  console.log(genDiff(dataParse1, dataParse2));
  // 3. написать функцию для сравнения двух обьектов как в примере
};

// export default genDiff;
