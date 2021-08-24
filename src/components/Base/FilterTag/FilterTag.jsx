import React from 'react'
import './FilterTag.css'

function FilterTag(props) {
    return (
        <div key={props.filter} onClick={()=>props.toggleSelection(props.filter)} className={`filterTagDiv ${props.isActive}`}>
            <span>{props.filter}</span>
        </div>
)
}

export default FilterTag
