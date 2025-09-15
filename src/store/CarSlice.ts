import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {CarState} from "../interface/car-state.interface.ts";
import {CRUD} from "../constants/crud-enum.ts";
import type {carFormState} from "../interface/car-form-state.interface.ts";

const URL = 'http://127.0.0.1:3000';

export const createCar = createAsyncThunk('car/create', async ({form}: carFormState) => {
    const response = await fetch(`${URL}/garage`, {
        method: CRUD.POST,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: form.car_name,
            color: form.car_color
        })
    });

    if (!response.ok) {
        throw new Error("Failed to add car");
    }

    return response.json();
})

const initialState: CarState = {
    car: [],
    loading: false,
    error: null
}

const carSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
            state.error = action.error.message || "Failed to add car"
        })
    }
})
export default carSlice