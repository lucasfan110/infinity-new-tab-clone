import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./SearchNav.scss";

interface Props {
    setCurrentSearchUrl: React.Dispatch<React.SetStateAction<string>>;
    searchUrls: { [key: string]: string };
}

export default function SearchNav({ setCurrentSearchUrl, searchUrls }: Props) {
    const {
        activeEngine: { searchUrl },
    } = useSelector((state: RootState) => state.searchEngine);

    const handleTypeClick = (searchType: string) => {
        if (typeof searchUrl === "string") {
            return;
        }

        setCurrentSearchUrl(searchUrl[searchType]);
    };

    const nav = Object.keys(searchUrls).map(searchType => (
        <li key={searchType}>
            <p
                className="search-type"
                onClick={() => handleTypeClick(searchType)}
            >
                {searchType}
            </p>
        </li>
    ));

    return (
        <div className="search-nav">
            <ul>{nav}</ul>
        </div>
    );
}
