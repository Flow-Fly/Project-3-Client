//Avatar is a rounded picture with a blue border
//2 parameters :
//    -url : is the image url you wanna display
//    -size : can be either big, small or tiny

//children has been kept so that a dot can be added (for online/offline for instance)

import React from 'react';
import Profile from '../../Profile/Profile';
import {Redirect} from 'react-router-dom'
import './Avatar.css';

const Avatar = ({ url, size, id, clickOnProfile ,children }) => {
  return (
    <div className="avatarWrapper">
      {id ? (
        <div className={'avatar ' + size} onClick={clickOnProfile}>
          <img src={url} alt="avatar"  data-id={id} />
        </div>
      ) : (
        <div className={'avatar ' + size}>
          <img src={url} alt="avatar" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
