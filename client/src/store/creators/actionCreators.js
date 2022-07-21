import * as actionTypes from '../actions/actionTypes'

export const logIn = (userID) => {
    return {
        type: actionTypes.LOGIN,
        payload: userID
    }
}

export const logOut = () => {
    return {
        type: actionTypes.LOGOUT
    }
}