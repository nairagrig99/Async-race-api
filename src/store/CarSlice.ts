import {createSlice} from "@reduxjs/toolkit";
import type {CarState} from "../interface/car-state.interface.ts";
import {createCar, editCar, getCars, removeCar} from "../services/Service.ts";
import {ErrorMessageEnum} from "../enums/error-message.enum.ts";

const initialState: CarState = {
    car: [],
    loading: false,
    error: null
}

const carSlice = createSlice({
    name: "carSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //POST
        builder.addCase(createCar.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(createCar.fulfilled, (state, action) => {
            state.loading = false;
            state.car.push(action.payload)
        })
        builder.addCase(createCar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || ErrorMessageEnum.FAILED_ADDING
        })

        //GET
        builder.addCase(getCars.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getCars.fulfilled, (state, action) => {
            // console.log('action.payload', action.payload)
            state.loading = false;
            state.car = action.payload;
        })
        builder.addCase(getCars.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || ErrorMessageEnum.FAILED_GETTING
        })

        //UPDATE
        builder.addCase(editCar.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(editCar.fulfilled, (state, action) => {
            state.loading = false;
            const finIndex = state.car.findIndex((carItem) => carItem.id === action.payload.id);
            if (finIndex != -1) {
                state.car[finIndex] = action.payload
            }
        })
        builder.addCase(editCar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || ErrorMessageEnum.FAILED_GETTING
        })
        // REMOVE
        builder.addCase(removeCar.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(removeCar.fulfilled, (state, action) => {
            state.loading = false;
            state.car = state.car.filter((carItem) => carItem.id !== action.payload.id);
        })
        builder.addCase(removeCar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || ErrorMessageEnum.FAILED_GETTING
        })

    }
})
export default carSlice