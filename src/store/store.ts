import {configureStore} from "@reduxjs/toolkit";
import modalSlice from "./ModalSlide.ts";
import carSlice from "./CarSlice.ts";


export const store = configureStore({
    reducer: {
        modalSlice: modalSlice.reducer,
        carSlice: carSlice.reducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;