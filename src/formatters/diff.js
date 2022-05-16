import _ from 'lodash';

const stringify = (obj) => {
  if (!_.isObject(obj) || obj === null) {
    return `${obj}`;
  }
  const objects = Object.entries(obj);
  const result = objects.flatMap(([key, property]) => `${key}: ${stringify(property)}`);
  return [result].join('\n');
};

//   const keys = Object.entries(obj);
//   const result = keys.reduce((acc, [key, property]) => ({ ...acc, [key]: stringify(property)) }), {});
//   return [result].join('\n');
// };

// const stringify = (value, spacer = ' ', spaceCount = 1) => {
//   const iter = (node, depth) => {
//     if (typeof node !== 'object' || node === null) {
//       return `${node}`;
//     }
//     const values = Object.entries(node);

//     const dep = spaceCount * depth;

//     const spac = spacer.repeat(dep);
//     // console.log(spac)

//     const result = values.map(([key, property]) =>
//     // if (typeof property === 'object' || property === null) {

//       `${spac}${key}: ${iter(property, depth + 1)}`,
//       // }
//       // return `${spac}${key}: ${property}`
//     );

//     return ['{',
//       ...result,
//       `${spacer.repeat(dep - spaceCount)}}`,
//     ].join('\n');
//   };

//   return iter(value, 1);
// };

const diff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const commonKeys = _.sortBy(_.union(keys1, keys2));

  const result = commonKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { name: key, type: 'added', value: obj2[key] }; // если нет ключа (имени свойства) в 1,
      // который есть во 2, то берём ключ и свойство из 2
    }
    if (!_.has(obj2, key)) {
      return { name: key, type: 'deleted', value: obj1[key] }; // если нет ключа (имени свойства) во 2,
      // который есть в 1, то берём ключ и свойство из 1
    }
    if (obj1[key] === obj2[key]) {
      return { name: key, type: 'unchanged', value: obj1[key] }; // если свойство 1 равно свойству 2,
      // то берем ключ и свойство из 1
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      // console.log(_.isPlainObject(obj1[key]));
      return {
        name: key,
        type: 'nested',
        children:
        [`${stringify(diff(obj1[key], obj2[key]))}`].join('\n'),
      }; // если 1 и 2 свойства являются простыми объектами,
      // берём рекурсивно свойства из 1 и 2
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        name: key, type: 'changed', oldValue: obj1[key], newValue: obj2[key],
      }; // если значение 1 не равно значению 2,
      // берём 1 свойство за старое, а 2 свойство за новое
    }
    return null;
  });
  return result;
};

export default diff;
