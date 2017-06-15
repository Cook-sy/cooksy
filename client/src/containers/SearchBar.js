import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMealsByDate } from '../actions';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controlledDate: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleChange(event, date) {
    this.setState({
      controlledDate: date
    });
  };

  onFormSubmit(event) {
    var dateobj = new Date(this.state.controlledDate);
    var date = dateobj.toISOString().substring(0,10);
    this.props.fetchMealsByDate(date);
    this.setState({ controlledDate: null });
  }

  render() {
    return (
      <div>
        <DatePicker
          hintText="Find a meal by date"
          autoOk= {true}
          value={this.state.controlledDate}
          onChange={this.handleChange}
        />
        <span>
          <RaisedButton className="submit-date" onClick={this.onFormSubmit} label="Submit"></RaisedButton>
        </span>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMealsByDate }, dispatch);
}


export default connect(null, mapDispatchToProps)(SearchBar);