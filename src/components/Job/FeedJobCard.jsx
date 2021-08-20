import React from 'react';
import Button from '../Base/Button/Button';

const FeedJobCard = (props) => {
  const {
    _id,
    title,
    company,
    location,
    contractType,
    handleDelete,
    handleEdit,
    // type,
    // description,
    // technologies,
    // remote,
    // creator,
    // link,
    // level,
  } = props;

  return (
    <div>
      <div>
        <h5>{title}</h5>
        <ul>
          <li>{company}</li>
          <li>
            {location} | {contractType}
          </li>
        </ul>

        {/* <Button handleClick={(event) => handleEdit(_id)}>Edit</Button>
        <Button handleClick={(event) => handleDelete(_id)}>Delete</Button> */}

        {/* <p>{description}</p> 
        <p>{technologies}</p>
        <p>{remote}</p>
        <p>{creator}</p>
        <p>{link}</p>
        <p>{level}</p>
        <p>{type}</p>*/}
      </div>
    </div>
  );
};

export default FeedJobCard;
