import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const rapidApiKey = 'eace46c993msh2e9805e32aabfdcp1f556djsndc5e3c5e4446';

export const fetchNews = createAsyncThunk('news/fetchnews', async () => {
    try {
        const response = await axios.get('https://bing-news-search1.p.rapidapi.com/news', {
            headers: {
                'x-rapidapi-key': rapidApiKey,
                'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
                'X-BingApis-SDK': 'true',
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw Error('Failed to fetch news');
    }
});

const newSlice = createSlice({
    name: 'news',
    initialState: { data: [], status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchNews.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { actions, reducer } = newSlice;