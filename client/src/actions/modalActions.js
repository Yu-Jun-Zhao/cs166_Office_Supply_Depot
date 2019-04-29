import {
    OPEN_MODAL,
    CLOSE_MODAL,
    SET_MODAL_PROPS
} from "./types";

export const openModal = () => ({
    type: OPEN_MODAL
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});

export const setModalProps = (modalProps) => ({
    type: SET_MODAL_PROPS,
    payload: modalProps
});