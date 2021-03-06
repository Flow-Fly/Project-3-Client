//Avatar is a rounded picture with a blue border
//2 parameters :
//    -url : is the image url you wanna display
//    -size : can be either big, small or tiny

//children has been kept so that a dot can be added (for online/offline for instance)

import React from 'react';
import './Avatar.css';

const Avatar = ({ url, size, id, type, children }) => {
  let camp = null  
  if (type) {
    camp = type.replaceAll(' ', '');
  }

  return (
    <div className="avatarWrapper">
      {children}
      <div className={`avatar ${size} ${camp ? camp : ''}`}>
        <img src={url} alt="avatar" data-id={id} />
      </div>
    </div>
  );
};

export default Avatar;
