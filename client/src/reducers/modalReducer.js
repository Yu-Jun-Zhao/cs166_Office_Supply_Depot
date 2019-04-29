import {

} from "../actions/types";

const initialState = {
    isModalOpen: false,
    modalProps: null
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
