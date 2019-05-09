import {
    OPEN_MODAL,
    CLOSE_MODAL, SET_MODAL_PROPS
} from "../actions/types";

const initialState = {
    isModalOpen: false,
    modalProps: null
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                isModalOpen: true
            };
        case CLOSE_MODAL:
            return {
                isModalOpen: false
            };
        case SET_MODAL_PROPS:
            return {
                ...state,
                modalProps: action.payload
            }
        default:
            return state;
    }
}
