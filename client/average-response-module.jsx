import React from 'react';

class Averages extends React.Component {
  constructor() {
    super();
    this.state = {
      overall: 0,
      fit: 0,
      width: 0
    };
  }

  render() {
    return (
      <div>
        <div>Average Rating: {this.props.averages.starAverage}</div>
        <div>Average Fit: {this.props.averages.fitAverage}</div>
        <div>Average Width: {this.props.averages.widthAverage}</div>
      </div>
    )
  }
}

 export default Averages;