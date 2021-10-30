import { Component } from 'react';
import App from '../App';
import ReactDOM from 'react-dom';
import App from '../App.js';
import React from 'react';

export default class StudentTable extends Component {
  handleClick = () => {
    console.log('render');
    ReactDOM.render(<App />, document.getElementById('root'));
  };
  render() {
    return (
      <div>
        Student Table <br />
        <button onClick={this.handleClick}>Click</button>
      </div>
    );
  }
}
