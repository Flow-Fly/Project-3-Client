import React, { Component } from 'react'

class Messenger extends Component {





    render() {
        return (
            <div className="messenger">
                <div className="chatMenu">
                    
                </div>
                <div className="chatBox">
                    <div className="chatBoxWritting">
                        <textarea className="chatBoxInput" placeholder="Write your message ..."></textarea>
                        <button className="ChatSendMessage">Send</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default Messenger
