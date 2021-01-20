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
        <div>
          <div>Reviews</div>
          <div>
            <Snapshot onClick={this.starSelector} stars={this.state.stars}/><Averages averages={this.state.fit}/>
          </div>
          <div>1-{this.state.shownInfo.length + ' '} of {this.state.colatedInfo.length + ' '} Reviews</div>
          <div>
            <button>Sort by: {' ' + this.state.sortMethod}</button>
            <div></div>
            <a onClick={() => this.reorderClickHandler('Most Relevant')}>Most Relevant</a>
            <a onClick={() => this.reorderClickHandler('Most Helpful')}>Most Helpful</a>
            <a onClick={() => this.reorderClickHandler('Highest to Lowest Rating')}>Highest to Lowest Rating</a>
            <a onClick={() => this.reorderClickHandler('Lowest to Highest Rating')}>Lowest to Highest Rating</a>
            <a onClick={() => this.reorderClickHandler('Most Recent')}>Most Recent</a>
          </div>
          <div>
            {this.state.shownInfo.map((component, index) => <Review key={index} review={component[0]} user={component[1]}/>)}
          </div>
          <div>
            <button onClick={() => this.showMore()}>Load More</button>
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