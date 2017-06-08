import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMealsByDate } from '../actions';
import { bindActionCreators } from 'redux';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: ''};
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value })
  }

  onFormSubmit(event) {
    console.log(this.props.fetchMealsByDate(this.state.term))
    event.preventDefault();
    this.props.fetchMealsByDate(this.state.term);
    this.setState({ term: '' })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
      <input
        placeholder="Find a meal by date"
        value={this.state.term}
        onChange={this.onInputChange} />
        <span>
        <button>Submit</button>
        </span>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMealsByDate }, dispatch);
}


export default connect(null, mapDispatchToProps)(SearchBar);