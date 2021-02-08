import _ from 'lodash';
import stringify from '../utils/stringify.js';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const parsedData1 = parse(filepath1);
  const parsedData2 = parse(filepath2);

  const uniqKeys = new Set([...Object.keys(parsedData1), ...Object.keys(parsedData2)]);
  const sortedKeys = Array.from(uniqKeys).sort();

  const result = sortedKeys.reduce((acc, key) => {
    if (!_.has(parsedData2, key)) {
      acc[`- ${key}`] = parsedData1[key];
      return acc;
    }
    if (!_.has(parsedData1, key)) {
      acc[`+ ${key}`] = parsedData2[key];
      return acc;
    }
    if (parsedData2[key] === parsedData1[key]) {
      acc[`  ${key}`] = parsedData2[key];
      return acc;
    }
    acc[`- ${key}`] = parsedData1[key];
    acc[`+ ${key}`] = parsedData2[key];
    return acc;
  }, {});

  console.log(stringify(result));
  return stringify(result);
};

export default genDiff;
