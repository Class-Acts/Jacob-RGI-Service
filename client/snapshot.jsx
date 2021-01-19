import React from 'react';

class Snapshot extends React.Component {
  constructor() {
    super();
    this.state = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };
  }
  render() {
    return (
      <div>
        Hello World
      </div>
    )
  }
}

export default Snapshot;