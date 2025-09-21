import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ModalState} from "../interface/modal-state.ts";
import {ButtonType} from "../enums/button-type.ts";
import type {CarModelInterface} from "../interface/car-model.interface.ts";

const initialState: ModalState = {
    isOpen: false,
    mode: ButtonType.CREATE,
    car: undefined
};

const modalSlice = createSlice({
    name: "carModal",
    initialState,
    reducers: {
        openCarModal: (state, action: PayloadAction<{
            mode: ButtonType.CREATE | ButtonType.EDIT;
            car: CarModelInterface | undefined
        }>) => {
            state.isOpen = true;
            state.mode = action.payload.mode;
            state.car = action.payload.car
        },
        closeCarModal: (state) => {
            state.isOpen = false;
            state.car = undefined
        }
    }
});

export const {openCarModal, closeCarModal} = modalSlice.actions;
export default modalSlice;