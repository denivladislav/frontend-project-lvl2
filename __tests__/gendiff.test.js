import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const result = fs.readFileSync(getFixturePath('result.diff'), 'utf-8');
console.log(result);

const filepath1 = getFixturePath('file1plain.json');
const filepath2 = getFixturePath('file2plain.json');

// eslint-disable-next-line no-undef
test('plain', () => {
  // eslint-disable-next-line no-undef
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});
