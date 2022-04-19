// import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const readFile = (file) => {
  console.log(file);
  const __filename = fileURLToPath(import.meta.url);
  console.log(__filename);
  const __dirname = dirname(__filename);
  // console.log(__dirname);
  const fullPath = path.resolve(__dirname, '..', '__fixtures__', file);
  // console.log(fullPath);
  return fullPath;
};
export default readFile;
