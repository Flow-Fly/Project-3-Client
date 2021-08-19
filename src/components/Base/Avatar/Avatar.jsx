//Avatar is a rounded picture with a blue border
//2 parameters : 
//    -url : is the image url you wanna display
//    -size : can be either big or small
// big is 128px diameter || small is 40px diameter


import React from 'react'
import './Avatar.css'

const Avatar = ({url, size}) => {
    return (
        <div className={'avatar ' + size} >
            <img src={url} alt="avatar" />
        </div>
    )
}

export default Avatar
