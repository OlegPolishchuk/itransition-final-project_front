export const addCheckboxIntoObjectList = <T>(
  objects: T[],
): (T & { checked: boolean })[] => {
  return objects.map(object => ({ ...object, checked: false }));
};
