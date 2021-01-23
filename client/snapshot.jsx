import React from 'react';
import styled from 'styled-components';
import Stars from './stars.jsx';

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
const SelectaRow = styled.p`
color: rgb(41, 41, 41);
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 16px;
font-weight: 400;
height: 19px;
left: auto;
right: auto;
margin-block-end: 5px;
margin-block-start: 0px;
margin-bottom: 5px;
margin-inline-end: 5px;
margin-inline-start: 5px;
margin-left: 5px;
margin-right: 5px;
margin-top: 0px;
opacity: 1;
padding-bottom: 5px;
padding-left: 5px;
padding-right: 5px;
padding-top: 0px;
position: static;
width: 440px;
`

const ContentContainer = styled.div`
width: 50%;
float: left;
`
const TotalNumber = styled.span`
color: rgb(41, 41, 41);
font-size: 16px;
font-weight: 400;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
`

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
      <ContentContainer>
        <ContentTitle>Rating Snapshot</ContentTitle>
        <SelectaRow>Select a row below to filter reviews.</SelectaRow>
        <div>
          <TotalNumber onClick={() => this.props.onClick(5)}>5 Stars: {this.props.stars[5]}</TotalNumber>
          <div></div>
          <TotalNumber onClick={() => this.props.onClick(4)}>4 Stars: {this.props.stars[4]}</TotalNumber>
          <div></div>
          <TotalNumber onClick={() => this.props.onClick(3)}>3 Stars: {this.props.stars[3]}</TotalNumber>
          <div></div>
          <TotalNumber onClick={() => this.props.onClick(2)}>2 Stars: {this.props.stars[2]}</TotalNumber>
          <div></div>
          <TotalNumber onClick={() => this.props.onClick(1)}>1 Stars: {this.props.stars[1]}</TotalNumber>
        </div>
      </ContentContainer>
    )
  }
}

export default Snapshot;