import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const readFile = (file) => {
  // console.log(file);
  const __filename = fileURLToPath(import.meta.url);
  // console.log(__filename);
  const __dirname = dirname(__filename);
  // console.log(__dirname);
  const fullPath = path.resolve(__dirname, '..', '__fixtures__', file);
  // console.log(fullPath);
  return fullPath;
  // const data = readFileSync(fullPath, 'utf8');
  // console.log(data);
  // return data;
};
export default readFile;

const getData = (fullpath) => {
  // console.log(fullpath);
  // const pathToFile = readFileSync(path.resolve(process.cwd(), file.trim()), 'utf-8');
  const pathToFile = readFileSync(fullpath, 'utf8');
  const format = path.extname(fullpath).slice(1);
  // console.log(format);
  return getParse(pathToFile, format);
};
