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

export function allEngines(state: SliceType) {
    return [
        ...DEFAULT_ENGINE_LIST,
        state.customizedEngines,
    ] as BaseSearchEngine[];
}

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
        deleteActiveEngineId(state, action: PayloadAction<string>) {
            state.activeEngineIds.splice(
                state.activeEngineIds.findIndex(id => id === action.payload),
                1
            );
        },
        resetActiveEngine(state, _: PayloadAction<void>) {
            state.currentEngine = allEngines(state).find(
                e => e.id === state.activeEngineIds[0]
            )!;
        },
    },
});

export const {
    setActiveEngine,
    addActiveEngineId,
    deleteActiveEngineId,
    resetActiveEngine,
} = searchEngineSlice.actions;
export default searchEngineSlice.reducer;
