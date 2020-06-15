export const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const shallowCompare = (obj1, obj2) => {
  const differences = [];

  Object.keys(obj1).forEach(key => {
    differences.push(obj1[key] === obj2[key] ? false : { [key]: [obj1[key], obj2[key]]});
  });

  return [differences.some(Boolean), differences];
};
