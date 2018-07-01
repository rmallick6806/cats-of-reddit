import _ from 'lodash';

export const saveCat = (cat, idx) => ({
  type: 'SAVE_CAT',
  cat,
  idx
});

export const removeSavedCat = (cat, idx) => ({
  type: 'REMOVE_SAVED_CAT',
  cat,
  idx
});

export const storeCats = (data) => ({
  type: 'STORE_CATS',
  cats: data
});

// Parses cat data to so that pinned cats do not make it
// to the redux store.

const parseCatsData = (data, savedCats) => {
  const parsedCats = [];
  _.forEach(data.children, (cat) => {
    if (!_.isEmpty(savedCats)) {
      const alreadyExits = _.find(savedCats, (saved) => {
        return cat.data.id === saved.id
      });
      if (!alreadyExits) {
        parsedCats.push(cat.data);
      }
    } else {
      parsedCats.push(cat.data);
    }
  });
  return parsedCats;
};

export const fetchCats = (int = 20, savedCats) => {
  return dispatch => {
    return fetch('https://www.reddit.com/r/cats/top/.json?limit=' + int)
      .then(response => response.json())
      .then(json => {
        const parsedData = parseCatsData(json.data, savedCats);
        dispatch(storeCats(parsedData))
      })
  }
};


export const saveCatsFromLocalStorage = (cats) => ({
  type: 'SAVE_CATS_FROM_LOCAL_STORAGE',
  cats
});
