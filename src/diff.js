import _ from 'lodash';

const diff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const commonKeys = _.sortBy(_.union(keys1, keys2));

  const result = commonKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }

    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        key,
        type: 'nested',
        children: diff(obj1[key], obj2[key]),
      };
    }

    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key, type: 'changed', oldValue: obj1[key], newValue: obj2[key],
      };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
  return result;
};

export default diff;
