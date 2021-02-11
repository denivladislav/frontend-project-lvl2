import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const uniqKeys = new Set([...Object.keys(data1), ...Object.keys(data2)]);
  const sortedKeys = Array.from(uniqKeys).sort();
  return sortedKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, status: 'nested', children: buildDiffTree(data1[key], data2[key]) };
    }
    if (!_.has(data2, key)) {
      return { key, status: 'deleted', value: data1[key] };
    }
    if (!_.has(data1, key)) {
      return { key, status: 'added', value: data2[key] };
    }
    if (data2[key] === data1[key]) {
      return { key, status: 'unmodified', value: data2[key] };
    }
    return {
      key, status: 'modified', oldValue: data1[key], newValue: data2[key],
    };
  });
};

export default buildDiffTree;
