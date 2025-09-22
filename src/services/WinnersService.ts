import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServerEnum} from "../enums/request-url.enum.ts";
import {ErrorMessageEnum} from "../enums/error-message.enum.ts";
import {CRUD} from "../enums/crud-enum.ts";
import type {WinnerModel} from "../interface/winner-interface.ts";

export const getWinners = createAsyncThunk('get/winners', async () => {
    const response = await fetch(`${ServerEnum.URL}/winners`,{
        method:CRUD.GET
    })
    if (!response.ok) {
        throw new Error(ErrorMessageEnum.FAILED_GETTING)
    }
    return await response.json();
})

export const updateWinners = createAsyncThunk('update/winners', async (winners: WinnerModel) => {
    const id = winners.id;
    const response = await fetch(`${ServerEnum.URL}/winners/${id}`, {
        method: CRUD.PATCH,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(winners)
    })

    if (!response.ok) {
        throw new Error(ErrorMessageEnum.FAILED_GETTING)
    }

    return await response.json();
})
export const setWinners = createAsyncThunk('set/winners', async (winners: WinnerModel) => {
    const response = await fetch(`${ServerEnum.URL}/winners`, {
        method: CRUD.POST,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(winners)
    })

    if (!response.ok) {
        throw new Error(ErrorMessageEnum.FAILED_GETTING)
    }

    return await response.json();
})