const getIndent = (depth, spacer = '*', spaceCount = 1) => spacer.repeat(spaceCount * depth);

const diff = (value, depth) => {
  if (typeof value !== 'object') {
    return value;
  }
  const values = Object.entries(value);
  return `{\n${values.map(([key, property]) => `${getIndent(depth + 2)} ${key}: ${diff(property, depth + 1)}`).join('\n')}\n${getIndent(depth + 1)}`;
//   const result = values.map(([key, property]) =>
// `${getIndent(depth + 1)}${key}: ${diff(property, depth + 2)}`);
};
//   return [
//     '{',
//     ...result,
//     `${getIndent(depth)}}`,
//   ].join('\n');
// };

export default diff;
