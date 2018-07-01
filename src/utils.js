export const saveCatsToLocalStorage = (cats) => {
  try {
    localStorage.setItem('state', JSON.stringify(cats));
  } catch (err) {
    console.log(err);
  }
}

export const loadCatsFromLocalStorage = () => {
  try {
    const state = localStorage.getItem('state');
    if (state === null) {
      return undefined;
    }
    return JSON.parse(state);
  } catch (err) {
    return undefined;
  }
}
