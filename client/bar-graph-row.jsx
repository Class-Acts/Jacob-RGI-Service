import React from 'react';
import styled from 'styled-components';

const GraphContainer = styled.div`
width: 100%;
`;

// #225C4E;
// inset -1px -2px 4px 0px rgba(0, 0, 0, 0.69),
// inset 1px 2px 4px 0px rgba(255, 255, 255, 0.5);
const GraphBar = styled.input`
margin: auto;
position: relative;
overflow: hidden;
appearance: none;
width: 190px;
height: 10px;
background-color: #225C4E;
border-color: rgba(41, 41, 41, 0.2);
border-radius: 2px;
border-width: 1px;
border-style: solid;
box-shadow:
inset -1px -2px 4px 0px rgba(0, 0, 0, 0.69),
inset 1px 2px 4px 0px rgba(255, 255, 255, 0.5);
outline-none;
&::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1px;
  height: 12px;
  background: #225C4E;
  border-color: #225C4E;
  border-width: 1px;
  border-right-style: solid;
  box-shadow:
  100vw 0 0 100vw rgb(247, 247, 247);
}
`;

class BarGraphRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.valueHandler = this.valueHandler.bind(this);
  }
  valueHandler() {
    return (this.props.stars / this.props.entries) * 100;
  }
  render() {
    return (
      <GraphBar type="range" min="1" max="100" value={this.valueHandler()} onClick={() => this.props.onClick()} readOnly></GraphBar>
    )
  }
}

export default BarGraphRow;