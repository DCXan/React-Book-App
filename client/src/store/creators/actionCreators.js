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

export const addToCart = (book) => {
    return {
        type: actionTypes.ADD_CART,
        payload: book
    }
}

export const cartDelete = (book) => {
    return {
        type: actionTypes.CART_DELETE,
        payload: book
    }
}