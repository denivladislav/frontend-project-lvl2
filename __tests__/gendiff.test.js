import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const resultJSON = fs.readFileSync(getFixturePath('resultJSON.diff'), 'utf-8');
const resultyml = fs.readFileSync(getFixturePath('resultyml.diff'), 'utf-8');

const filepath1json = getFixturePath('file1plain.json');
const filepath2json = getFixturePath('file2plain.json');

const filepath1yml = getFixturePath('file1plain.yml');
const filepath2yml = getFixturePath('file2plain.yml');

// eslint-disable-next-line no-undef
test('plain', () => {
  // eslint-disable-next-line no-undef
  expect(genDiff(filepath1json, filepath2json)).toEqual(resultJSON);
  // eslint-disable-next-line no-undef
  expect(genDiff(filepath1yml, filepath2yml)).toEqual(resultyml);
  // eslint-disable-next-line no-undef
  expect(genDiff(filepath1yml, filepath2json)).toEqual(resultJSON);
});
