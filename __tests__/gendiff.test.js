import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultJSON = readFile('resultJSON.diff');
const resultyml = readFile('resultyml.diff');
const resulttree = readFile('resulttree.diff');

const plain1jsonpath = getFixturePath('plain1.json');
const plain2jsonpath = getFixturePath('plain2.json');

const plain1ymlpath = getFixturePath('plain1.yml');
const plain2ymlpath = getFixturePath('plain2.yml');

const tree1jsonpath = getFixturePath('tree1.json');
const tree2jsonpath = getFixturePath('tree2.json');

test('plain', () => {
  expect(genDiff(plain1jsonpath, plain2jsonpath)).toEqual(resultJSON);
  expect(genDiff(plain1ymlpath, plain2ymlpath)).toEqual(resultyml);
  expect(genDiff(plain1ymlpath, plain2jsonpath)).toEqual(resultJSON);
  expect(genDiff(tree1jsonpath, tree2jsonpath)).toEqual(resulttree);
});
