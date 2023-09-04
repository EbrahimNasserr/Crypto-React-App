import { configureStore } from '@reduxjs/toolkit';
import { reducer as coinSlice } from '../services/CryptoApi';
import { reducer as newSlice } from '../services/CryptoNewsApi';
import { reducer as SpecificcoinSlice } from '../services/SpecificCoinApi';
import { reducer as CoinHistorySlice } from '../services/CoinHistoryApi';
import { reducer as exchangesSlice } from '../services/exchangesApi';

const store = configureStore({
    reducer: {
        coins: coinSlice,
        news: newSlice,
        SpecificCoin: SpecificcoinSlice,
        CoinHistory: CoinHistorySlice,
        ExchangesCoin: exchangesSlice
    },
});

export default store;