import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (filepath) => {
  const extname = path.extname(filepath).slice(1).trim();
  const data = fs.readFileSync(path.resolve(filepath));
  switch (extname) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported file format: ${extname}`);
  }
};
