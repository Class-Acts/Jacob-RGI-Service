import React from 'react';
import styled from 'styled-components';

const UpperBar = styled.div`
background-color: rgba(42, 42, 42, 0.9);
color: rgba(255, 255, 255, 0.9);
height: 30px;
text-align: center;
padding-top: 11px;
`;
const UpperSpan = styled.span`
font-family: Graphik,'Roboto Condensed',Graphik,"Helvetica Neue",sans-serif;
font-size: 14px;
letter-spacing: -0.16px;
padding-right: 12px;
cursor: pointer;
`;
const LowerBar = styled.div`
height: 140px;
color: white;
background-color: black;
`;
const GridContainer = styled.div`
width: 80%;
float: right;
display: grid;
grid-template-columns: 100%;
justify-content: space-between;
`;
const SearchBarHolder = styled.div`
padding-top: 20px;
text-align: left;
`;
const ButtonsHolder = styled.div`
padding-top: 10px;
text-align: right;
`;
const HeaderButton = styled.button`
border: none;
background-color: black;
color: white;
font-size: 14px;
font-family: Graphik,'Roboto Condensed',Graphik,"Helvetica Neue",sans-serif;
padding-right: 20px;
`;
const NavHolder = styled.div`
height: 100%;
`;
const UpperGridContainer = styled.div`
display: grid;
grid-template-columns: 50% 30%;
justify-content: space-between;
height: 75px;
`;
const SearchBar = styled.input`
background-color: rgb(72, 72, 72);
height: 40px;
width: 70%;
border: none;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
color: white;
font-size: 18px;
text-weight: 300;
padding-left: 20px;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <UpperBar>
          <UpperSpan>SHOP REI</UpperSpan>
          <UpperSpan>REI OUTLET</UpperSpan>
          <UpperSpan>USED GEAR</UpperSpan>
          <UpperSpan>REI ADVENTURES</UpperSpan>
          <UpperSpan>CLASSES &#38; EVENTS</UpperSpan>
          <UpperSpan>EXPERT ADVICE</UpperSpan>
          <UpperSpan>CO-OP JOURNAL</UpperSpan>
          <UpperSpan>CONVSERATIONS</UpperSpan>
          <UpperSpan>&#8226;</UpperSpan>
          <UpperSpan>MEMBERSHIP</UpperSpan>
        </UpperBar>
        <LowerBar>
          <GridContainer>
            <UpperGridContainer>
              <SearchBarHolder><SearchBar type="text" placeholder="Search for great gear &#38; clothing"></SearchBar></SearchBarHolder>
              <ButtonsHolder><HeaderButton>SIGN IN</HeaderButton><HeaderButton>STORES</HeaderButton><HeaderButton>CART</HeaderButton></ButtonsHolder>
            </UpperGridContainer>
            <NavHolder>
              <span>Camp &#38; Hike</span>
              <span>Climb</span>
              <span>Cycle</span>
              <span>Paddle</span>
              <span>Run</span>
              <span>Fitness</span>
              <span>Snow</span>
              <span>Travel</span>
              <span>Men</span>
              <span>Women</span>
              <span>Kids</span>
              <span>Deals</span>
              <span>More</span>
              <span>REI OUTLET ></span>
            </NavHolder>
          </GridContainer>
        </LowerBar>
      </div>
    )
  }
}

export default Header;