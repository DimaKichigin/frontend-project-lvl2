import yaml from 'js-yaml';

const getParse = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    default:
      throw new Error(`Format ${format} is not supported.`);
  }
};

export default getParse;
