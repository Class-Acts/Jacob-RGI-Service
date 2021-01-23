import React from 'react';
import styled from 'styled-components';

const GraphContainer = styled.div`
width: 100%;
`;

const GraphBar = styled.input`
margin: auto;
position: relative;
overflow: hidden;
appearance: none;
width: 190px;
height: 10px;
background-color: rgb(247, 247, 247);
border-color: rgb(41, 41, 41);
border-radius: 2px;
border-width: 1px;
border-style: solid;
box-shadow:
inset -1px -2px 4px 0px rgba(0, 0, 0, 0.69),
inset 1px 2px 4px 0px rgba(255, 255, 255, 0.5);
outline-none;
&::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 2px;
  height: 12px;
  background: #225C4E;
  border-color: rgb(247, 247, 247);
  border-width: 1px;
  border-right-style: thin;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: -100.05vw 0 0 100vw #225C4E;
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