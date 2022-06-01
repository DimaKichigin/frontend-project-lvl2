import _ from 'lodash';

const stringify = (value, indentBase = 6, depth = 1, replacer = ' ') => {
  if (!_.isPlainObject(value) || value === null) {
    return value;
  }
  const result = Object
    .entries(value)
    .map(([key, property]) => `${replacer.repeat(indentBase * depth, depth + 1)}${key}: ${stringify(property, indentBase, depth + 1)}`);

  return [
    '{',
    ...result,
    `${replacer.repeat(depth * indentBase - indentBase)}}`,
  ].join('\n');
};

const stylish = (obj, indentBase = 4, replacer = ' ') => {
  const iter = (values, depth) => {
    const indent = replacer.repeat(depth * indentBase - 2);

    const result = values.map(({
      key, type, value, oldValue, newValue, children,
    }) => {
      switch (type) {
        case 'added':
          return `${indent}+ ${key}: ${stringify(value, indentBase, depth + 1, replacer)}`;
        case 'deleted':
          return `${indent}- ${key}: ${stringify(value, indentBase, depth + 1, replacer)}`;
        case 'unchanged':
          return `${indent}  ${key}: ${stringify(value, indentBase, depth + 1, replacer)}`;
        case 'nested':
          return `${indent}  ${key}: ${iter(children, depth + 1)}`;
        case 'changed':
          return `${indent}- ${key}: ${stringify(oldValue, indentBase, depth + 1, replacer)}\n${indent}+ ${key}: ${stringify(newValue, indentBase, depth + 1, replacer)}`;
        default:
          throw new Error(`Wrong type ${type}`);
      }
    });
    return [
      '{',
      ...result,
      `${replacer.repeat(depth * indentBase - indentBase)}}`,
    ].join('\n');
  };
  return iter(obj, 1);
};

export default stylish;
