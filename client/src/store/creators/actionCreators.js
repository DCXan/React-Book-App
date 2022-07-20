import * as actionTypes from '../actions/actionTypes'

export const sendUserID = (userID) => {
    return {
        type: actionTypes.SENDID,
        payload: userID
    }
}