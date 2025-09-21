import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {ButtonType} from "../enums/button-type.ts";

interface startRacing {
    id: number,
    mode: string,
}

const initialState: startRacing = {
    id: 0,
    mode: ""
}

const carRaceStartSlice = createSlice({
    name: "carRaceStart",
    initialState,
    reducers: {
        startCarRacing: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
            state.mode = ButtonType.START
        },
        stopCarRacing: (state, action) => {
            state.id = action.payload;
            state.mode = ButtonType.STOP
        }
    }
})

export const {startCarRacing, stopCarRacing} = carRaceStartSlice.actions;
export default carRaceStartSlice;