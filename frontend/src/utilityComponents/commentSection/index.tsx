import React from 'react'
import './commentSection.css'

interface Props {
    comment: {
        id: number,
        name: string,
        body: string,
    };
}

const CommentSection: React.FC<Props> = ({ comment }) => {

    return (
        <div className="Comment__videoList">
            <div key={comment.id} className="comment__videoList">
                <h3 style={{ margin: '5px 0px' }}>{comment.name}</h3>
                <p style={{ margin: '5px 0px' }}>{comment.body}</p>
            </div>
        </div>
    )
}

export default CommentSection
