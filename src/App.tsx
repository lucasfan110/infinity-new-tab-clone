import React from "react";
import { useSelector } from "react-redux";
import "./App.scss";
import Search from "./components/Search";
import { RootState } from "./store";

export default function App() {
    // const bgImgUrl = localStorage.getItem("bgImg");
    const bgImgUrl = useSelector((state: RootState) => state.backgroundImage);

    React.useEffect(() => {
        document.body.style.backgroundImage = `url("${bgImgUrl}")`;
    }, [bgImgUrl]);

    return (
        <div className="app">
            <Search />
        </div>
    );
}
