import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect } from '@jest/globals';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const tree1JSONPath = getFixturePath('tree1.json');
const tree2JSONPath = getFixturePath('tree2.json');

const tree1yamlPath = getFixturePath('tree1.yaml');
const tree2ymlPath = getFixturePath('tree2.yml');

const resultTreeJSON = readFile('resultTreeJSON.diff');
const resultTreeyaml = readFile('resultTreeyaml.diff');
const resultTreeFormatPlain = readFile('resultTreeFormatPlain.diff');
const resultTreeFormatJSON = readFile('resultTreeFormatJSON.diff');

test('tree, stylish format', () => {
  expect(genDiff(tree1JSONPath, tree2JSONPath)).toEqual(resultTreeJSON);
  expect(genDiff(tree1yamlPath, tree2ymlPath)).toEqual(resultTreeyaml);
});

test('tree, plain format', () => {
  expect(genDiff(tree1JSONPath, tree2JSONPath, 'plain')).toEqual(resultTreeFormatPlain);
});

test('tree, JSON format', () => {
  expect(genDiff(tree1JSONPath, tree2JSONPath, 'json')).toEqual(resultTreeFormatJSON);
});
