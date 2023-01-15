import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchEngine } from "../../types";

export const DEFAULT_ENGINE_LIST: SearchEngine[] = [
    {
        name: "Google",
        icon: {
            type: "img",
            url: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
        },
        id: "89b4e228-0f13-4b86-8c83-1d5a3b45ecc9",
        searchUrl: {
            Web: "https://www.google.com/search?q=%s",
            Images: "https://www.google.com/search?tbm=isch&q=%s",
            News: "https://www.google.com/search?tbm=nws&q=%s",
            Videos: "https://www.google.com/search?tbm=vid&q=%s",
            Maps: "https://www.google.com/maps/preview?q=%s",
        },
    },
    {
        name: "Google-Another",
        icon: {
            type: "img",
            url: "https://i.pinimg.com/originals/dd/5d/db/dd5ddbbefebdddd0f0f4308c93371c37.jpg",
        },
        id: "89b4e228-0f13-4b86-8c83-1d5a3b45ecc0",
        searchUrl: {
            Web: "https://www.google.com/search?q=%s",
            Images: "https://www.google.com/search?tbm=isch&q=%s",
            News: "https://www.google.com/search?tbm=nws&q=%s",
            Videos: "https://www.google.com/search?tbm=vid&q=%s",
            Maps: "https://www.google.com/maps/preview?q=%s",
        },
    },
    {
        name: "Bruh",
        icon: {
            type: "basic",
            bgColor: "blue",
            bgText: "Bruh",
            bgTextSize: 15,
        },
        id: "89b4e228-0f13-4b86-8c83-1d5a3b45ecc1",
        searchUrl: {
            Web: "https://www.bruh.com/%s",
        },
    },
];

type SliceType = {
    engineList: SearchEngine[];
    activeEngine: SearchEngine;
};

function initiateSlice(): SliceType {
    const additionalEngineList: SearchEngine[] = JSON.parse(
        localStorage.getItem("additionalSearchEngines") || "[]"
    );

    const engineList = [...DEFAULT_ENGINE_LIST, ...additionalEngineList];

    const activeEngineId =
        localStorage.getItem("activeSearchEngine") || DEFAULT_ENGINE_LIST[0].id;

    const activeEngine = engineList.find(s => s.id === activeEngineId);

    if (!activeEngine) {
        throw new Error("What the fuck how did this happen???");
    }

    return {
        engineList,
        activeEngine,
    };
}

const searchEngineSlice = createSlice({
    name: "searchEngine",
    initialState: initiateSlice(),
    reducers: {
        setActiveEngine(state, action: PayloadAction<SearchEngine>) {
            state.activeEngine = action.payload;
        },
    },
});

export const { setActiveEngine } = searchEngineSlice.actions;
export default searchEngineSlice.reducer;
