import {createSlice} from "@reduxjs/toolkit";
import type {ModalWinnerState} from "../interface/modal-state.ts";

const initialState: ModalWinnerState = {
    isOpen: false,
    winner: null
}
export const winnerModalSlice = createSlice({
    name: "winnerModalSlice",
    initialState,
    reducers: {
        showWinnerModal: (state, action) => {
            state.isOpen = true;
            state.winner = action.payload
        },
        hideWinnerModal: (state) => {
            state.isOpen = false;
            state.winner = null
        }
    }
})

export const {showWinnerModal, hideWinnerModal} = winnerModalSlice.actions;
export default winnerModalSlice