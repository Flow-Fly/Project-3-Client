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

    console.log('Side profile props: ', props)
    return (
        <>
        <div className="side-profile-container">
            <div className="wrapper-picture-and-name">

            <Avatar url={picture} size='big' />
            <h4>
                {firstName}&nbsp;{lastName}
            </h4>
            </div>
            <div className="informations">
                {type && <p>{type}</p>}
                {graduationYear && <h5>
                    Graduated in: <span>{graduationYear}</span>
                </h5>}
                {location && <h5>
                    From: <span>{location}</span>
                    </h5>}
            </div>
            <Link to='/edit'>Edit my profile</Link>
        </div>
        </>
    )
}

export default withUser(SideProfile)
