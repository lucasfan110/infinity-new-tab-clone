import React from "react";
import { useSelector } from "react-redux";
import Search from "./components/Search";
import { RootState } from "./store";

export default function App() {
    const bgImgUrl = useSelector((state: RootState) => state.backgroundImage);

    React.useEffect(() => {
        document.body.style.backgroundImage = `url("${bgImgUrl}")`;
    }, [bgImgUrl]);

    return (
        <div>
            <Search />
        </div>
    );
}
