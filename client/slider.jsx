import React from 'react';
import styled from 'styled-components';

const SliderContainer = styled.span`
width: 100%;
`;

const SliderInput = styled.input`
appearance: none;
width: 142px;
height: 8px;
background: white;
border-color: rgba(51, 51, 51, 0.5);
border-width: 1px;
border-style: solid;
outline-none;
&::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-color: rgba(51, 51, 51, 0.5);
  border-width: 1px;
  border-style: solid;
  background: #225C4E;
  box-shadow:
  inset -1px 0px  0px 0px rgba(0, 0, 0, 0.25),
  inset 1px 0px 0px 0px rgba(255, 255, 255, 0.5);
}
`;

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.valueHandler = this.valueHandler.bind(this);
  }
  valueHandler() {
    return this.props.value * 50;
  }
  render() {
    return (
      <div>
        <SliderContainer>
          <SliderInput type="range" min="1" max="100" value={this.valueHandler()} readOnly></SliderInput>
          </SliderContainer>
      </div>
    )
  }
}

export default Slider;