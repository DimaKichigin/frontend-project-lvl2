import _ from 'lodash';

const firstIndent = 2;
const secondIndent = 4;
const spacer = ' ';

const makeIndent = (n) => spacer.repeat(n);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value) || value === null) {
    return value;
  }
  const result = Object
    .entries(value)
    .map(([key, property]) => {
      if (_.isPlainObject(property)) {
        return `${makeIndent(depth + firstIndent * secondIndent)}${key}: ${stringify(property, depth + secondIndent)}`;
      }
      return `${makeIndent(depth + firstIndent * secondIndent)}${key}: ${property}`;
    });

  return [
    '{',
    ...result,
    `${makeIndent(depth + secondIndent)}}`,
  ].join('\n');
};

const stylish = (obj) => {
  const iter = (values, depth) => {
    const result = values.map(({
      key, type, value, oldValue, newValue, children,
    }) => {
      switch (type) {
        case 'added':
          return `${makeIndent(depth + firstIndent)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${makeIndent(depth + firstIndent)}- ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${makeIndent(depth + firstIndent)}  ${key}: ${stringify(value, depth)}`;
        case 'nested':
          return `${makeIndent(depth + firstIndent)}  ${key}: ${iter(children, depth + firstIndent * 2)}`;
        case 'changed':
          return `${makeIndent(depth + firstIndent)}- ${key}: ${stringify(oldValue, depth)}\n${makeIndent(depth + firstIndent)}+ ${key}: ${stringify(newValue, depth)}`;
        default:
          throw new Error(`Wrong type ${type}`);
      }
    });
    return [
      '{',
      ...result,
      `${makeIndent(depth)}}`,
    ].join('\n');
  };
  return iter(obj, 0);
};

export default stylish;
