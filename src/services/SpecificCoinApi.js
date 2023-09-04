import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSpecificCoin = createAsyncThunk('coin/fetchSpecificCoin', async () => {
    try {
        const response = await axios.get('https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd', {
            headers: {
                'X-RapidAPI-Key': 'eace46c993msh2e9805e32aabfdcp1f556djsndc5e3c5e4446',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw Error('Failed to fetch Specific Coin');
    }
});

const SpecificcoinSlice = createSlice({
    name: 'SpecificcoinSlice',
    initialState: {
        data: null,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpecificCoin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSpecificCoin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchSpecificCoin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { actions, reducer } = SpecificcoinSlice;
