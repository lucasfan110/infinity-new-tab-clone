import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _DEFAULT_ENGINE_LIST from "./DEFAULT_ENGINE_LIST.json";

export const ADDITIONAL_ENGINE_KEY = "additionalSearchEngines";
export const ACTIVE_SEARCH_ENGINES_KEY = "activeSearchEngines";
export const CURRENT_SEARCH_ENGINE_KEY = "currentSearchEngine";

export const SEARCH_ENGINE_SLICE_NAME = "searchEngine";

export type BasicIcon = {
    type: "basic";
    bgColor: string;
    bgText: string;
    bgTextSize: number;
};

export type ImgIcon = {
    type: "img";
    url: string;
};

export type Icon = BasicIcon | ImgIcon;

export interface BaseSearchEngine {
    id: string;
    name: string;
    icon: Icon;
    searchUrl: { [key: string]: string } | string;
}

export interface DefaultSearchEngine extends BaseSearchEngine {
    description: string;
    isActive: boolean;
}

export interface CustomizedSearchEngine extends BaseSearchEngine {}

export const DEFAULT_ENGINE_LIST: DefaultSearchEngine[] =
    _DEFAULT_ENGINE_LIST as DefaultSearchEngine[];

export function getActiveEngines(
    engineList: BaseSearchEngine[],
    activeEngineIds: string[]
) {
    return engineList.filter(e => activeEngineIds.includes(e.id));
}

type SliceType = {
    customizedEngines: CustomizedSearchEngine[];
    activeEngineIds: string[];
    currentEngine: BaseSearchEngine;
};

function initiateSlice(): SliceType {
    const additionalEngineList: CustomizedSearchEngine[] = JSON.parse(
        localStorage.getItem(ADDITIONAL_ENGINE_KEY) || "[]"
    );

    const allEnginesList = [...DEFAULT_ENGINE_LIST, ...additionalEngineList];
    const activeEngineIds: string[] = JSON.parse(
        localStorage.getItem(ACTIVE_SEARCH_ENGINES_KEY) || "[]"
    );

    const activeEngineId =
        localStorage.getItem(CURRENT_SEARCH_ENGINE_KEY) ||
        DEFAULT_ENGINE_LIST[0].id;

    const currentEngine =
        allEnginesList.find(s => s.id === activeEngineId) ??
        DEFAULT_ENGINE_LIST[0];

    return {
        customizedEngines: additionalEngineList,
        activeEngineIds,
        currentEngine,
    };
}

const searchEngineSlice = createSlice({
    name: SEARCH_ENGINE_SLICE_NAME,
    initialState: initiateSlice(),
    reducers: {
        setActiveEngine(state, action: PayloadAction<BaseSearchEngine>) {
            state.currentEngine = action.payload;
        },
        addActiveEngineId(state, action: PayloadAction<string>) {
            state.activeEngineIds.push(action.payload);
        },
    },
});

export const { setActiveEngine, addActiveEngineId } = searchEngineSlice.actions;
export default searchEngineSlice.reducer;
