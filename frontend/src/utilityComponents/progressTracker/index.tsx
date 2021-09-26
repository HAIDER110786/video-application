import React from 'react'
import './progressTracker.css'

type Props = {
    progress: number
}

const ProgressTracker: React.FC<Props> = ({ progress }) => {
    return (
        <div className="ProgressTracker">
            <div className="innerProgressTracker">
                <div style={{ width: progress }} className="MovingProgressTrackerBar"></div>
                <div className="ProgressTrackerBar"></div>
                <div className="circle firstCircle"></div>
                <div className="circle secondCircle"></div>
                <div className="circle thirdCircle"></div>
            </div>
        </div>
    )
}

export default ProgressTracker
