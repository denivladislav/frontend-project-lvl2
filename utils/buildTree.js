import _ from 'lodash';

const buildTree = (file1, file2) => {
  const uniqKeys = new Set([...Object.keys(file1), ...Object.keys(file2)]);
  const sortedKeys = Array.from(uniqKeys).sort();
  const result = sortedKeys.reduce((acc, key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      acc[`${key}`] = buildTree(file1[key], file2[key]);
      return acc;
    }
    if (!_.has(file2, key)) {
      acc[`- ${key}`] = file1[key];
      return acc;
    }
    if (!_.has(file1, key)) {
      acc[`+ ${key}`] = (file2[key]);
      return acc;
    }
    if (file2[key] === file1[key]) {
      acc[`  ${key}`] = file2[key];
      return acc;
    }
    acc[`- ${key}`] = file1[key];
    acc[`+ ${key}`] = file2[key];
    return acc;
  }, {});

  return result;
};

export default buildTree;
