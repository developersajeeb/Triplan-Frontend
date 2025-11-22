import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PriceState {
    tourMaxPrice: number;
    isLoading: boolean;
}

const initialState: PriceState = {
    tourMaxPrice: 0,
    isLoading: false,
};

const priceSlice = createSlice({
    name: "price",
    initialState,
    reducers: {
        setMaxPrice(state, action: PayloadAction<number>) {
            state.tourMaxPrice = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const { setMaxPrice, setLoading } = priceSlice.actions;
export default priceSlice.reducer;