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
          <div>{this.props.review.title}</div>
          <div>{this.props.review.body}</div>
          <div>Height{' ' + this.props.user.height}</div>
          <div>Weight{' ' + this.props.user.weight}</div>
          <div>Age{' ' + this.props.user.age}</div>
          <div>{this.recommended()}</div>
          <div>Helpful? <button>{'Yes - ' + this.props.review.helpful}</button><button>{'No - ' + this.props.review.not_helpful}</button><button>Report as inappropriate</button></div>
        </div>
      </ReviewListHolder>
    )
  }
}


export default Review;
