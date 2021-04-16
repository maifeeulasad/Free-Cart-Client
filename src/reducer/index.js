import {CLEAR_ITEM_ACTION, SET_ITEM_ACTION} from '../action'

const initialAppState = {
    cartItems: {},
    name: '',
    address: '',
    contact: '',
};

export const reducer = (state = initialAppState, action) => {
    if (action.type === SET_ITEM_ACTION) {
        state.cartItems = {...state.cartItems, ...action.data}
    }else if(action.type===CLEAR_ITEM_ACTION){
        state.cartItems = {}
    }
    console.log(JSON.stringify(state.cartItems))
    return {...state};
};