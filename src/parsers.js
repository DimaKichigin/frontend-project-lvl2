import yaml from 'js-yaml';

const getParse = (file, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
    case '.yaml':
      return yaml.load(file);
    default:
      throw new Error(`Format ${format} is not supported.`);
  }
};

export default getParse;
