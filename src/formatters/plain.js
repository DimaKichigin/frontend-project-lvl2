const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (value === null) {
    return null;
  }
  return value;
};

const plain = (obj) => {
  const iter = (values, path) => {
    const result = values.filter(({ type }) => type !== 'unchanged').map(({
      key, type, value, oldValue, newValue, children,
    }) => {
      const keys = [...path, key];
      const name = keys.join('.');
      switch (type) {
        case 'added':
          return `Property '${name}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${name}' was removed`;
        case 'nested':
          return `${iter(children, keys)}`;
        case 'changed':
          return `Property '${name}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
        default:
          throw new Error(`Wrong type ${type}`);
      }
    });
    return result.join('\n');
  };
  return iter(obj, []);
};
export default plain;
