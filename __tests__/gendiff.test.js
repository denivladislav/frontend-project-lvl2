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

const filepath1json = getFixturePath('file1plain.json');
const filepath2json = getFixturePath('file2plain.json');

const filepath1yml = getFixturePath('file1plain.yml');
const filepath2yml = getFixturePath('file2plain.yml');

test('plain', () => {
  expect(genDiff(filepath1json, filepath2json)).toEqual(resultJSON);
  expect(genDiff(filepath1yml, filepath2yml)).toEqual(resultyml);
  expect(genDiff(filepath1yml, filepath2json)).toEqual(resultJSON);
});
