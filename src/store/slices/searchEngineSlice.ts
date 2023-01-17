import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchEngine } from "../../types";
import _DEFAULT_ENGINE_LIST from "./DEFAULT_ENGINE_LIST.json";

export const DEFAULT_ENGINE_LIST: SearchEngine[] =
    _DEFAULT_ENGINE_LIST as SearchEngine[];

export function getActiveEngines(
    engineList: SearchEngine[],
    activeEngineIds: string[]
) {
    return engineList.filter(e => activeEngineIds.includes(e.id));
}

type SliceType = {
    engineList: SearchEngine[];
    activeEngineIds: string[];
    currentEngine: SearchEngine;
};

function initiateSlice(): SliceType {
    const additionalEngineList: SearchEngine[] = JSON.parse(
        localStorage.getItem("additionalSearchEngines") || "[]"
    );

    const allEnginesList = [...DEFAULT_ENGINE_LIST, ...additionalEngineList];
    const activeEngineIds: string[] = JSON.parse(
        localStorage.getItem("activeSearchEngines") || "[]"
    );

    const activeEngineId =
        localStorage.getItem("currentSearchEngine") ||
        DEFAULT_ENGINE_LIST[0].id;

    const currentEngine =
        allEnginesList.find(s => s.id === activeEngineId) ??
        DEFAULT_ENGINE_LIST[0];

    return {
        engineList: allEnginesList,
        activeEngineIds,
        currentEngine,
    };
}

const searchEngineSlice = createSlice({
    name: "searchEngine",
    initialState: initiateSlice(),
    reducers: {
        setActiveEngine(state, action: PayloadAction<SearchEngine>) {
            state.currentEngine = action.payload;
        },
    },
});

export const { setActiveEngine } = searchEngineSlice.actions;
export default searchEngineSlice.reducer;
