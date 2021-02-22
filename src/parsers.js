import yaml from 'js-yaml';

export default (data) => {
  switch (data.type) {
    case 'json':
      return JSON.parse(data.content);
    case 'yml':
      return yaml.load(data.content);
    case 'yaml':
      return yaml.load(data.content);
    default:
      throw new Error(`Unsupported file format: ${data.type}`);
  }
};
