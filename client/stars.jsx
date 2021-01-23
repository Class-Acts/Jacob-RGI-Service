import React from 'react';
import styled from 'styled-components';

const YellowStar = styled.span`
color: rgb(189, 123, 45);
height: 24px;
width: 18px;
`;
const WhiteStar = styled.span`
color: #B8B8B8;
height: 24px;
width: 18px;
`;
const PartialStar = styled.span`
color: rgb(189, 123, 45);
height: 24px;
width: 50%;
overflow: hidden;
`;

class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.starArr = this.starArr.bind(this);
    this.partialStarArr = this.partialStarArr.bind(this);
  }

  starArr() {
    let rating = this.props.stars;
    let stars = [];
    for (let index = 0; index < 5; index ++) {
      if (index < rating) {
        stars.push(1);
      } else {
        stars.push(0);
      }
    }
    return stars;
  }

  partialStarArr() {
    let rating = this.props.stars;
    let stars = [];
    let bigRating = rating * 10;

    let helper = (num) => {
      if (num - 10 > 0) {
        stars.push(1);
        return helper(num - 10);
      }
      if (num - 10 < 0 && num > 0) {
        stars.push(num/10);
        return helper(0);
      }
      if (num === 0 && stars.length < 5) {
        stars.push(0);
        return helper(0);
      }
    }

    helper(bigRating);
    console.log(stars);
    return stars;
  }

  render() {
    if (this.props.full === true) {
      return (
      <span>
        {this.starArr().map((item, index) => {
          if (item === 1) {
            return <YellowStar key={index}>&#9733;</YellowStar>
          } else {
            return <WhiteStar key={index}>&#9733;</WhiteStar>
          }
        })}
      </span>
    )
    } else {
      return (
        <span>
          {this.partialStarArr().map((item, index) => {
            if (item === 1) {
              return <YellowStar key={index}>&#9733;</YellowStar>
            }
            if (item < 1 && item > 0) {
              return <YellowStar item key={index}>&#9733;</YellowStar>
            } else {
              return <WhiteStar key={index}>&#9733;</WhiteStar>
            }
            })}
        </span>
      )
    }
  }
}

export default Stars;