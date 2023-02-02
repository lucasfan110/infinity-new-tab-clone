import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _DEFAULT_ENGINE_LIST from "./DEFAULT_ENGINE_LIST.json";

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
    certified: boolean;
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
    defaultEngines: DefaultSearchEngine[];
    customizedEngines: CustomizedSearchEngine[];
    activeEngineIds: string[];
    currentEngine: BaseSearchEngine;
};

function initiateSlice(): SliceType {
    const additionalEngineList: CustomizedSearchEngine[] = JSON.parse(
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
        defaultEngines: DEFAULT_ENGINE_LIST,
        customizedEngines: additionalEngineList,
        activeEngineIds,
        currentEngine,
    };
}

const searchEngineSlice = createSlice({
    name: "searchEngine",
    initialState: initiateSlice(),
    reducers: {
        setActiveEngine(state, action: PayloadAction<BaseSearchEngine>) {
            state.currentEngine = action.payload;
        },
    },
});

export const { setActiveEngine } = searchEngineSlice.actions;
export default searchEngineSlice.reducer;
