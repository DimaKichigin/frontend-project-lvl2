import _ from 'lodash';

import path from 'path';
import { readFileSync } from 'fs';

import getParse from './parsers.js';

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

const getData = (fullpath) => {
  // console.log(fullpath);
  const pathToFile = readFileSync(fullpath, 'utf8');
  const format = path.extname(fullpath).slice(1);
  // console.log(format);

  return getParse(pathToFile, format);
};

export default (filepath1, filepath2) => {
  // const dataParse1 = JSON.parse(file1);
  // const dataParse2 = JSON.parse(file2);

  const file1 = getData(filepath1);
  const file2 = getData(filepath2);
  const dataParse1 = getParse(file1);
  const dataParse2 = getParse(file2);
  //   // console.log(dataParse1);
  genDiff(dataParse1, dataParse2);
};
