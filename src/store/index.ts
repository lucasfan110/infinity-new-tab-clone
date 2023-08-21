import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchEngineMiddleware } from "./middlewares/searchEngineMiddleware";
import backgroundImageSlice from "./slices/backgroundImageSlice";
import searchEngineSlice from "./slices/searchEngineSlice";
import customWebsitesSlice from "./slices/customWebsitesSlice";
import { customWebsitesMiddleware } from "./middlewares/customWebsitesMiddleware";

const rootReducers = combineReducers({
    searchEngine: searchEngineSlice,
    backgroundImage: backgroundImageSlice,
    customWebsites: customWebsitesSlice,
});

export type RootState = ReturnType<typeof rootReducers>;

const store = configureStore({
    reducer: rootReducers,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware()
            .concat(searchEngineMiddleware)
            .concat(customWebsitesMiddleware);
    },
});

export * from "./slices/searchEngineSlice";
export * from "./slices/backgroundImageSlice";
export * from "./slices/customWebsitesSlice";

export type AppDispatch = typeof store.dispatch;

export default store;
