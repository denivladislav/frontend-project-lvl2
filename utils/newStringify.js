import _ from 'lodash';

const stringify = (value, replacer = '-|', addSpacesCount, spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    if (currentValue === null) {
      return 'null';
    }
    if (!_.isObject(currentValue)) {
      return currentValue.toString();
    }
    const indentSize = depth * spacesCount;
    let currentIndent = replacer.repeat(indentSize);
    let bracketIndent = replacer.repeat(indentSize - spacesCount);
    if (addSpacesCount > 1) {
      currentIndent += replacer.repeat(addSpacesCount);
      bracketIndent += replacer.repeat(addSpacesCount);
    }
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 2);
};

const stylish = (array) => {
  const iter = (nodes, depth = 1, indent = '  ') => (
    nodes.flatMap((node) => {
      const {
        key, value, status, oldValue, newValue, children,
      } = node;
      switch (status) {
        case 'deleted':
          return `${indent}- ${key}: ${stringify(value, '  ', depth)}`;
        case 'added':
          return `${indent}+ ${key}: ${stringify(value, '  ', depth)}`;
        case 'unmodified':
          return `${indent}  ${key}: ${stringify(value, '  ', depth)}`;
        case 'modified':
          return [
            `${indent}- ${key}: ${stringify(oldValue, '  ', depth)}`,
            `${indent}+ ${key}: ${stringify(newValue, '  ', depth)}`,
          ];
        case 'nested':
          return [
            `${indent}  ${key}: {`,
            ...iter(children, depth + 1, `  ${'    '.repeat(depth)}`),
            `${indent}  }`];
        default:
          throw new Error('Unknown status');
      }
    })
  );

  const lines = iter(array, 1);
  return ['{', ...lines, '}'];
};

const makeStylish = (tree) => stylish(tree).join('\n');

export default makeStylish;