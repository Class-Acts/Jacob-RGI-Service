import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
moment().format();

const ReviewListHolder = styled.li`
border-top-color: rgb(184, 184, 184);
border-top-style: solid;
border-top-width: 1px;
`
const ProfileDiv = styled.div`
float: left;
width: 25%;
padding-top: 25px;
padding-bottom: 25px;
height: auto;
`
const ReviewTitle = styled.h3`
margin-bottom: .25em;
color: #292929;
font-size: 19px;
line-height: 20px;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-weight: 700;
display: block;
`
const ReviewBody = styled.p`
margin-bottom: 1em;
display: block;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 16px;
font-weight: 400;
height: auto;
`

const HelpfulDiv = styled.div`
margin: auto;
display: block;
margin-block-start: 1em;
margin-block-end: 1em;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 16px;
color: rgb(41, 41, 41);
`

class Review extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.recommended = this.recommended.bind(this);
  }
  recommended() {
    if (this.props.recommended) {
      return 'Yes, I recommend this product.';
    } else {
      return 'No, I don\'t recommend this product.';
    }
  }
  render() {
    return (
      <ReviewListHolder>
        <ProfileDiv>
          <div>{this.props.user.name}</div>
          <div>{this.props.user.location}</div>
          <div>Review{' ' + this.props.user.number_reviews}</div>
        </ProfileDiv>
        <div>
          <div>Overall Fit Rating</div>
          <div>{this.props.review.fit}</div>
          <div>Runs Small     -     Runs Large</div>
          <div>Width</div>
          <div>{this.props.review.width}</div>
          <div>Runs Narrow     -      Runs Wide</div>
        </div>
        <div>
          <div> Stars: {this.props.review.stars} - {moment(this.props.review.review_date).fromNow()}</div>
          <ReviewTitle>{this.props.review.title}</ReviewTitle>
          <ReviewBody>{this.props.review.body}</ReviewBody>
          <div>Height{' ' + this.props.user.height}</div>
          <div>Weight{' ' + this.props.user.weight}</div>
          <div>Age{' ' + this.props.user.age}</div>
          <div>{this.recommended()}</div>
          <div>
            <HelpfulDiv>Helpful?</HelpfulDiv>
          </div>
          <div>Helpful? <button>{'Yes - ' + this.props.review.helpful}</button><button>{'No - ' + this.props.review.not_helpful}</button><button>Report as inappropriate</button></div>
        </div>
      </ReviewListHolder>
    )
  }
}


export default Review;
