import _ from 'lodash';

const stringify = (currentValue) => {
  if (currentValue === null) {
    return null;
  }
  if (_.isObject(currentValue)) {
    return '[complex value]';
  }
  if (_.isString(currentValue)) {
    return `'${currentValue}'`;
  }
  return currentValue;
};

const makePlainTree = (tree) => {
  const iter = (nodes, pathToRoot = '') => (
    nodes.flatMap((node) => {
      const {
        key, value, type, oldValue, newValue, children,
      } = node;
      switch (type) {
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
          throw new Error(`Unknown type: ${type}`);
      }
    })
  );
  const lines = iter(tree);
  const filteredLines = lines.filter((line) => line);
  return [...filteredLines];
};

export default (diffTree) => makePlainTree(diffTree).join('\n');
