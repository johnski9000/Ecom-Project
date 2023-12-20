import { Component } from "react";
import StarRating from "react-native-star-rating";

class GeneralStarExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: props.rating,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  render() {
    return (
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
    );
  }
}

export default GeneralStarExample;
