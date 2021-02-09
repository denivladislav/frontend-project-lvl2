// import _ from 'lodash';
import stringify from '../utils/stringify.js';
import buildTree from '../utils/buildTree.js';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const parsedData1 = parse(filepath1);
  const parsedData2 = parse(filepath2);

  const finalResult = (buildTree(parsedData1, parsedData2));
  console.log(finalResult);
  console.log(stringify(finalResult));
  return stringify(finalResult);
};

export default genDiff;
