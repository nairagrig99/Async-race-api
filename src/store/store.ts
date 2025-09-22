import {configureStore} from "@reduxjs/toolkit";
import modalSlice from "./ModalSlide.ts";
import carSlice from "./CarSlice.ts";
import carRaceStartSlice from "./UniqCarRaceStart.ts";
import winnerSlice from "./WinnerSlice.ts";
import winnerModalSlice from "./WinnerModal.ts";


export const store = configureStore({
    reducer: {
        modalSlice: modalSlice.reducer,
        carSlice: carSlice.reducer,
        carRaceStartSlice: carRaceStartSlice.reducer,
        winnerSlice:winnerSlice.reducer,
        winnerModalSlice:winnerModalSlice.reducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;