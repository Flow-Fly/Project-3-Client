import React, { Component } from 'react';
import './FilterJobs.css';
import FilterTag from '../Base/FilterTag/FilterTag';

export class FilterJobs extends Component {
  state = {
    typeFilters: [],
    contractTypeFilters: [],
    locationFilters: [],
    levelFilters: [],
    availableTypeFilters: [],
    availableContractTypeFilters: [],
    availableLocationFilters: [],
    availableLevelFilters: [],
  };

  componentDidMount() {
    this.prepareAvailableFilters();
  }

  componentDidUpdate(prevPros) {
    if (this.props.originalJobs !== prevPros.originalJobs) {
      this.prepareAvailableFilters();
    }
  }

  prepareAvailableFilters() {
    let typeFilters = [];
    let contractTypeFilters = [];
    let locationFilters = [];
    let levelFilters = [];

    this.props.jobs.forEach((job) => {
      if (job.type && !typeFilters.includes(job.type)) {
        typeFilters.push(job.type);
      }
      if (job.contractType && !contractTypeFilters.includes(job.contractType)) {
        contractTypeFilters.push(job.contractType);
      }
      if (job.location && !locationFilters.includes(job.location)) {
        locationFilters.push(job.location);
      }
      if (job.level && !levelFilters.includes(job.level)) {
        levelFilters.push(job.level);
      }
    });

    this.setState({
      availableTypeFilters: typeFilters,
      availableContractTypeFilters: contractTypeFilters,
      availableLocationFilters: locationFilters,
      availableLevelFilters: levelFilters,
    });
  }

  //dynamic toggleSelection function, change key depending on the object attribute (defined on Home.jsx)
  toggleSelection = (key, filter) => {
    if (this.state[key].includes(filter)) {
      this.setState(
        {
          [key]: this.state[key].filter((tag) => {
            return tag !== filter;
          }),
        },
        () => {
          this.filterJobs();
        }
      );
    } else {
      this.setState({ [key]: [...this.state[key], filter] }, () => {
        this.filterJobs();
      });
    }
  };

  filterJobs() {
    this.props.filterJobs({
      type: this.state.typeFilters,
      contractType: this.state.contractTypeFilters,
      location: this.state.locationFilters,
      level: this.state.levelFilters,
    });
  }

  render() {
    return (
      // <>
      //   <div className="jobFilterWrapper">
      //     <h6>Filter by job domain</h6>
      //     <div className="jobFilterTag">
      //       {this.state.availableTypeFilters.map((filter) => {
      //         return (
      //           <FilterTag
      //             key={filter}
      //             filter={filter}
      //             isActive={
      //               this.state.typeFilters.includes(filter) ? 'active' : ''
      //             }
      //             toggleSelection={() => {
      //               this.toggleSelection('typeFilters', filter);
      //             }}
      //           />
      //         );
      //       })}

      //       <h6>Filter by contract type</h6>
      //       <div className="jobFilterTag">
      //         {this.state.availableContractTypeFilters.map((filter) => {
      //           return (
      //             <FilterTag
      //               key={filter}
      //               filter={filter}
      //               isActive={
      //                 this.state.contractTypeFilters.includes(filter)
      //                   ? 'active'
      //                   : ''
      //               }
      //               toggleSelection={() => {
      //                 this.toggleSelection('contractTypeFilters', filter);
      //               }}
      //             />
      //           );
      //         })}
      //       </div>
      //     </div>

      //     <h6>Filter by job location</h6>
      //     <div className="jobFilterTag">
      //       {this.state.availableLocationFilters.map((filter) => {
      //         return (
      //           <FilterTag
      //             key={filter}
      //             filter={filter}
      //             isActive={
      //               this.state.locationFilters.includes(filter) ? 'active' : ''
      //             }
      //             toggleSelection={() => {
      //               this.toggleSelection('locationFilters', filter);
      //             }}
      //           />
      //         );
      //       })}
      //     </div>
      //     <h6>Filter by job level</h6>
      //     <div className="jobFilterTag">
      //       {this.state.availableLevelFilters.map((filter) => {
      //         return (
      //           <FilterTag
      //             key={filter}
      //             filter={filter}
      //             isActive={
      //               this.state.levelFilters.includes(filter) ? 'active' : ''
      //             }
      //             toggleSelection={() => {
      //               this.toggleSelection('levelFilters', filter);
      //             }}
      //           />
      //         );
      //       })}
      //     </div>
      //   </div>
      // </>

      <div>
        <div className="jobFilterWrapper">
          <h6>Filter by job domain</h6>
          <div className="jobFilterTag">
            {this.state.availableTypeFilters.map((filter) => {
              return (
                <FilterTag
                  key={filter}
                  filter={filter}
                  isActive={
                    this.state.typeFilters.includes(filter) ? 'active' : ''
                  }
                  toggleSelection={() => {
                    this.toggleSelection('typeFilters', filter);
                  }}
                />
              );
            })}
          </div>
        </div>
      <div className="jobFilterWrapper">
        <h6>Filter by contract type</h6>
        <div className="jobFilterTag">
          {this.state.availableContractTypeFilters.map((filter) => {
            return (
              <FilterTag
                key={filter}
                filter={filter}
                isActive={
                  this.state.contractTypeFilters.includes(filter)
                    ? 'active'
                    : ''
                }
                toggleSelection={() => {
                  this.toggleSelection('contractTypeFilters', filter);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="jobFilterWrapper">
        <h6>Filter by job location</h6>
        <div className="jobFilterTag">
          {this.state.availableLocationFilters.map((filter) => {
            return (
              <FilterTag
                key={filter}
                filter={filter}
                isActive={
                  this.state.locationFilters.includes(filter) ? 'active' : ''
                }
                toggleSelection={() => {
                  this.toggleSelection('locationFilters', filter);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="jobFilterWrapper">
        <h6>Filter by job level</h6>
        <div className="jobFilterTag">
          {this.state.availableLevelFilters.map((filter) => {
            return (
              <FilterTag
                key={filter}
                filter={filter}
                isActive={
                  this.state.levelFilters.includes(filter) ? 'active' : ''
                }
                toggleSelection={() => {
                  this.toggleSelection('levelFilters', filter);
                }}
              />
            );
          })}
        </div>
      </div>
      </div>
    );
  }
}

export default FilterJobs;
