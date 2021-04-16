import {SET_ITEM_ACTION} from '../action'

const initialAppState = {
    cartItems: {},
};

export const reducer = (state = initialAppState, action) => {
    if (action.type === SET_ITEM_ACTION) {
        state.cartItems = {...state.cartItems, ...action.data}
    }
    return {...state};
};