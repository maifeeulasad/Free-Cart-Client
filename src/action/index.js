export const SET_ITEM_ACTION = 'SET_ITEM_ACTION';
export const CLEAR_ITEM_ACTION = 'CLEAR_ITEM_ACTION';

export function setItemAction(data) {
    return {type: SET_ITEM_ACTION, data};
}

export function clearItemAction() {
    return {type: CLEAR_ITEM_ACTION}
}