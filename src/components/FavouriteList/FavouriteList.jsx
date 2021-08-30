import React, { Component } from 'react';
import './FavouriteList.css';
import apiHandler from '../../api/apiHandler';
import { Link } from 'react-router-dom';

export class FavouriteList extends Component {
  state = {
    elements: null,
  };

  async componentDidMount() {
    apiHandler
      .getFavourites()
      .then((dbRes) => {
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
    if (this.state.elements === null) {
      return <div className="loading">Loading...</div>;
    }
    return (
      <div className="favList">
        <h6>Favourite {this.props.type}s:</h6>
        <ul>
          {this.state.elements.map((element) => {
            return (
              <li>
                <span
                  className="remove"
                  onClick={() => {
                    this.removeFromFavourites(element._id);
                  }}
                >
                 <i class="fas fa-minus-circle"></i>
                </span>
                <Link
                  to={
                    (this.props.type === 'Post' ? '/post/#' : '/job/#') +
                    element._id
                  }
                >
                  {element.title}{' '}
                </Link>
                
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default FavouriteList;
