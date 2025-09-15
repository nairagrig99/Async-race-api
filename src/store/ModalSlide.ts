// src/store/slices/modalSlice.ts (make sure the path is correct)
import {createSlice} from "@reduxjs/toolkit";
import type {ModalState} from "../interface/modal-state.ts";

const initialState: ModalState = {
    isOpen: false
};

const modalSlice = createSlice({
    name: "carModal",
    initialState,
    reducers: {
        openCarModal: (state) => {
            state.isOpen = true;
        },
        closeCarModal: (state) => {
            state.isOpen = false;
        },
        toggleCarModal: (state) => {
            state.isOpen = !state.isOpen;
        }
    }
});

export const {openCarModal, closeCarModal, toggleCarModal} = modalSlice.actions;
export default modalSlice;