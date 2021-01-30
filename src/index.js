import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const parse = (data) => JSON.parse(data);

const genDiff = (filepath1, filepath2) => {
  const oldData = fs.readFileSync(path.resolve(filepath1));
  const newData = fs.readFileSync(path.resolve(filepath2));

  const parsedOldData = parse(oldData);
  const parsedNewData = parse(newData);
  console.log('!!!!', parsedOldData);

  console.log(parsedOldData, typeof(parsedOldData));
  console.log(parsedNewData, typeof(parsedNewData));

  const unsortedKeys = Array.from(new Set([...Object.keys(parsedOldData), ...Object.keys(parsedNewData)]));
  const keys = unsortedKeys.sort();
  console.log(keys);
  const result = keys.map((key) => {
    if (_.has(parsedOldData, key)) {
      if (_.has(parsedNewData, key)) {
        if (parsedOldData[key] === parsedNewData[key]) {
          return `  ${key}: ${parsedOldData[key]}`;
        }
        return `- ${key}: ${parsedOldData[key]}\n+ ${key}: ${parsedNewData[key]}`;
      }
    }
    return `+ ${key}: ${parsedNewData[key]}`;
  });
  console.log(result);
  result.unshift('{');
  result.push('}');
  console.log(`${result.join('\n')}`);
}

export default genDiff;