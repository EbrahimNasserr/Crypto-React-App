import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const rapidApiKey = 'eace46c993msh2e9805e32aabfdcp1f556djsndc5e3c5e4446';

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async () => {
    try {
        const response = await axios.get('https://coinranking1.p.rapidapi.com/coins', {
            headers: {
                'x-rapidapi-key': rapidApiKey,
                'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw Error('Failed to fetch coins');
    }
});

const coinSlice = createSlice({
    name: 'coins',
    initialState: { data: [], status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoins.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCoins.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCoins.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { actions, reducer } = coinSlice;
