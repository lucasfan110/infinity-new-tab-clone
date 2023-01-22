import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LOCAL_STORAGE_ITEM_NAME = "bgImg";

function getBackgroundImage() {
    return (
        localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) ??
        "https://wallpaperaccess.com/full/469536.jpg"
    );
}

const backgroundImageSlice = createSlice({
    name: "backgroundImage",
    initialState: getBackgroundImage(),
    reducers: {
        setBackgroundImage(state, action: PayloadAction<string>) {
            localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, action.payload);

            return action.payload;
        },
    },
});

export default backgroundImageSlice.reducer;
