import React from "react";
import "./App.scss";
import Search from "./components/Search";

export default function App() {
    const bgImgUrl = localStorage.getItem("bgImg");

    React.useEffect(() => {
        document.body.style.backgroundImage = `url("${bgImgUrl}")`;
    }, [bgImgUrl]);

    return (
        <div className="app">
            <Search />
        </div>
    );
}
