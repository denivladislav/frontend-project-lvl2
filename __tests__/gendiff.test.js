import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect } from '@jest/globals';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const plain1jJSONPath = getFixturePath('plain1.json');
const plain2JSONPath = getFixturePath('plain2.json');

const plain1ymlPath = getFixturePath('plain1.yml');
const plain2ymlPath = getFixturePath('plain2.yml');

const tree1JSONPath = getFixturePath('tree1.json');
const tree2JSONPath = getFixturePath('tree2.json');

const tree1yamlPath = getFixturePath('tree1.yaml');
const tree2yamlPath = getFixturePath('tree2.yaml');

const unsupportedFilePath = getFixturePath('unsupported.unsup');

const resultPlainJSON = readFile('resultPlainJSON.diff');
const resultPlainyml = readFile('resultPlainyml.diff');
const resultTreeJSON = readFile('resultTreeJSON.diff');
const resultTreeyaml = readFile('resultTreeyaml.diff');

test('unsupported format', () => {
  expect(() => {
    genDiff(unsupportedFilePath, plain1jJSONPath);
  }).toThrow();
});

test('plain', () => {
  expect(genDiff(plain1jJSONPath, plain2JSONPath)).toEqual(resultPlainJSON);
  expect(genDiff(plain1ymlPath, plain2ymlPath)).toEqual(resultPlainyml);
  expect(genDiff(plain1ymlPath, plain2JSONPath)).toEqual(resultPlainJSON);
});

test('tree', () => {
  expect(genDiff(tree1JSONPath, tree2JSONPath)).toEqual(resultTreeJSON);
  expect(genDiff(tree1yamlPath, tree2yamlPath)).toEqual(resultTreeyaml);
});
