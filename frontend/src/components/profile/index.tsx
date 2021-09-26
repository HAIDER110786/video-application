import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import ProgressTracker from '../../utilityComponents/progressTracker'
import { videoAction } from '../../store/actions'
import { connect } from 'react-redux';
import './profile.css'

interface Props {
    percentage: number,
    videoAction: (data: FormData) => void
};

type FormFieldType = {
    videoFileName: string,
    videoTitle: string,
    videoDescription: string
};

const Profile: React.FC<Props> = ({
    percentage,
    videoAction
}) => {

    const [uploading, setUploading] = useState<boolean>(false)
    const [formPart, setFormPart] = useState<number>(1)
    const [progress, setProgress] = useState<number>(0);
    const [formData, setFormData] = useState<FormFieldType>({
        videoFileName: '',
        videoTitle: '',
        videoDescription: ''
    });

    const handleVideoUpload = async (e: any) => {

        setProgress(500);
        setUploading(true);

        let data = new FormData()

        data.append('file', e.target.files[0])
        data.append('title', formData.videoTitle)
        data.append('description', formData.videoDescription)

        videoAction(data);
    }

    const Proceed = () => {
        if (!formData.videoDescription || !formData.videoTitle)
            return alert("Please enter the video title and video description")

        setFormPart(2);
        setProgress(250);
    }

    const refresh = () => {
        setFormData({
            ...formData,
            videoFileName: '',
            videoTitle: '',
            videoDescription: '',
        })

        setFormPart(1);
    }

    if (percentage === 100) {
        setTimeout(() => {
            setUploading(false);
            setFormPart(1);
            setProgress(0);
            setFormData({
                videoFileName: '',
                videoTitle: '',
                videoDescription: '',
            })
        }, 500);
    }

    const handleFormValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div className="Profile">
            <ProgressTracker progress={progress} />
            <div className="Profile__UploadSection">
                <div className="videoDetailForms" style={{ width: formPart === 1 ? "35%" : 0, padding: formPart === 1 ? "30px" : 0, overflow: formPart === 1 ? "" : "hidden" }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="videoTitle" style={{ marginBottom: 10 }}>Title</label>
                        <input value={formData.videoTitle} type="text" id="videoTitle" placeholder="Enter your video title" onChange={(e) => handleFormValueChange(e)} required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="videoDescription" style={{ marginBottom: 10 }}>Description</label>
                        <textarea value={formData.videoDescription} onChange={(e) => handleFormValueChange(e)} style={{ resize: 'none' }} id="videoDescription" placeholder="Enter your video description" rows={5}></textarea>
                    </div>
                    <label onClick={Proceed} className="label">Proceed</label>
                </div>
                <div className="uploadDiv" style={{ width: formPart === 2 ? "35%" : 0, padding: formPart === 2 ? "30px" : 0, overflow: formPart === 2 ? "" : "hidden" }}>
                    {formPart === 2 && <div onClick={() => setFormPart(1)} style={{ alignSelf: 'flex-start', position: 'absolute', top: '20%', left: '31%', cursor: 'pointer' }}>&#x2190;</div>}
                    {formPart === 2 && <div onClick={refresh} style={{ alignSelf: 'flex-end', position: 'absolute', top: '20%', left: '68%', cursor: 'pointer' }}>x</div>}
                    <div className="iconDiv">
                        {
                            uploading
                                ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 350 }}>
                                    <div style={{ height: 3, width: '85%', backgroundColor: 'white' }}>
                                        <div style={{ height: '100%', width: `${percentage}%`, backgroundColor: 'crimson' }}>
                                        </div>
                                    </div>
                                    <div>
                                        {percentage}%
                                    </div>
                                </div>
                                : <FontAwesomeIcon icon={faUpload} size="6x" />
                        }
                    </div>
                    {
                        uploading
                            ? <h3>Uploading Video... </h3>
                            : <h3>Upload New Video</h3>
                    }
                    {
                        uploading
                            ? <h4>Please wait while your video is being uploaded</h4>
                            : <h5>Click the button or drag and drop your video here</h5>
                    }
                    <input
                        type="file"
                        id="video"
                        accept="video/*"
                        value={formData.videoFileName}
                        onChange={e => handleVideoUpload(e)}
                        style={{ display: 'none' }}
                        required
                    />
                    <label className="upload_img" htmlFor="video">Upload Video</label>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    percentage: state.videoReducer.percentage
})

const mapDispatchToProps = {
    videoAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)