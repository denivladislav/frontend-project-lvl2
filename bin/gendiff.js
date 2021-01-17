#!/usr/bin/env node
import commander from 'commander';
const program = commander.program;

program
  .description('Compares two configuration files and shows the difference.')
  .version('0.0.1', '-V, --version', 'output the version number')

program.parse();