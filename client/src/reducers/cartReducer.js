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
                ...state,
                cart: []
            }
        case actionTypes.CART_DELETE:
            return {
                ...state,
                cart: state.cart.filter(book => book.id !== action.payload.id)
            }
        default:
            return state
    }
}

export default reducer