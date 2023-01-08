import React, { useState } from "react";
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

    const searchTypes = Object.keys(searchUrls);
    const [activeSearchType, setActiveSearchType] = useState(searchTypes[0]);

    const handleTypeClick = (searchType: string) => {
        if (typeof searchUrl === "string") {
            return;
        }

        setActiveSearchType(searchType);
        setCurrentSearchUrl(searchUrl[searchType]);
    };

    const nav = searchTypes.map(searchType => (
        <li key={searchType}>
            <p
                className={`search-type ${
                    searchType === activeSearchType ? "active" : ""
                }`}
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
