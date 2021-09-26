import React from 'react'
import './videoList.css'

interface Props {
    video: {
        id: number,
        name: string,
        url: string,
        posted_time: string,
        likes: number,
        dislikes: number,
        comments: number,
    }
}

const VideoList: React.FC<Props> = ({ video }) => {

    return (
        <div className="home__videoList" key={video.id}>
            <div className="videoList__video">
                <video
                    src={video.url}
                    controls
                />
            </div>
            <div className="videoList__videoDetails">
                <h3>{video.name}</h3>
                <p>{video.posted_time}</p>
            </div>
        </div>
    )
}

export default VideoList
