import {SET_ITEM_ACTION} from '../action'

const initialAppState = {
    cartItems: {},
};

export const reducer = (state = initialAppState, action) => {
    if (action.type === SET_ITEM_ACTION) {
        let data = {[action.id]: action.count}
        Object.assign(state, data)
    }
    return state;
};