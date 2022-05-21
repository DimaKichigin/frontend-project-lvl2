import path from 'path';
import { data } from './read_file.js';
import formatter from './formatters/formatter.js';
import diff from './formatters/diff.js';
import getParse from './parsers.js';

const getData = (file) => {
  const pathToFile = data(file);
  const format = path.extname(file);
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
