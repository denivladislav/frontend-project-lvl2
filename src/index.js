import buildDiffTree from '../utils/buildDiffTree.js';
import makeStylish from '../utils/newStringify.js';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const parsedData1 = parse(filepath1);
  const parsedData2 = parse(filepath2);

  const finalResult = (buildDiffTree(parsedData1, parsedData2));
  console.log(makeStylish(finalResult));
  return makeStylish(finalResult);
};

export default genDiff;
