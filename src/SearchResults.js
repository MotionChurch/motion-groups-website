import React, { Component } from 'react';
import './SearchResults.css';
import striptags from 'striptags';

class SearchResult extends Component {

  badge(f) {
    if (this.props.data.udf[f]) {
      return (
        <span className="badge">
          {this.props.data.udf[f].label}{' '}
        </span>
      );
    } else {
      return null;
    }
  }

  image() {
    const src = this.props.data['image-url'];
    if (src) {
      return (<img src={src} alt="" />);
    } else {
      return null;
    }
  }

  render() {

    return (
      <div className="Result">
        <h3>{this.props.data.name}</h3>

        <div className="image">
          {this.image()}
        </div>

        <div className="details">
          {this.badge('udf_3')}
          {this.badge('udf_2')}
          {this.badge('udf_1')}
          {this.props.data.childcare ? (<span className="badge">Childcare</span>) : null}

          <p>{striptags(this.props.data.description)}</p>

          <p>
            <span className="label">Day</span>: {this.props.data.meetingDay.label}{" "}
            <span className="label">Time</span>: {this.props.data.meetingTime.label}{" "}
            <span className="label">Location</span>: {this.props.data['location-city']}
          </p>
          <p>
            <span className="label">Group Leader</span>: {this.props.data['leader-name']}{" "}
          </p>
          <p>
            <a className="btn btn--border theme-btn--primary-inverse" target="_new" href="https://motionchurch.ccbchurch.com/goto/forms/133/responses/new">Sign Up for Group</a>
          </p>
        </div>
      </div>
    );
  }

}

class SearchResults extends Component {

  render() {
    let results = this.props.results.map((result) => {
      return (
        <SearchResult key={result.id} data={result}></SearchResult>
      );
    });

    return (
      <div className="SearchResults">
        <p className="result-count">Found {results.length} groups</p>
        {results}
      </div>
    );
  }

}

export default SearchResults;

