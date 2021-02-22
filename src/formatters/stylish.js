import _ from 'lodash';

const stringify = (currentValue, depth, leftIndent = '  ') => {
  if (currentValue === null) {
    return 'null';
  }
  if (!_.isObject(currentValue)) {
    return currentValue.toString();
  }
  const indentSize = depth * 2;
  const currentIndent = `${leftIndent}  ${'  '.repeat(indentSize)}`;
  const bracketIndent = `${leftIndent}  ${'  '.repeat(indentSize - 2)}`;
  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const makeStylishTree = (tree) => {
  const iter = (nodes, depth = 1, leftIndent = '  ') => (
    nodes.flatMap((node) => {
      const {
        key, value, type, oldValue, newValue, children,
      } = node;
      switch (type) {
        case 'deleted':
          return `${leftIndent}- ${key}: ${stringify(value, depth)}`;
        case 'added':
          return `${leftIndent}+ ${key}: ${stringify(value, depth)}`;
        case 'unmodified':
          return `${leftIndent}  ${key}: ${stringify(value, depth)}`;
        case 'modified':
          return [
            `${leftIndent}- ${key}: ${stringify(oldValue, depth)}`,
            `${leftIndent}+ ${key}: ${stringify(newValue, depth)}`,
          ];
        case 'nested':
          return [
            `${leftIndent}  ${key}: {`,
            ...iter(children, depth + 1, `  ${'    '.repeat(depth)}`),
            `${leftIndent}  }`];
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    })
  );

  const lines = iter(tree, 1);
  return ['{', ...lines, '}'];
};

export default (diffTree) => makeStylishTree(diffTree).join('\n');
