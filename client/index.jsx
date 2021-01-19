import React from 'react';
import ReactDOM from 'react-dom';
import Averages from './average-response-module.jsx';
import Snapshot from './snapshot.jsx';
import Review from './review.jsx';
import $ from 'jquery';
import moment from 'moment';
moment().format();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      shoeId: 20,
      sortMethod: 'Most Recent'
    };
    this.componentMath = this.componentMath.bind(this);
    this.relevantSort = this.relevantSort.bind(this);
    this.helpfulSort = this.helpfulSort.bind(this);
    this.ratingSort = this.ratingSort.bind(this);
    this.dateSort = this.dateSort.bind(this);
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
  ratingSort(reviews, method) {
    if (method === 'Highest to Lowest Rating') {
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

  //makes the ajax request that provides the data rendered
  //could be made dynamic by changing the shoeId
  //colates the review response into paired review, user info for that review
  //creates an array of 12 colated reviews to be displayed at first
  //sets state and begins the render process
  //calls componentMath() on every mount
  componentDidMount() {
    let shoeId = this.state.shoeId;
    $.ajax('/api/shoes/' + shoeId + '/reviews')
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
        let datedReviewInfo = this.helpfulSort(reviewInfo);
        let colatedInfo = [];
        datedReviewInfo.forEach((item) => {
          let reviewComponent = [];
          reviewComponent.push(item);
          for (let index = 0; index < userInfo.length; index ++) {
            if (item.user_id === userInfo[index].id) {
              reviewComponent.push(userInfo[index]);
              colatedInfo.push(reviewComponent);
            }
          }
        })
        let shownInfo = colatedInfo.slice(0, 12);
        if (this.state.sortMethod === 'Most Recent') {
          this.setState({reviews: datedReviewInfo, users: userInfo, colatedInfo: colatedInfo, shownInfo: shownInfo});
        }
        this.componentMath();
      },
      (error) => {
        console.log('error');
      })
  }
  render() {
    console.log(this.state.shownInfo);
    if (this.state.update) {
      return (
        <div>
          <div>Reviews</div>
          <div>
            <Snapshot stars={this.state.stars}/><Averages averages={this.state.fit}/>
          </div>
          <div>1-{this.state.shownInfo.length + ' '} of {this.state.colatedInfo.length + ' '} Reviews</div>
          <div>Sort by: {' ' + this.state.sortMethod}</div>
          <div>
            {this.state.shownInfo.map((component, index) => <Review key={index} review={component[0]} user={component[1]}/>)}
          </div>
        </div>
      )
    } else {
      return (
        <div>loading...</div>
      )
    }
  }
 }

ReactDOM.render(<App />, document.getElementById('reviews-module'));