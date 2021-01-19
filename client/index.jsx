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
      shoeId: 20
    };
    this.dateOrder = this.dateOrder.bind(this);
    this.componentMath = this.componentMath.bind(this);
  }

  dateOrder(reviews) {
    let result = reviews[0].sort((a, b) => {
      return moment(b.review_date).diff(a.review_date);
    })
    return result;
  }

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
        let datedReviewInfo = this.dateOrder(reviewInfo);
        this.setState({reviews: datedReviewInfo, users: userInfo});
        this.componentMath();
      },
      (error) => {
        console.log('error');
      })
  }
  render() {
    if (this.state.update) {
      return (
        <div>
          <div>Reviews</div>
          <div>
            <Snapshot stars={this.state.stars}/><Averages averages={this.state.fit}/>
          </div>
          <Review reviews={this.state.reviews} users={this.state.users}/>
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