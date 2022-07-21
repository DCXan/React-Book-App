import * as actionTypes from '../store/actions/actionTypes'

const initialState = {
    isAuthenticated: false,
    userID: ''
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                userID: action.payload
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                userID: ''
            }
        default:
            return state
    }
    
}

export default reducer