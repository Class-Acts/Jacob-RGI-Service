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
    this.starCounter = this.starCounter.bind(this);
  }
  dateOrder(reviews) {
    let result = reviews[0].sort((a, b) => {
      return moment(b.review_date).diff(a.review_date);
    })
    return result;
  }
  starCounter() {
    let holder = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      entries: 0,
      average: 0
    };
    this.state.reviews.forEach((review) => {
      holder[review.stars] += 1;
      holder.entries += 1;
    });
    let totalStars = holder[1] + (holder[2] * 2) + (holder[3] * 3) + (holder[4] * 4) + (holder[5] * 5);
    holder.average = totalStars / holder.entries;
    console.log(holder);
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
        this.starCounter();
      },
      (error) => {
        console.log('error');
      })
  }
  render() {
    return (
      <div>
        <div></div>
        <div>
          <Snapshot /><Averages />
        </div>
        <Review reviews={this.state.reviews} users={this.state.users}/>
      </div>
    )
  }
 }

ReactDOM.render(<App />, document.getElementById('reviews-module'));