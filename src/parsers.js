import yaml from 'js-yaml';

const getParse = (file, format) => {
  console.log(file);
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`Format ${format} is not supported.`);
  }
};

export default getParse;

// const extentions = {
//   json: '.json',
//   yml: '.yml',
//   yaml: '.yaml',
// };
// const getParse = (file) => {
//   const extname = path.extname(file);
//   // console.log(file);
//   let parse;
//   switch (extname) {
//     case extentions.json:
//       parse = JSON.parse;
//       // console.log(parse);
//       break;
//     case extentions.yml:
//     case extentions.yaml:
//       parse = yaml.safeLoad;
//       break;
//     // default:
//     //   throw new Error(`Unsupported parse file extention ${extname}`);
//   }
//   // console.log(extname);

//   return parse;
//   // console.log(parse);
// };
// console.log(getParse('file1.json'));
// export default getParse;
// export default (file, format) => {
//   const parsers = {
//     json: JSON.parse,
//     yml: yaml.safeLoad,
//     // ini: ini.parse,
//   };
//   const parse = parsers[format];
//   console.log(parse);
//   return parse(file);
// };

// const format = path.extname(file);

// const getParse = (file, format) => {
//   if (format === '.json') {
//     return JSON.parse(file);
//   }
//   if (format === '.yml') {
//     return yaml.safeLoad(file);
//   }
//   if (format === '.yaml') {
//     return yaml.safeLoad(file);
//   }
