import React from 'react';
import styled from 'styled-components';
import Stars from './stars.jsx';
import Slider from './slider.jsx';

const ContentTitle = styled.h3`
color: rgb(41, 41, 41);
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 16px;
font-weight: 400;
font-style: normal;
height: 24px;
left: auto;
right: auto;
opacity: 1;
padding-left: 8px;
padding-right: 16px;
position: static;
text-align: left;
`;

const ContentContainer = styled.div`
width: 50%;
float: left;
`;
const InnerContainer = styled.div`
width: 60%;
`;


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
      <ContentContainer>
        <InnerContainer>
          <ContentTitle>Average Customer Ratings</ContentTitle>
          <ContentTitle>Overall <Stars partial={true} stars={Math.round(this.props.averages.starAverage * 10) / 10}></Stars>{' ' + Math.round(this.props.averages.starAverage * 10) / 10}</ContentTitle>
          <ContentTitle>Overall Fit Rating <Slider value={this.props.averages.fitAverage} /></ContentTitle>
          <ContentTitle>Width <Slider value={this.props.averages.widthAverage} /></ContentTitle>
        </InnerContainer>
      </ContentContainer>
    )
  }
}

 export default Averages;