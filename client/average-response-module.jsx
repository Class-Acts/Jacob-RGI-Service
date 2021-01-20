import React from 'react';
import styled from 'styled-components';

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
width: 436px;
`

const ContentContainer = styled.div`
width: 50%;
float: left;
`


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
        <ContentTitle>Average Customer Ratings</ContentTitle>
        <div>Average Rating: {this.props.averages.starAverage}</div>
        <div>Average Fit: {this.props.averages.fitAverage}</div>
        <div>Average Width: {this.props.averages.widthAverage}</div>
      </ContentContainer>
    )
  }
}

 export default Averages;