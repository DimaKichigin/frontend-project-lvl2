import _ from 'lodash';
import yaml from 'js-yaml';
// import path from 'path';
import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
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
  // const file1 = readFile(filepath1);
  // const file2 = readFile(filepath2);
  // console.log(filepath1);
  // const data = readFileSync(fullPath, 'utf8');
  // const file1 = readFile(readFileSync(filepath1, 'utf8'));
  // const file2 = readFile(readFileSync(filepath2, 'utf8'));
  // console.log(file1);

  // const data = (way) => {
  //   const extname = path.extname(way);
  // const obj = readFileSync(way, 'utf8')
  // return getParse(obj, format)

  // }

  //   const extentions = {
  //     json: '.json',
  //     yml: '.yml',
  //     yaml: '.yaml',
  //   };
  //   const getParse = (obj, format) => {
  //     // const extname = path.extname(file);
  //     // console.log(file);
  //     let parse;
  //     switch (extname) {
  //       case extentions.json:
  //         parse = JSON.parse;
  //         // console.log(parse);
  //         break;
  //       case extentions.yml:
  //       case extentions.yaml:
  //         parse = yaml.safeLoad;
  //         break;
  //       // default:
  //       //   throw new Error(`Unsupported parse file extention ${extname}`);
  //     }
  //     // console.log(extname);

  //     return parse;
  //     // console.log(parse);
  //   };

  // const getParse = (file) => {
  //   // const obj = readFile(readFileSync(file, 'utf8'));
  //   const format = path.extname(file);

  //   // console.log(file);
  //   // console.log(format);
  //   switch (format) {
  //     case '.json':
  //       return JSON.parse(file);
  //     case '.yml':
  //     case '.yaml':
  //       return yaml.load(file);
  //     default:
  //       throw new Error(`Format ${format} is not supported.`);
  //   }
  // };
  // const getParse = (file, format) => {
  //   // console.log(file);
  //   console.log(format);
  //   if (format === '.json') {
  //     return JSON.parse(file);
  //   }
  //   if (format === '.yml') {
  //     return yaml.safeLoad(file);
  //   }
  //   if (format === '.yaml') {
  //     return yaml.safeLoad(file);
  //   }
  // };
  // console.log(getParse('file1', 'json'));

  // const dataParse1 = JSON.parse(file1);
  // const dataParse2 = JSON.parse(file2);

  // console.log(dataParse2);
  // const dataSafeLoad1 = getParse(filepath1);
  // const dataSafeLoad2 = getParse(filepath2);

  const dataParse1 = getParse(file1);
  const dataParse2 = getParse(file2);
  // console.log(dataParse1);
  return genDiff(dataParse1, dataParse2);
};
