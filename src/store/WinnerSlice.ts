import {createSlice} from "@reduxjs/toolkit";
import type {WinnerState} from "../interface/winner-state.ts";
import {getWinners, setWinners, updateWinners} from "../services/WinnersService.ts";

const initialState: WinnerState = {
    winners: []
}

const winnerSlice = createSlice({
    name: "winnerSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWinners.fulfilled, (state, action) => {
            state.winners = action.payload;
        })
        builder.addCase(setWinners.fulfilled, (state, action) => {
            state.winners.push(action.payload);
        })
        builder.addCase(updateWinners.fulfilled, (state, action) => {
            const winnerIndex = state.winners.findIndex(
                winner => winner.id === action.payload.id
            );

            if (winnerIndex >= 0) {
                state.winners[winnerIndex] = action.payload;
            }
        })
    }
})

export default winnerSlice