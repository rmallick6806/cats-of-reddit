const initialState = {
  loading: true,
  savedCats: [],
  data: []
};

const cats = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_CAT':
      const savedCats = [...state.savedCats];
      const newCat = [action.cat];
      return {
        ...state,
        savedCats: [...savedCats, ...newCat],
        data: [
          ...state.data.slice(0, action.idx),
          ...state.data.slice(action.idx + 1),
        ]
      }
    case 'SAVE_CATS_FROM_LOCAL_STORAGE':
      return {
        ...state,
        loading: false,
        savedCats: [...action.cats]
      }
    case 'STORE_CATS':
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.cats]
      };
    case 'REMOVE_SAVED_CAT':
      const data = [...state.data];
      const unpinnedCat = [action.cat];
      return {
        ...state,
        data: [ ...unpinnedCat, ...data],
        savedCats: [
          ...state.savedCats.slice(0, action.idx),
          ...state.savedCats.slice(action.idx + 1),
        ]
      };
    default:
      return state;
  }
}

export default cats;
