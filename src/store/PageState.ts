import {createSlice} from "@reduxjs/toolkit";


interface PageStateInterface {
    page: number;
}

const initialState: PageStateInterface = {
    page: 1
};
export const pageStateSlice = createSlice({
    name: "pageStateSlice",
    initialState,
    reducers: {
        pageState: (state, action) => {
            console.log('action', action);
            state.page = action.payload;
        },
        resetPageState: () => initialState
    }
})

export const {pageState} = pageStateSlice.actions;
export default pageStateSlice;