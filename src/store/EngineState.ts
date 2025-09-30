import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    start: false,
    stop: true,
    start_race: false,
    stop_race: true
}

const engineStateSlice = createSlice({
    name: "engineStateSlice",
    initialState,
    reducers: {
        startCar: (state, action) => {
            state.start = action.payload;
        },
        stopCar: (state, action) => {
            state.stop = action.payload;
        },
        startRaceMode: (state, action) => {
            state.start_race = action.payload;
        },
        stopRace: (state, action) => {
            state.stop_race = action.payload;
        },
        resetEngineState: () => initialState,
    }
})
export const {startCar, stopCar, startRaceMode, stopRace,resetEngineState} = engineStateSlice.actions
export default engineStateSlice