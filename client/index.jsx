import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        Hello World
      </div>
    )
  }
 }

ReactDOM.render(<App />, document.getElementById('reviews-module'));