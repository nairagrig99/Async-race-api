import {configureStore} from "@reduxjs/toolkit";
import modalSlice from "./ModalSlide.ts";
import carSlice from "./CarSlice.ts";
import carRaceStartSlice from "./UniqCarRaceStart.ts";


export const store = configureStore({
    reducer: {
        modalSlice: modalSlice.reducer,
        carSlice: carSlice.reducer,
        carRaceStartSlice: carRaceStartSlice.reducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;