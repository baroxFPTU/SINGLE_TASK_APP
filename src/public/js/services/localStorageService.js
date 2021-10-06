export const localStorageService = (function () {
    const saveItem = (name,data) => {
        const exitData = getItem(name);

        if (exitData instanceof Array) {
            exitData.push(data);
            localStorage.setItem(name, JSON.stringify(exitData));
            return;
        }
        localStorage.setItem(name, JSON.stringify([data]));
    }

    const getItem = (name) => {
        const _data = localStorage.getItem(name);
        return _data ? JSON.parse(_data) : null;
    }

    const clearItem = (name) => {
        localStorage.removeItem(name);
    }

    const updateById = ({nameItem, id, newData}) => {
        const _data = getItem(nameItem);

        const _newData = _data.map(item => {
            if (item.id == id || item._id == id) {
                console.log(item);
                return item = newData;
            }

            return item;
        });

        clearItem(nameItem);
        localStorage.setItem(nameItem, JSON.stringify( _newData));
    }

    return {
        save: saveItem,
        get: getItem,
        clear: clearItem,
        updateById,
    }
}())