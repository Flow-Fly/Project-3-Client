import React, { Component } from 'react';
// import apiHandler from '../../api/apiHandler'
import '../FilterJobs/FilterJobs.css';
import FilterTag from '../Base/FilterTag/FilterTag';

export class FilterPost extends Component {
  state = {
    filters: [],
    originalFilters: [],
  };

  componentDidMount() {
    let filtersTemp = [];
    this.props.posts.forEach((post) => {
      if (filtersTemp.includes(post.type) === false)
        filtersTemp.push(post.type);
    });

    this.setState({ originalFilters: filtersTemp });
  }

  componentDidUpdate(prevProps) {
    if (this.props.originalPosts !== prevProps.originalPosts) {
      let filtersTemp = [];
      this.props.posts.forEach((post) => {
        if (filtersTemp.includes(post.type) === false)
          filtersTemp.push(post.type);
      });

      this.setState({ originalFilters: filtersTemp });
    }
  }

  toggleSelection = (filter) => {
    if (this.state.filters.includes(filter)) {
      this.setState(
        {
          filters: this.state.filters.filter((tag) => {
            return tag !== filter;
          }),
        },
        () => {
          this.props.filterPosts(this.state.filters);
        }
      );
    } else {
      let filtersTemp = [...this.state.filters];
      filtersTemp.push(filter);
      this.setState(
        {
          filters: filtersTemp,
        },
        () => {
          this.props.filterPosts(this.state.filters);
        }
      );
    }
  };

  render() {
    // if (this.state.isOriginalLoaded===false && this.props.originalPosts.length>0){
    //     let filtersTemp=[];
    //     this.props.posts.forEach((post)=>{
    //     if (filtersTemp.includes(post.type)===false) filtersTemp.push(post.type);
    //     })

    //     this.setState({originalFilters:filtersTemp,isOriginalLoaded:true})
    // }

    return (
      <div className="filterPostWrapper">
        <h5>Filter posts by post</h5>
        <div className="filerPostTag">
          {this.state.originalFilters.map((filter) => {
            return (
              <FilterTag
                key={filter}
                filter={filter}
                isActive={this.state.filters.includes(filter) ? 'active' : ''}
                toggleSelection={this.toggleSelection}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default FilterPost;
