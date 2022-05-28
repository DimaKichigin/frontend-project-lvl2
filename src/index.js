import path from 'path';
import getContent from './readFile.js';
import formatter from './formatters/formatter.js';
import diff from './diff.js';
import getParse from './parsers.js';

const getData = (content) => {
  const pathToFile = getContent(content);
  const format = path.extname(content).slice(1);
  return getParse(pathToFile, format);
};

const genDiff = (data1, data2, format = 'stylish') => {
  const callDiff = diff(
    getData(data1),
    getData(data2),
  );
  return formatter(callDiff, format);
};

export default genDiff;
