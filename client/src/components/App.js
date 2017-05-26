import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(res => this.setState({users: res.results}));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <ul>
          { this.state.users.map((user, i) => {
              return (
                <li key={i}>{user.name}</li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
