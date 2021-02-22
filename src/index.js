import path from 'path';
import fs from 'fs';
import buildDiffTree from './buildDiffTree.js';
import parse from './parsers.js';
import formatise from './formatters/index.js';

const getData = (filepath) => ({
  content: fs.readFileSync(path.resolve(filepath)),
  type: path.extname(filepath).slice(1).trim(),
});

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const parsedData1 = parse(data1);
  const parsedData2 = parse(data2);
  const finalResult = buildDiffTree(parsedData1, parsedData2);
  return formatise(finalResult, format);
};

export default genDiff;
