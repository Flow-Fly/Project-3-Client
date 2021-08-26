import React, { Component } from 'react';
import './FavouriteList.css';
import apiHandler from '../../api/apiHandler';

export class FavouriteList extends Component {
  state = {
    elements: null,
  };

  async componentDidMount() {
    apiHandler
      .getFavourites()
      .then((dbRes) => {
        console.log(dbRes.favouritePosts);
        if (this.props.type === 'Post') {
          this.setState({ elements: dbRes.favouritePosts });
        } else if (this.props.type === 'Job') {
          this.setState({ elements: dbRes.favouriteJobs });
        }
      })
      .catch((error) => console.log(error));
  }

  removeFromFavourites = (postId) => {
    apiHandler
      .deleteFavouritePost(postId)
      .then((dbRes) => {
        this.setState({
          elements: this.state.elements.filter(
            (element) => String(element._id) !== postId
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.elements === null)
      return <div className="loading">Loading...</div>;
    return (
      <div className="favList">
        <h6>{this.props.type}:</h6>
        <ul>
          {this.state.elements.map((element) => {
            return (
              <li>
                {element.title}{' '}
                <span
                  className="remove"
                  onClick={() => {
                    this.removeFromFavourites(element._id);
                  }}
                >
                  X
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default FavouriteList;
