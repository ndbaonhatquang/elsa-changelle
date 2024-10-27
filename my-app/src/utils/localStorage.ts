export const setLocalStorageItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

export const removeLocalStorageItem = (key: string) => {
    localStorage.removeItem(key);
};

export const getIdFromLocalStorage = () => {
    const id = getLocalStorageItem('userId');
    console.log({id})
    if (id) {
        return id;
    }

    const newId = Math.random().toString(36).substring(7);
    console.log({newId})

    setLocalStorageItem('userId', newId);

    return newId;
}
