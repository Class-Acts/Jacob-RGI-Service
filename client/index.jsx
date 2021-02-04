import React from 'react';
import ReactDOM from 'react-dom';
import Averages from './average-response-module.jsx';
import Snapshot from './snapshot.jsx';
import Review from './review.jsx';
import $ from 'jquery';
import styled from 'styled-components';
import moment from 'moment';
moment().format();

const Title = styled.h2`
border-bottom-color: rgba(12, 11, 8, 0.75);
box-sizing: border-box;
color: rgba(12, 11, 8, 0.75);
display: block;
font-family: Stuart, Georgia, serif;
font-size: 21.33px;
font-stretch: 100%;
font-weight: 600;
letter-spacing: -0.16px;
line-height: 28.4329px;
padding-bottom: 40px;
padding-right: 5px;
padding-top: 10px;
text-align: left;
margin: -1px 0 0;
border-top-width: 1px;
border-top-style: solid;
border-top-color: rgb(204, 204, 204);
cursor: pointer;
`;
const WriteAReviewHolder = styled.div`
float: right;
padding-right: 8%;
padding-top: 2%;
`;
const WriteaReviewButton = styled.button`
align-items: flex-start;
background-color: rgb(34, 92, 78);
border-radius: 2px;
box-shadow: inset 0 1px 0 rgba(255,255,255, 0.2);
box-sizing: border-box;
color: white;
display: block;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 16px;
font-weight: 700;
height: 44px;
line-height: 28px;
opacity: 1;
width: auto;
white-space: nowrap;
line-height: 28px;
padding-top: 8px;
padding-right: 16px;
padding-bottom: 8px;
padding-left: 16px;
border-radius: 2px 2px 2px 2px;
border-color: transparent;
position: relative;
right: 8%;
`;
const BaseSpanStyle = styled.span`
font-weight: 400;
font-size: 16px;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
padding-left: 11%;
`;
const ReviewBarCountHolder = styled.div`
float: none;
width: 50%;
padding-bottom: 0px;
margin-left: 10px;
`;
const ControlBar = styled.div`
width: 100%;
`;
const DropdownDivHolder = styled.div`
margin-right: 10%;
float: right;
position: relative;
display: inline-block;
&:hover {
  display: block;
  >div {
      display: block;
  }
}
`;
const DropdownButton = styled.button`
background-color: white;
color: rgb(41, 41, 41);
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 16px;
border: none;
`;
const DropdownContent = styled.div`
position: absolute;
display: none;
background-color: white;
min-width: auto;
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
z-index: 1;
border-color: rgb(41, 41, 41);
border-style: solid;
border-width: 1px;
border-radius: 4px;
`;
const DropdownItem = styled.a`
color: rgb(41, 41, 41);
padding: 12px 16px;
text-decoration: none;
display: block;
cursor: pointer;
&:hover {
  background-color: #C7DFD1;
}
`;
const LoadMoreButton = styled.button`
display: table-cell;
text-align: center;
veritcal-align: bottom;
background-color: rgb(237, 237, 237);
border-color: rgb(184, 184, 184);
border-radius: 2px;
border-style: solid;
border-width: 1px;
font-family: Arial, Helvetica, "Bitstream Vera", sans-serif;
font-size: 14px;
line-height: 20px;
height: 32px;
width: 300px;
`;
const LoadMoreButtonParent = styled.div`
padding-top: 20px;
padding-bottom: 20px;
margin: auto;
display: table;
text-align: center;
vertical-align: bottom;
`;
const TestDiv = styled.div`
width: 50%
float: right;
padding-bottom: 20px;
`;
const AppHolder = styled.div`
width: 100%;
`;


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      shoeId: 20,
      sortMethod: 'Most Recent',
      starSelection: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    };
    this.componentMath = this.componentMath.bind(this);
    this.relevantSort = this.relevantSort.bind(this);
    this.helpfulSort = this.helpfulSort.bind(this);
    this.ratingSort = this.ratingSort.bind(this);
    this.dateSort = this.dateSort.bind(this);
    this.reorderClickHandler = this.reorderClickHandler.bind(this);
    this.colateInfo = this.colateInfo.bind(this);
    this.starSelector = this.starSelector.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  //counts each star rating, calculcates averages, updates state
  componentMath() {
    let starHolder = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      entries: 0,
      average: 0
    };
    let fitHolder = {
      fitTotal: 0,
      fitAverage: 0,
      widthTotal: 0,
      widthAverage: 0,
      starAverage: 0,
      entries: 0
    };
    this.state.reviews.forEach((review) => {
      starHolder[review.stars] += 1;
      fitHolder.fitTotal += review.fit;
      fitHolder.widthTotal += review.width;
      starHolder.entries += 1;
      fitHolder.entries += 1;
    });
    let totalStars = starHolder[1] + (starHolder[2] * 2) + (starHolder[3] * 3) + (starHolder[4] * 4) + (starHolder[5] * 5);
    starHolder.average = totalStars / starHolder.entries;
    let fitAverage = fitHolder.fitTotal / fitHolder.entries;
    let widthAverage = fitHolder.widthTotal / fitHolder.entries;
    fitHolder.fitAverage = fitAverage;
    fitHolder.widthAverage = widthAverage;
    fitHolder.starAverage = starHolder.average;
    this.setState({stars: starHolder, starAverage: starHolder.average, fit: fitHolder, update: true});
  }

  //sort reviews by relevance
  //it's unclear to me what REI's relevance criteria is, so for now this is effectively a random sort.
  relevantSort(reviews) {
    let result = reviews[0].sort((a, b) => {
      return b.user_id - a.user_id;
    })
    return result;
  }

  //sort based on helpful rating
  helpfulSort(reviews) {
    let result = reviews[0].sort((a, b) => {
      return b.helpful - a.helpful;
    })
    return result;
  }

  //sort based on star ratings - handles high to low and low to high
  ratingSort(reviews, critera) {
    if (critera === 'Highest to Lowest Rating') {
      let result = reviews[0].sort((a, b) => {
        return b.stars - a.stars;
      })
      return result;
    } else {
      let result = reviews[0].sort((a, b) => {
        return a.stars - b.stars;
      })
      return result;
    }
  }

  //sort based on review data, most recent first
  dateSort(reviews) {
    let result = reviews[0].sort((a, b) => {
      return moment(b.review_date).diff(a.review_date);
    })
    return result;
  }

  //handles review reorder based on click
  reorderClickHandler(criteria) {
    let ordered = [];
    if (criteria === 'Most Relevant') {
      ordered = this.relevantSort([this.state.reviews]);
    }
    if (criteria === 'Most Helpful') {
      ordered = this.helpfulSort([this.state.reviews]);
    }
    if (criteria === 'Highest to Lowest Rating') {
      ordered = this.ratingSort([this.state.reviews], criteria);
    }
    if (criteria === 'Lowest to Highest Rating') {
      ordered = this.ratingSort([this.state.reviews], criteria);
    }
    if (criteria === 'Most Recent') {
      ordered = this.dateSort([this.state.reviews]);
    }
    let colated = this.colateInfo(ordered);
    this.setState({colatedInfo: colated.colatedInfo, shownInfo: colated.shownInfo, sortMethod: criteria, savedColatedInfo: colated.colatedInfo, savedShownInfo: colated.shownInfo});
  }

  //organizes all recieved reviews and user records into pairs based on id to make rendering easier
  //shownInfo cuts the reviews down to 12 for the default display
  colateInfo(reviews) {
    let colatedInfo = [];
    let userInfo = this.state.users;
    reviews.forEach((item) => {
      let reviewComponent = [];
      reviewComponent.push(item);
      for (let index = 0; index < userInfo.length; index ++) {
        if (item.user_id === userInfo[index].id) {
          reviewComponent.push(userInfo[index]);
        }
      }
      colatedInfo.push(reviewComponent);
    })
    let shownInfo = colatedInfo.slice(0, 12);
    let result = {colatedInfo: colatedInfo, shownInfo: shownInfo};
    return result;
  }

  //allows filtering based on the clicked star rating
  //will need to add pop up buttons, ability to unfilter when clicked
  starSelector(rating) {
    let starDisplayedValues = Object.values(this.state.starSelection);
    if (starDisplayedValues.indexOf(1) === -1) {
      let starSpecific = [];
      let starsShown = this.state.starSelection;
      starsShown[rating] = 1;
      this.state.colatedInfo.forEach((item) => {
        if (item[0].stars === rating) {
          starSpecific.push(item);
        }
      })
      this.setState({colatedInfo: starSpecific, shownInfo: starSpecific, starSelection: starsShown});
    }
    if (starDisplayedValues.indexOf(1) !== -1 && this.state.starSelection[rating] === 0) {
      let previousItems = this.state.colatedInfo;
      let previousShown = this.state.shownInfo;
      let starsShown = this.state.starSelection;
      starsShown[rating] = 1;
      this.state.savedColatedInfo.forEach((item) => {
        if (item[0].stars === rating) {
          previousShown.push(item);
        }
      })
      this.setState({colatedInfo: previousItems, shownInfo: previousShown, starSelection: starsShown});
    }
  }

  showMore() {
    let moreInfo = [];
    for (let index = 0; index < this.state.shownInfo.length + 30; index ++) {
      if (this.state.colatedInfo[index]) {
        moreInfo.push(this.state.colatedInfo[index]);
      }
    }
    this.setState({shownInfo: moreInfo});
  }

  //makes the ajax request that provides the data rendered
  //could be made dynamic by changing the shoeId
  //sets state and begins the render process
  //calls componentMath() on every mount
  componentDidMount() {
    let shoeId = this.state.shoeId;
    $.ajax('http://localhost:3000/api/shoes/' + shoeId + '/reviews')
      .then((result) => {
        let userInfo = [];
        let reviewInfo = [];
        result.forEach((item) => {
          if (item[0].name !== undefined) {
            userInfo.push(item[0]);
          } else {
            reviewInfo.push(item[0]);
          }
        })
        let datedReviewInfo = this.dateSort(reviewInfo);
        this.setState({reviews: datedReviewInfo, users: userInfo});
        let displayInfo = this.colateInfo(datedReviewInfo);
        this.setState({colatedInfo: displayInfo.colatedInfo, shownInfo: displayInfo.shownInfo, savedColatedInfo: displayInfo.colatedInfo, savedShownInfo: displayInfo.shownInfo});
        this.componentMath();
      },
      (error) => {
        console.log('error');
      })
  }

  render() {
    if (this.state.update) {
      return (
        <AppHolder>
          <Title>Reviews</Title>
          <div>
            <WriteAReviewHolder>
              <WriteaReviewButton>Write a Review</WriteaReviewButton>
            </WriteAReviewHolder>
            <div>
              <Snapshot onClick={this.starSelector} stars={this.state.stars}/><Averages averages={this.state.fit}/>
            </div>
          </div>
          <div>
            <ControlBar>
              <ReviewBarCountHolder>
                <BaseSpanStyle>1-{this.state.shownInfo.length + ' '} of {this.state.colatedInfo.length + ' '} Reviews</BaseSpanStyle>
              </ReviewBarCountHolder>
              <TestDiv>
                <DropdownDivHolder>
                <DropdownButton>Sort by: {' ' + this.state.sortMethod}</DropdownButton>
                <DropdownContent>
                  <DropdownItem onClick={() => this.reorderClickHandler('Most Relevant')}>Most Relevant</DropdownItem>
                  <DropdownItem onClick={() => this.reorderClickHandler('Most Helpful')}>Most Helpful</DropdownItem>
                  <DropdownItem onClick={() => this.reorderClickHandler('Highest to Lowest Rating')}>Highest to Lowest Rating</DropdownItem>
                  <DropdownItem onClick={() => this.reorderClickHandler('Lowest to Highest Rating')}>Lowest to Highest Rating</DropdownItem>
                  <DropdownItem onClick={() => this.reorderClickHandler('Most Recent')}>Most Recent</DropdownItem>
                </DropdownContent>
              </DropdownDivHolder>
              </TestDiv>
            </ControlBar>
          </div>
          <div>
            {this.state.shownInfo.map((component, index) => <Review key={index} review={component[0]} user={component[1]}/>)}
          </div>
          <div>
            <div>
            <LoadMoreButtonParent>
              <LoadMoreButton onClick={() => this.showMore()}>Load More</LoadMoreButton>
            </LoadMoreButtonParent>
            </div>
          </div>
        </AppHolder>
      )
    } else {
      return (
        <div>loading...</div>
      )
    }
  }
 }

ReactDOM.render(<App />, document.getElementById('reviews-module'));