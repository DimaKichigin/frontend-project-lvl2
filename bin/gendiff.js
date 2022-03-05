#!/usr/bin/env node
import command, { program } from 'commander';

program
  .option('--first')
  .option('-s, --separator <char>')
  .option('-h, --help');

program.parse();

const genDiff = (filepath1, filepath2) => {
  const result = 'result';
  return result;
};

export default genDiff;
