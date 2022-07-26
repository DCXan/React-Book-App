import * as actionTypes from '../store/actions/actionTypes'

const initialState = {
    cart: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_CART:
            return {
                ...state,
                cart: state.cart.concat(action.payload)
            }
        case actionTypes.LOGIN:
        return {
            ...state
        }
        case actionTypes.LOGOUT:
            return {
                ...state
            }
        default:
            return state
    }
}

export default reducer