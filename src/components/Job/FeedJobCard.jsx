import React from 'react';
// import Button from '../Base/Button/Button';
import './FeedJobCard.css';

const FeedJobCard = (props) => {
  const job = props.job;
  // console.log('job', job);

  //   // handleDelete,
  //   // handleEdit,

  //   // description,
  //   // technologies,
  //   // remote,
  //   // creator,
  //   // link,

  return (
    <div>
      <div className="FeedJobCard">
        <h5>{job.title}</h5>
        <ul key={job._id}>
          <li>
            <b>{job.company}</b>
          </li>
          <li>
            {job.location} |{' '}
            {job.contractType !== undefined ? job.contractType : '...'} |
            {job.level}
          </li>
        </ul>

        {/* <Button handleClick={(event) => handleEdit(_id)}>Edit</Button>
        <Button handleClick={(event) => handleDelete(_id)}>Delete</Button> */}
      </div>
    </div>
  );
};

export default FeedJobCard;
