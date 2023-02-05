import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchEngineMiddleware } from "./middlewares/searchEngineMiddleware";
import backgroundImageSlice from "./slices/backgroundImageSlice";
import searchEngineSlice from "./slices/searchEngineSlice";

const rootReducers = combineReducers({
    searchEngine: searchEngineSlice,
    backgroundImage: backgroundImageSlice,
});

export type RootState = ReturnType<typeof rootReducers>;

const store = configureStore({
    reducer: rootReducers,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(searchEngineMiddleware);
    },
});

export * from "./slices/searchEngineSlice";
export * from "./slices/backgroundImageSlice";

export type AppDispatch = typeof store.dispatch;

export default store;
