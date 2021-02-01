import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import stringify from '../utils/stringify.js';

const parse = (data) => JSON.parse(data);

const genDiff = (filepath1, filepath2) => {
  const oldData = fs.readFileSync(path.resolve(filepath1));
  const newData = fs.readFileSync(path.resolve(filepath2));

  const parsedOldData = parse(oldData);
  const parsedNewData = parse(newData);

  console.log(parsedOldData, typeof (parsedOldData));
  console.log(parsedNewData, typeof (parsedNewData));

  const uniqKeys = new Set([...Object.keys(parsedOldData), ...Object.keys(parsedNewData)]);
  const sortedKeys = Array.from(uniqKeys).sort();
  console.log('sortedKeys:', sortedKeys);

  const result = sortedKeys.reduce((acc, key) => {
    if (!_.has(parsedNewData, key)) {
      acc[`- ${key}`] = parsedOldData[key];
      return acc;
    }
    if (!_.has(parsedOldData, key)) {
      acc[`+ ${key}`] = parsedNewData[key];
      return acc;
    }
    if (parsedNewData[key] === parsedOldData[key]) {
      acc[`  ${key}`] = parsedNewData[key];
      return acc;
    }
    acc[`- ${key}`] = parsedOldData[key];
    acc[`+ ${key}`] = parsedNewData[key];
    return acc;
  }, {});

  console.log(stringify(result));
};

export default genDiff;
