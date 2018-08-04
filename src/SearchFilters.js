import React, { Component } from 'react';
import './SearchFilters.css';

class Filter extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(this.props.filter, event.target.value);
  }

  render() {
    let options = this.props.filter.values.map((option) => {
      return (
        <option key={option.key} value={option.key}>{option.value}</option>
      );
    });

    return (
      <div className="Filter">
        <label>{this.props.filter.label}</label>
        <select
          value={this.props.filter.value}
          onChange={this.handleChange}
        >
          <option value="">Any</option>
          {options}
        </select>
      </div>
    );
  }

}

class SearchFilters extends Component {

  render() {
    let filters = Object.keys(this.props.filters).map((filterId) => {
      const filter = this.props.filters[filterId];
      return (
        <Filter
          key={filterId}
          filter={filter}
          onChange={this.props.onChange}
        ></Filter>
      );
    });

    return (
      <div className="SearchFilters">
        {filters}
        <div>
          <button onClick={this.props.onReset}>Reset</button>
        </div>
      </div>
    );
  }

}

export default SearchFilters;
