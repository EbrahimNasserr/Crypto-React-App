import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExchanges = createAsyncThunk('coin/fetchExchanges', async () => {
    try {
        const response = await axios.get('https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/exchanges', {
            headers: {
                'X-RapidAPI-Key': 'eace46c993msh2e9805e32aabfdcp1f556djsndc5e3c5e4446',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw Error('Failed to fetch Exchanges Coin');
    }
});

const exchangesSlice = createSlice({
    name: 'exchangesSlice',
    initialState: {
        data: null,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExchanges.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExchanges.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchExchanges.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { actions, reducer } = exchangesSlice;