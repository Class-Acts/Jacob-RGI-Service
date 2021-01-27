import React from 'react';
import styled from 'styled-components';
import BarGraphRow from './bar-graph-row.jsx';

const ContentTitle = styled.h3`
color: rgb(41, 41, 41);
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 16px;
font-weight: 400;
height: 18px;
padding-left: 11%;
text-align: left;
width: 436px;
`;
const SelectaRow = styled.p`
color: rgb(41, 41, 41);
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 16px;
font-weight: 400;
height: 19px;
padding-bottom: 5px;
padding-left: 12%;
position: static;
width: 440px;
`;
const ContentContainer = styled.div`
width: 50%;
float: left;
padding-bottom: 30px;
`;
const TotalNumber = styled.span`
opacity: 0.9;
color: rgb(41, 41, 41);
font-size: 16px;
font-weight: 400;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
line-height: 19.5px;
padding-left: 5px;
padding-right: 5px;
`;
const InnerContainer = styled.div`
width: 80%;
padding-left: 12%
`;
const DisplayRow = styled.div`
padding-bottom: 10px;
`;

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
        <InnerContainer>
          <DisplayRow>
            <TotalNumber>5 &#9733; </TotalNumber><BarGraphRow stars={this.props.stars[5]} entries={this.props.stars.entries} onClick={() => this.props.onClick(5)}/><TotalNumber>{' ' + this.props.stars[5]}</TotalNumber>
          </DisplayRow>
          <DisplayRow>
            <TotalNumber>4 &#9733; </TotalNumber><BarGraphRow stars={this.props.stars[4]} entries={this.props.stars.entries} onClick={() => this.props.onClick(4)}/><TotalNumber>{' ' + this.props.stars[4]}</TotalNumber>
          </DisplayRow>
          <DisplayRow>
            <TotalNumber>3 &#9733; </TotalNumber><BarGraphRow stars={this.props.stars[3]} entries={this.props.stars.entries} onClick={() => this.props.onClick(3)}/><TotalNumber>{' ' + this.props.stars[3]}</TotalNumber>
          </DisplayRow>
          <DisplayRow>
            <TotalNumber>2 &#9733; </TotalNumber><BarGraphRow stars={this.props.stars[2]} entries={this.props.stars.entries} onClick={() => this.props.onClick(2)}/><TotalNumber>{' ' + this.props.stars[2]}</TotalNumber>
          </DisplayRow>
          <DisplayRow>
            <TotalNumber>1 &#9733; </TotalNumber><BarGraphRow stars={this.props.stars[1]} entries={this.props.stars.entries} onClick={() => this.props.onClick(1)}/><TotalNumber>{' ' + this.props.stars[1]}</TotalNumber>
          </DisplayRow>
        </InnerContainer>
      </ContentContainer>
    )
  }
}

export default Snapshot;