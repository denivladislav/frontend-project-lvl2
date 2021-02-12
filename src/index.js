import buildDiffTree from '../utils/buildDiffTree.js';
import parse from './parsers.js';
import formatise from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const parsedData1 = parse(filepath1);
  const parsedData2 = parse(filepath2);
  const finalResult = (buildDiffTree(parsedData1, parsedData2));
  return formatise(finalResult, format);
};

export default genDiff;
