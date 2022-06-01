import { readFileSync } from 'fs';
import path from 'path';

// const fullPath = (file) => path.resolve(process.cwd(), file);
// const getContent = (file) => readFileSync(fullPath(file), 'utf8');

const getContent = (filePath) => readFileSync(filePath, 'utf-8');

export default getContent;
