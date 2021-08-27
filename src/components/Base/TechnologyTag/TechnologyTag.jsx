import React from 'react';
import './TechnologyTag.css';

function TechnologyTag(props) {
  return (
    <div className="TechnologyTagDiv">
      <span>{props.technology}</span>
      <span className="deleteTag" onClick={props.remove}>
        x
      </span>
    </div>
  );
}

export default TechnologyTag;
