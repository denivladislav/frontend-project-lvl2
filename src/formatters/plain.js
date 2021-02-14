import _ from 'lodash';

const stringify = (currentValue) => {
  if (currentValue === null) {
    return 'null';
  }
  if (_.isBoolean(currentValue)) {
    return currentValue;
  }
  if (!_.isObject(currentValue)) {
    return `'${currentValue.toString()}'`;
  }
  return '[complex value]';
};

const makePlainTree = (tree) => {
  const iter = (nodes, pathToRoot = '') => (
    nodes.flatMap((node) => {
      const {
        key, value, status, oldValue, newValue, children,
      } = node;
      switch (status) {
        case 'deleted':
          return `Property '${pathToRoot}${key}' was removed`;
        case 'added':
          return `Property '${pathToRoot}${key}' was added with value: ${stringify(value)}`;
        case 'modified':
          return `Property '${pathToRoot}${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
        case 'unmodified':
          return '';
        case 'nested':
          return [...iter(children, `${pathToRoot}${key}.`)];
        default:
          throw new Error(`Unknown status: ${status}`);
      }
    })
  );
  const lines = iter(tree);
  return [...lines.filter((line) => line)].join('\n');
};

export default makePlainTree;
