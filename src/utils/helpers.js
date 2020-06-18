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

export const randomizeAlarmsStates = alarms => {
  if (alarms) {
    const sources = {};
    alarms.forEach(alarm => {
      const uId = `${alarm.source.id}-${alarm.type.id}`;
      const newStatusId = getRandomInt(2);
      const previousId = newStatusId === 2 ? getRandomInt(2) : 0;
      if (!sources[uId]) {
        sources[uId] = { id: alarm.id, previous_status_id: previousId, status_id: newStatusId };
      }
    });
    return sources;
  }
};
