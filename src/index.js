import path from 'path';
import { data } from './read_file.js';

// import formatter from './formatters/stylish.js';
import diff from './formatters/diff.js';
import getParse from './parsers.js';

const getData = (file) => {
  const pathToFile = data(file);
  // console.log(pathToFile);
  const format = path.extname(file);
  // console.log(format);
  // console.log(getParse(pathToFile, format));
  return getParse(pathToFile, format);
};

const genDiff = (filepath1, filepath2) => {
  // console.log(filepath2);
  // console.log(stylish(getData(filepath2)));
  // console.log(getData(filepath2));
  const callDiff = diff(
    getData(filepath1),
    getData(filepath2),
  );
  return callDiff;
};
// console.log(filepath2);
// console.log(stylish(getData(filepath1)));
export default genDiff;

// const genDiff = (dataParse1, dataParse2) => {
//   const keys = _.union(_.keys(dataParse1), _.keys(dataParse2)).sort();

//   let result = '{';

//   const states = { new: '+', old: '-', unchanged: ' ' };
//   keys.map((key) => {
//     const value1 = dataParse1[key];
//     const value2 = dataParse2[key];

//     if (!_.has(dataParse1, key)) {
//       result += `
//   ${states.new} ${key}: ${value2}`;
//     } else if (!_.has(dataParse2, key)) {
//       result += `
//   ${states.old} ${key}: ${value1}`;
//     } else if (dataParse1[key] !== dataParse2[key]) {
//       result += `
//   ${states.old} ${key}: ${value1}
//   ${states.new} ${key}: ${value2}`;
//     } else {
//       result += `
//   ${states.unchanged} ${key}: ${value1}`;
//     }
//     return key;
//   });
//   return `${result}
// }`;
// };

// export default (filepath1, filepath2) => {
// const dataParse1 = getData(filepath1);
// const dataParse2 = getData(filepath2);

//   return genDiff(dataParse1, dataParse2);
// };

// export default (ymlFile1, ymlFile2) => {
//   const dataParse1 = getData(ymlFile1);
//   const dataParse2 = getData(ymlFile2);

//   return genDiff(dataParse1, dataParse2);
// };
