import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import throttle from 'lodash/throttle';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { saveCatsFromLocalStorage } from './actions';
import { saveCatsToLocalStorage, loadCatsFromLocalStorage } from './utils.js';
import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(throttle(() => {
  saveCatsToLocalStorage({
    savedCats: store.getState().cats.savedCats
  });
}, 1000));

const loadedCats = loadCatsFromLocalStorage();
if (loadedCats) {
  store.dispatch(saveCatsFromLocalStorage(loadedCats.savedCats));
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
