import React from 'react'
import { connect } from 'react-redux';
import { dummyAction } from '../../store/actions';
import { I1 } from './../../store/reducers/dummyReducer';

interface IProps {
    dummyData: I1["dummyData"],
    dummyAction: () => void,
    dummyDataError: I1["dummyDataError"],
    loadingDummyData: I1["loadingDummyData"],
}

// interface Props {
//     dummyData: any,
//     dummyDataError: any,
//     loadingDummyData: any,
//     dummyAction: any,
// }

// function Testing({
//     dummyData,
//     dummyDataError,
//     loadingDummyData,
//     dummyAction
// }: Props) {

const Testing: React.FC<IProps> = ({
    dummyData,
    dummyDataError,
    loadingDummyData,
    dummyAction
}) => {

    React.useEffect(() => {
        dummyAction();
    }, [dummyAction])


    return (
        <div>
            {
                dummyData === ''
                    ? <div>it's empty</div>
                    : <div>it's not empty</div>
            }
        </div>
    )
}

const mapStateToProps = (state: {
    dummyReducer: {
        dummyData: I1["dummyData"],
        dummyDataError: I1["dummyDataError"],
        loadingDummyData: I1["loadingDummyData"]
    }
}) => {
    return ({
        dummyData: state.dummyReducer.dummyData
    })
}

const mapDispatchToProps = {
    dummyAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Testing);
