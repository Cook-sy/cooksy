import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMealsByDate } from '../actions';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
// // import { Field, reduxForm } from 'redux-form';
// import {renderDateField} from '../utils/FormHelper';

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
          placeholder="Find meal by date"
          value={this.state.term}
          onChange={this.onInputChange}
        />
        <span>
          <button type="submit">Submit</button>
        </span>
      </form>
    );
  }
}

//   render() {
//     return (
//       <form onSubmit={this.onFormSubmit}>
//       <Field
//         name="find a meal by date"
//         component={renderDateField}
//         hintText="Find a meal by date"
//         autoOk={true}
//         value={this.state.term} />
//         <span>
//         <RaisedButton label="Submit"></RaisedButton>
//         </span>
//       </form>
//     )
//   }
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMealsByDate }, dispatch);
}


export default connect(null, mapDispatchToProps)(SearchBar);