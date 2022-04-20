import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
// console.log(__filename);
const __dirname = dirname(__filename);
// console.log(__dirname);
export const fullPath = (file) => path.resolve(__dirname, '..', '__fixtures__', file);
export const data = (file) => readFileSync(fullPath(file), 'utf8');
