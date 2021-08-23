import React from 'react'
import { withUser } from '../../Auth/withUser';
import Avatar from '../Avatar/Avatar'
import './SideProfile.css'
import {Link} from 'react-router-dom'


const SideProfile = (props) => {
    const picture = null || props.context.user?.profileImg
    const firstName = null || props.context.user?.firstName
    const lastName = null || props.context.user?.lastName
    const type = null || props.context.user?.type
    const graduationYear = null || props.context.user?.graduationYear
    const location = null || props.context.user?.location

    return (
        <>
        <div className="side-profile-container">
            <div className="wrapper-picture-and-name">

            <Avatar url={picture} size='big' />
            <h5>
                {firstName}&nbsp;{lastName}
            </h5>
            {type && <h6>{type}</h6>}
            </div>
            <div className="informations">
                {graduationYear && <p>
                    Graduated in: <span>{graduationYear}</span>
                </p>}
                {location && <p>
                    From: <span>{location}</span>
                    </p>}
            </div>
            <div className="edit-link">
            <Link to='/edit'>Edit my profile</Link>
            </div>
        </div>
        </>
    )
}

export default withUser(SideProfile)
