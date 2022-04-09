import _ from 'lodash';
import getParse from './parsers.js';
import readFile from './read_file.js';

const genDiff = (dataParse1, dataParse2) => {
  const keys = _.union(_.keys(dataParse1), _.keys(dataParse2)).sort();

  // let result = '';

  // const states = { new: '+', old: '-', unchanged: ' ' };
  // const resultObj = keys.map((key) => {
  //   const value1 = dataParse1[key];
  //   const value2 = dataParse2[key];

  //   if (!_.has(dataParse1, key)) {
  //     return `${states.new} ${key}: ${value2}`;
  //   } if (!_.has(dataParse2, key)) {
  //     return `${states.old} ${key}: ${value1}`;
  //   } if (dataParse1[key] !== dataParse2[key]) {
  //     return `${states.old} ${key}: ${value1}
  // ${states.new} ${key}: ${value2}`;
  //   }
  //   return `${states.unchanged} ${key}: ${value1}`;
  // });
  // result = `{
  //   ${resultObj.join('\n')}
  // }`;

  // return result;

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

  const dataParse1 = getParse(file1);
  const dataParse2 = getParse(file2);

  const dataSafeLoad1 = getParse(filepath1);
  const dataSafeLoad2 = getParse(filepath2);

  return genDiff(dataParse1, dataParse2);
};
