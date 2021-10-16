export const push = function pushItem(name, data) {
  const exitData = getItem(name);

  if (exitData instanceof Array) {
    exitData.push(data);
    localStorage.setItem(name, JSON.stringify(exitData));
    return;
  }
  localStorage.setItem(name, JSON.stringify([data]));
};

/**
 * Get item by name from localStorage.
 * @param {*} name
 * @returns Object
 */
export const get = function getItem(name) {
  const _data = localStorage.getItem(name);
  return _data ? JSON.parse(_data) : null;
};

export const clear = function clearItem(name) {
  localStorage.removeItem(name);
};

export const updateById = ({ nameItem, id, newData }) => {
  const _data = get(nameItem);

  const _newData = _data.map((item) => {
    if (item.id == id || item._id == id) {
      return (item = newData);
    }

    return item;
  });

  clear(nameItem);
  localStorage.setItem(nameItem, JSON.stringify(_newData));
};

export const set = function setItem(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
};
