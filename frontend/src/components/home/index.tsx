import React from 'react'
import VideoList from '../../utilityComponents/videoList';
import CommentSection from '../../utilityComponents/commentSection';
import { connect } from 'react-redux';
import './home.css'

const Home: React.FC<{}> = () => {

    const commentList = [
        {
            id: 1,
            name: "comment 1",
            body: "this is the body for the comment 1",
        },
        {
            id: 2,
            name: "comment 2",
            body: "this is the body for the comment 2",
        },
        {
            id: 3,
            name: "comment 3",
            body: "this is the body for the comment 3",
        },
        {
            id: 4,
            name: "comment 4",
            body: "this is the body for the comment 4",
        },
        {
            id: 5,
            name: "comment 5",
            body: "this is the body for the comment 5",
        },
        {
            id: 6,
            name: "comment 5",
            body: "this is the body for the comment 5",
        },
        {
            id: 7,
            name: "comment 5",
            body: "this is the body for the comment 5",
        },
    ]

    // console.log(`localhost:5000/1632688727703_SARW7125.avi`);
    const videoLink = `http://localhost:5000/1632688727703_SARW7125.avi`;

    /*aagaya chal kr URL kay liyay localhost kay saath name ki property ko concat
    krwana ho ga*/

    const videoList = [
        {
            id: 1,
            name: 'video1',
            title: 'video title',
            description: 'video description',
            url: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4',
            posted_time: '01:13:49',
            posted_date: 'may 19, 2014',
            likes: 200,
            dislikes: 500,
            comments: 12,
        },
        {
            id: 2,
            name: 'video1',
            title: 'video title',
            description: 'video description',
            url: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4',
            posted_time: '01:13:49',
            posted_date: 'may 19, 2014',
            likes: 200,
            dislikes: 500,
            comments: 12,
        },
        {
            id: 3,
            name: 'video1',
            title: 'video title',
            description: 'video description',
            url: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4',
            posted_time: '01:13:49',
            posted_date: 'may 19, 2014',
            likes: 200,
            dislikes: 500,
            comments: 12,
        },
        {
            id: 4,
            name: 'video1',
            title: 'video title',
            description: 'video description',
            url: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4',
            posted_time: '01:13:49',
            posted_date: 'may 19, 2014',
            likes: 200,
            dislikes: 500,
            comments: 12,
        },
        {
            id: 5,
            name: 'video1',
            title: 'video title',
            description: 'video description',
            url: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4',
            posted_time: '01:13:49',
            posted_date: 'may 19, 2014',
            likes: 200,
            dislikes: 500,
            comments: 12,
        },
    ];

    return (
        <div className="home">
            <div className="home__currentVideo">
                {/* <video src='https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4' controls width='100%' /> */}
                <video src={videoLink} controls width='100%' />
                {
                    commentList.map((comment: {
                        id: number,
                        name: string,
                        body: string,
                    }) => <CommentSection key={comment.id} comment={comment} />)
                }
                <div className="home__currentVideo__postComment">
                    <input type="text" className="comment_addComment" placeholder="Enter a comment" />
                    <button>Post</button>
                </div>
            </div>
            <div className="Home__videoList">
                {
                    videoList.map((video: {
                        id: number,
                        name: string,
                        title: string,
                        description: string,
                        url: string,
                        posted_time: string,
                        posted_date: string,
                        likes: number,
                        dislikes: number,
                        comments: number,
                    }) => <VideoList video={video} key={video.id} />)
                }
            </div>
        </div>
    )
}

const mapStateToProps = () => {
    return {

    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
