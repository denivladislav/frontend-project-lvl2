import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const uniqKeys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(uniqKeys);
  return sortedKeys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, type: 'nested', children: buildDiffTree(data1[key], data2[key]) };
    }
    if (!_.isEqual(data2[key], data1[key])) {
      return {
        key, type: 'modified', oldValue: data1[key], newValue: data2[key],
      };
    }
    return { key, type: 'unmodified', value: data2[key] };
  });
};

export default buildDiffTree;
