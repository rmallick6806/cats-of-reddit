import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../List';
import logo from '../../assets/logo.svg';
import { fetchCats, saveCat, removeSavedCat } from '../../actions';
import './App.css';

class App extends Component {
  componentDidMount() {
    const { fetchCats, cats } = this.props;
    const savedCats = cats.savedCats;
    const savedCatCount = savedCats.length;

    fetchCats(savedCatCount + 20, savedCats);
  }

  getLoadingHeader() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Loading...</h1>
      </div>
    );
  }

  getLoadedHeader() {
    return <h1 className="App-title">Cats of Reddit</h1>;
  }

  onSaveCat(idx, cat) {
    this.props.saveCat(cat, idx);
  }

  onRemoveSavedCat(idx, cat) {
    this.props.removeSavedCat(cat, idx);
  }

  render() {
    const { cats } = this.props;
    const loading = cats.loading;

    return (
      <div className="App">
        <header className="App-header">
          {loading ? this.getLoadingHeader() : this.getLoadedHeader()}
        </header>
        { loading ? null :
          <List cats={cats.data}
            savedCats={cats.savedCats}
            saveCat={(cat, idx) => this.onSaveCat(cat, idx)}
            removeSavedCat={(cat, idx) => this.onRemoveSavedCat(cat, idx)} /> }
      </div>
    );
  }
}

const stateToProps = (state) => {
  return { cats: state.cats }
}
const dispatchToProps = {
  fetchCats,
  saveCat,
  removeSavedCat
}
export default connect(stateToProps, dispatchToProps)(App);
