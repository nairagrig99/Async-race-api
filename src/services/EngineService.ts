import {createAsyncThunk} from "@reduxjs/toolkit";


export const EngineService = createAsyncThunk('engine/fetch', async (id: number, {rejectWithValue}) => {

    try {

    } catch (err) {

        return rejectWithValue(err)
    }

})