import { Middleware } from "@reduxjs/toolkit";
import {
    ACTIVE_SEARCH_ENGINES_KEY,
    ADDITIONAL_ENGINE_KEY,
    CURRENT_SEARCH_ENGINE_KEY,
    RootState,
    SEARCH_ENGINE_SLICE_NAME,
} from "..";

export const searchEngineMiddleware: Middleware<{}, RootState> =
    store => next => action => {
        const result = next(action);

        if (action.type?.startsWith(`${SEARCH_ENGINE_SLICE_NAME}/`)) {
            const state = store.getState().searchEngine;

            localStorage.setItem(
                CURRENT_SEARCH_ENGINE_KEY,
                state.currentEngine.id
            );
            localStorage.setItem(
                ACTIVE_SEARCH_ENGINES_KEY,
                JSON.stringify(state.activeEngineIds)
            );
            localStorage.setItem(
                ADDITIONAL_ENGINE_KEY,
                JSON.stringify(state.customizedEngines)
            );
        }

        return result;
    };
