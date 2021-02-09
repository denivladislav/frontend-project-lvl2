const stringify = (value, replacer = '  ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }
    if (currentValue === null) {
      return 'null';
    }
    if (currentValue === undefined) {
      return 'undefined';
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const innerIndent = replacer.repeat(spacesCount);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        if (!key.startsWith('+ ') && !key.startsWith('- ') && !key.startsWith('  ')) {
          return `${currentIndent}${innerIndent}${key}: ${iter(val, depth + 2)}`;
        }
        return `${currentIndent}${key}: ${iter(val, depth + 2)}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default stringify;
