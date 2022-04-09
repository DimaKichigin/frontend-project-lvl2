import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const readFile = (file) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fullPath = path.resolve(__dirname, '..', '__fixtures__', file);
  const data = readFileSync(fullPath, 'utf8');

  return data;
};
export default readFile;
