import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import readFile from './read_file.js';

const extentions = {
  json: '.json',
  yml: '.yml',
  yaml: '.yaml',
};
const getParse = (file) => {
  const extname = path.extname(file);
  let parse;
  switch (extname) {
    case extentions.json:
      parse = JSON.parse;
      break;
    case extentions.yml:
    case extentions.yaml:
      parse = yaml.safeLoad;
      break;
    // default:
    //   throw new Error(`Unsupported parse file extention ${extname}`);
  }
  // console.log(extname);
  return parse;
  // console.log(parse);
};
export default getParse;

// const format = path.extname(file);
// const data = fs.readSync(file);

// const parse = (file, format) => {
//   if (format === '.json') {
//     return JSON.parse(file);
//   }
//   if (format === '.yml') {
//     return yaml.safeLoad(file);
//   }
//   if (format === '.yaml') {
//     return yaml.safeLoad(file);
//   }
