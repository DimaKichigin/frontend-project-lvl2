const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (obj) => {
  const iter = (nodes, path) => {
    const result = nodes
      .filter((node) => node.type !== 'unchanged')
      .map((node) => {
        const { type, key } = node;
        const keyName = [...path, key].join('.');
        switch (type) {
          case 'added': {
            const { value } = node;
            return `Property '${keyName}' was added with value: ${stringify(value)}`;
          }
          case 'deleted':
            return `Property '${keyName}' was removed`;
          case 'nested': {
            const { children } = node;
            return `${iter(children, [...path, key])}`;
          }
          case 'changed': {
            const { oldValue, newValue } = node;
            return `Property '${keyName}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
          }
          default:
            throw new Error(`Wrong type ${type}`);
        }
      });
    return result.join('\n');
  };

  return iter(obj, []);
};

export default plain;
