import { Middleware } from "@reduxjs/toolkit";
import {
    CURRENT_PAGE_KEY,
    CUSTOM_WEBSITES_SLICE_NAME,
    PAGES_KEY,
    RootState,
} from "..";
import * as customWebsiteSlice from "../slices/customWebsitesSlice";

export function saveCustomWebsites(state: customWebsiteSlice.SliceType) {
    localStorage.setItem(CURRENT_PAGE_KEY, state.currentPage.toString());
    localStorage.setItem(PAGES_KEY, JSON.stringify(state.pages));
}

export const customWebsitesMiddleware: Middleware<{}, RootState> =
    store => next => action => {
        const result = next(action);

        if (action.type?.startsWith(`${CUSTOM_WEBSITES_SLICE_NAME}/`)) {
            const state = store.getState().customWebsites;

            saveCustomWebsites(state);
        }

        return result;
    };
