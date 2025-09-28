import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServerEnum} from "../enums/request-url.enum.ts";
import {ErrorMessageEnum} from "../enums/error-message.enum.ts";


export const EngineService = createAsyncThunk('engine/fetch', async (id: number) => {

    const response = await fetch(`${ServerEnum.URL}/engine?id=${id}&status=stopped`, {method: "PATCH"})

    if (!response.ok) throw new Error(ErrorMessageEnum.SERVER_RESPONSE);

    return response.json();
})