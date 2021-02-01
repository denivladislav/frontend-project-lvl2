#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/index.js';

const { program } = commander;

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows the difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  });
program.parse();
