import React, { Component } from 'react';
import update from 'immutability-helper';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';
import './App.css';
import logo from './foursquare.png';
import SearchFilters from './SearchFilters.js';
import SearchResults from './SearchResults.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.data = [];
    this.state = {
      'error': null,
      'isLoading': true,
      'filters': {}
    };
  }

  componentDidMount() {
    fetch('https://d22kvuv0c7qr4n.cloudfront.net/data/groups-data.json')
      .then(response => response.json())
      .then(data => {
        this.data = data;
        this.originalFilters = data['search-fields'].reduce((a, b) => {
              b['value'] = '';
              a[b.id] = b;
              return a;
          }, {});
        this.setState({ 'isLoading': false, 'filters': this.originalFilters });
      })
      .catch(error => this.setState({ error: error, isLoading: false }));
  }

  handleFilterChange(filter, newValue) {
    // Update the value on the filter
    this.setState(update(this.state, {
      'filters': {
        [filter.id]: {
          value: { $set: newValue }
        }
      }
    }));
  }

  handleReset() {
    this.setState({'filters': this.originalFilters});
  }

  matchFilters(entry) {
    for (const filterId in this.state.filters) {
      const filter = this.state.filters[filterId];
      const field = (filterId.startsWith('udf') ? entry.udf : entry)[filter.id];

      // Unset filters always match.
      if (!filter.value && filter.value !== false) {
        continue;
      }

      // Undefined fields never match.
      if (field === undefined) {
        return false;

      // Boolean field.
      } else if (typeof(field) === "boolean") {
        if (String(field) !== filter.value) {
          return false;
        }

      // All other fields are expected to be objects with an `id`.
      } else if (field.id !== filter.value) {
        return false;
      }
    }

    return true;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="loading">
          <img src={logo} alt="" className="spinner" />
          <p>LOADING</p>
        </div>
      );
    } else if (this.state.error) {
      return (<div className="error">Error: {this.state.error.message}</div>);
    }

    // Filter the data.
    const results = this.data.groups.filter(entry => this.matchFilters(entry));

    return (
      <div className="App">
        <h2>Community Group Search</h2>
        <div className="left">
          <SearchFilters
            filters={this.state.filters}
            onChange={this.handleFilterChange}
            onReset={this.handleReset}
          ></SearchFilters>
        </div>
        <div className="right">
          <SearchResults results={results}></SearchResults>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default App;
