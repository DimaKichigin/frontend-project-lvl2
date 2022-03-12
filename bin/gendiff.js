#!/usr/bin/env node

import { Command } from 'commander';

import genDiff from '../src/index.js';
// import genDiff from '..';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --vers', 'output the version number')
  // .arguments('<filepath1> <filepath2>')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });

program.parse(process.argv);
