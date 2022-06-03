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
  const iter = (values, path) => {
    // if (typeof values !== 'object') {
    //   return values.toString();
    // }
    // console.log(values);
    const result = values
      .map(({
        key, type, value, oldValue, newValue, children,
      }) => {
        if (type === 'unchanged') {
          return stringify(value);
        }
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
