import { configureStore } from "@reduxjs/toolkit";
import backgroundImageSlice from "./slices/backgroundImageSlice";
import searchEngineSlice from "./slices/searchEngineSlice";

const store = configureStore({
    reducer: {
        searchEngine: searchEngineSlice,
        backgroundImage: backgroundImageSlice,
    },
});

export * from "./slices/searchEngineSlice";
export * from "./slices/backgroundImageSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
