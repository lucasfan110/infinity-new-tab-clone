import { configureStore } from "@reduxjs/toolkit";
import searchEngineSlice from "./slices/searchEngineSlice";

const store = configureStore({
    reducer: {
        searchEngine: searchEngineSlice,
    },
});

export * from "./slices/searchEngineSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
