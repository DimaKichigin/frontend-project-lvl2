import _ from 'lodash';

const makeIndent = (depth, spacer = ' ', spaceCount = 2) => spacer.repeat(depth * spaceCount - 2);

const stringify = (value, depth = 1) => {
  if (!_.isPlainObject(value) || value === null) {
    return value;
  }
  const result = Object
    .entries(value)
    .map(([key, property]) => `${makeIndent(depth + 5)}${key}: ${stringify(property, depth + 2)}`);

  return [
    '{',
    ...result,
    `${makeIndent(depth + 3)}}`,
  ].join('\n');
};

const stylish = (obj) => {
  const iter = (values, depth) => {
    // const spaceCount = 4;
    // const firstIndent = spaceCount * depth;
    // const secondIndent = spacer.repeat(firstIndent);
    // const thirdIndent = spacer.repeat(firstIndent - spaceCount);
    const result = values.map(({
      key, type, value, oldValue, newValue, children,
    }) => {
      switch (type) {
        case 'added':
          return `${makeIndent(depth + 2)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${makeIndent(depth + 2)}- ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${makeIndent(depth + 2)}  ${key}: ${stringify(value, depth)}`;
        case 'nested':
          return `${makeIndent(depth + 2)}  ${key}: ${iter(children, depth + 2)}`;
        case 'changed':
          return `${makeIndent(depth + 2)}- ${key}: ${stringify(oldValue, depth)}\n${makeIndent(depth + 2)}+ ${key}: ${stringify(newValue, depth)}`;
        default:
          throw new Error(`Wrong type ${type}`);
      }
    });
    return [
      '{',
      ...result,
      `${makeIndent(depth + 1)}}`,
    ].join('\n');
  };
  return iter(obj, 0);
};

export default stylish;
