import React, { Component } from 'react'
import './TechnologyTag.css'

export class TechnologyTag extends Component {
    render() {
        return (
            <div className='TechnologyTagDiv'>
                <span>{this.props.technology}</span>
            </div>
        )
    }
}

export default TechnologyTag
