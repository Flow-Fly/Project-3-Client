import React from 'react'
import './FilterTag.css'

function FilterTag(props) {
    return (
        <div className='filterTagDiv'>
            <span>{props.filter}</span>
        </div>
)
}

export default FilterTag
