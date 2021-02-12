import makeStylish from './stylish.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return makeStylish(data);
    default:
      throw new Error(`Unsupported output format: ${format}`);
  }
};
