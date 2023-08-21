import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Icon } from "./searchEngineSlice";

export const CUSTOM_WEBSITES_SLICE_NAME = "iconSystem";

// The key in localStorage that contains these values
export const CURRENT_PAGE_KEY = "currentPage";
export const PAGES_KEY = "pages";

export type CustomWebsite = {
    type: "website";
    name: string;
    url: string;
    icon: Icon;
};

export type Folder = {
    type: "folder";
    name: string;
    websites: CustomWebsite[];
};

export type Item = CustomWebsite | Folder;
export type Page = Item[];
export type Pages = Page[];

type SliceType = {
    currentPage: number;
    pages: Pages;
};

function initiateState(): SliceType {
    const currentPage = Number(localStorage.getItem(CURRENT_PAGE_KEY)) || 0;
    const pages: Pages = JSON.parse(localStorage.getItem(PAGES_KEY) || "[]");

    return {
        currentPage,
        pages,
    };
}

const customWebsitesSlice = createSlice({
    name: CUSTOM_WEBSITES_SLICE_NAME,
    initialState: initiateState(),
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
});

export const { setCurrentPage } = customWebsitesSlice.actions;
export default customWebsitesSlice.reducer;
