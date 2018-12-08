export const STORE_KEY = "go_store";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORE_KEY, serializedState);
  } catch (err) {
    console.error(err);
  }
};

export const clearState = () => {
  try {
    localStorage.clear();
  } catch (err) {
    console.error(err);
  }
};
