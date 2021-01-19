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
        <div>Rating Snapshot</div>
        <div>Select a row below to filter reviews.</div>
        <div>
          <div>5 Stars: {this.props.stars[5]}</div>
          <div>4 Stars: {this.props.stars[4]}</div>
          <div>3 Stars: {this.props.stars[3]}</div>
          <div>2 Stars: {this.props.stars[2]}</div>
          <div>1 Stars: {this.props.stars[1]}</div>
        </div>
      </div>
    )
  }
}

export default Snapshot;