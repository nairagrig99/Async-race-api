import {createAsyncThunk} from "@reduxjs/toolkit";
import type {carFormState} from "../interface/car-form-state.interface.ts";
import {CRUD} from "../enums/crud-enum.ts";
import {serverEnum} from "../enums/request-url.enum.ts";
import {ErrorMessageEnum} from "../enums/error-message.enum.ts";
import type {CarModelInterface} from "../interface/car-model.interface.ts";

export const createCar = createAsyncThunk('car/create', async ({form}: carFormState) => {
    if (form) {
        const response = await fetch(`${serverEnum.URL}/garage`, {
            method: CRUD.POST,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: form.name,
                color: form.color
            })
        });
        if (!response.ok) {
            throw new Error(ErrorMessageEnum.FAILED_ADDING);
        }
        return response.json();
    }
})

export const getCars = createAsyncThunk('car/get', async () => {
    const response = await fetch(`${serverEnum.URL}/garage`)
    if (!response.ok) {
        throw new Error(ErrorMessageEnum.FAILED_GETTING);
    }

    return await response.json();
})
export const editCar = createAsyncThunk('car/update', async ({id, updates}: {
    id: number,
    updates: CarModelInterface
}) => {
    const response = await fetch(`${serverEnum.URL}/garage/${id}`, {
        method: CRUD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updates)
    })
    if (!response.ok) {
        throw new Error(ErrorMessageEnum.FAILED_GETTING);
    }

    return await response.json();
})

export const removeCar = createAsyncThunk('car/remove', async ({id}: {
    id: number
}) => {
    const response = await fetch(`${serverEnum.URL}/garage/${id}`, {
        method: CRUD.DELETE,
    })
    if (!response.ok) {
        throw new Error(ErrorMessageEnum.FAILED_GETTING);
    }

    return {id};
})