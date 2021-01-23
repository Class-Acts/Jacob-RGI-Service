import React from 'react';
import Stars from './stars.jsx';
import Slider from './slider.jsx';
import styled from 'styled-components';
import moment from 'moment';
moment().format();

const ReviewListHolder = styled.div`
border-top-color: rgb(184, 184, 184);
border-top-style: solid;
border-top-width: 1px;
`;
const ProfileDiv = styled.div`
float: left;
width: 25%;
padding-top: 25px;
padding-bottom: 25px;
height: auto;
length: 100%;
`;
const ReviewTitle = styled.h3`
margin-bottom: .25em;
color: #292929;
font-size: 19px;
line-height: 20px;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-weight: 700;
display: block;
`;
const ReviewBody = styled.p`
margin-bottom: 1em;
display: block;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 16px;
font-weight: 400;
height: auto;
line-height: 26px;
`;
const DefaultText = styled.span`
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 16px;
font-weight: 400;
line-height: 26px;
width: auto;
`;
const BoldedText = styled.span`
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 16px;
font-weight: bold;
width: auto;
line-height: 26px;
`;
const ReviewOuterDiv = styled.div`
float: right;
width: 70%;
text-align: left;
`;
const FitandWidthModule = styled.div`
float right;
width: 25%;
margin-top: .8em;
`;
const UserBioDefaultText = styled.span`
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 15px;
font-weight: 400;
line-height: 26px;
width: auto;
`;
const UserBioBoldText = styled.span`
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 15px;
font-weight: bold;
line-height: 26px;
width: auto;
`;
const DateText = styled.span`
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 14px;
font-weight: 400;
width: auto;
`;
const HelpfulSpan = styled.span`
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 16px;
color: rgb(41, 41, 41);
line-height: 30px;
`;
const HelpfulDivHolder = styled.div`
margin-top: 1em;
margin-bottom: 1em;
`;
const Bullet = styled.span`
margin-left: 0.3em;
margin-right: 0.3em;
color: rgb(41, 41, 41);
font-size: 14px;
`;
const HelpfulButtons = styled.button`
line-height: 30px;
margin-left: 0.75em;
background-color: white;
border-radius: 2px;
border-style: solid;
border-color: rgb(184, 184, 184);
border-width: 1px;
color: rgb(41, 41, 41);
cursor: pointer;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 14px;
font-weight: 400;
height: 30px
width: auto;
&:hover {box-shadow: inset 0 0 3px #000000;}
`;
const HelpfulInnerDiv = styled.div`
margin-top: 0.2em;
margin-bottom: 0.2em;
line-height: 40px;
`;
const FaintBullet = styled.span`
margin-left: 0.3em;
margin-right: 0.3em;
color: rgb(41, 41, 41);
font-size: 10px;
opacity: 0.5;
`;
const FitSpanLeft = styled.span`
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 12px;
color: rgb(41, 41, 41);
line-height: 26px;
text-align: left;
`;
const FitSpanRight = styled.span`
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 12px;
color: rgb(41, 41, 41);
line-height: 26px;
text-align: right;
float: right;
`;


class Review extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.recommended = this.recommended.bind(this);
    this.recommendedSecondHalf = this.recommendedSecondHalf.bind(this);
  }

  recommended() {
    if (this.props.review.recommended) {
      return 'Yes, ';
    } else {
      return 'No, ';
    }
  }

  recommendedSecondHalf() {
    if (this.props.review.recommended) {
      return 'I recommend this product.';
    } else {
      return 'I don\'t recommend this product.';
    }
  }

  render() {
    return (
    <div>
      <ProfileDiv>
        <div>
          <BoldedText>{this.props.user.name}</BoldedText>
        </div>
        <div>
          <DefaultText>{this.props.user.location}</DefaultText>
        </div>
        <div>
          <DefaultText>Review</DefaultText><BoldedText>{' ' + this.props.user.number_reviews}</BoldedText>
        </div>
      </ProfileDiv>
      <ReviewOuterDiv>
        <ReviewListHolder>
          <div>
            <Stars full={true} stars={this.props.review.stars}></Stars>
            <Bullet>&#8226;</Bullet>
            <DateText>{moment(this.props.review.review_date).fromNow()}</DateText>
            <ReviewTitle>{this.props.review.title}</ReviewTitle>
          </div>
          <FitandWidthModule>
            <UserBioDefaultText>Overall Fit Rating</UserBioDefaultText>
            <Slider value={this.props.review.fit}/>
            <div><FitSpanLeft>Runs Small</FitSpanLeft><FitSpanRight>Runs Large</FitSpanRight></div>
            <UserBioDefaultText>Width</UserBioDefaultText>
            <Slider value={this.props.review.width}/>
            <div><FitSpanLeft>Runs Narrow</FitSpanLeft><FitSpanRight>Runs Wide</FitSpanRight></div>
          </FitandWidthModule>
          <div>
            <ReviewBody>{this.props.review.body}</ReviewBody>
            <UserBioBoldText>Height</UserBioBoldText><UserBioDefaultText>{' ' + this.props.user.height}</UserBioDefaultText>
            <div></div>
            <UserBioBoldText>Weight</UserBioBoldText><UserBioDefaultText>{' ' + this.props.user.weight}</UserBioDefaultText>
            <div></div>
            <UserBioBoldText>Age</UserBioBoldText><UserBioDefaultText>{' ' + this.props.user.age}</UserBioDefaultText>
            <div></div>
            {this.props.review.recommended ? <span>&#10003;</span> : <span>&#10008;</span>}<UserBioBoldText>{' ' + this.recommended()}</UserBioBoldText><UserBioDefaultText>{this.recommendedSecondHalf()}</UserBioDefaultText>
          </div>
          <HelpfulDivHolder>
            <HelpfulInnerDiv><HelpfulSpan>Helpful?</HelpfulSpan><HelpfulButtons>{'Yes'}<FaintBullet>&#8226;</FaintBullet>{this.props.review.helpful}</HelpfulButtons><HelpfulButtons>{'No'}<FaintBullet>&#8226;</FaintBullet>{this.props.review.not_helpful}</HelpfulButtons><HelpfulButtons>Report as inappropriate</HelpfulButtons></HelpfulInnerDiv>
          </HelpfulDivHolder>
        </ReviewListHolder>
      </ReviewOuterDiv>
    </div>
    )
  }
}


export default Review;
