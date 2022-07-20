import * as actionTypes from '../store/actions/actionTypes'

const initialState = {
    isAuthenticated: false,
    userID: '1',
    cart: []
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case actionTypes.SENDID:
            return {
                ...state,
                isAuthenticated: true,
                userID: action.payload
            }
    }
    
}

export default reducer