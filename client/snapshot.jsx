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
          <div onClick={() => this.props.onClick(5)}>5 Stars: {this.props.stars[5]}</div>
          <div onClick={() => this.props.onClick(4)}>4 Stars: {this.props.stars[4]}</div>
          <div onClick={() => this.props.onClick(3)}>3 Stars: {this.props.stars[3]}</div>
          <div onClick={() => this.props.onClick(2)}>2 Stars: {this.props.stars[2]}</div>
          <div onClick={() => this.props.onClick(1)}>1 Stars: {this.props.stars[1]}</div>
        </div>
      </div>
    )
  }
}

export default Snapshot;