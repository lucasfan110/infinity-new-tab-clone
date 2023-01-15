import React from "react";
import "./SearchNav.scss";

interface Props {
    setCurrentUrlIndex: React.Dispatch<React.SetStateAction<number>>;
    searchUrls: { [key: string]: string };
    currentUrlIndex: number;
}

export default function SearchNav({
    setCurrentUrlIndex,
    searchUrls,
    currentUrlIndex,
}: Props) {
    const searchTypes = Object.keys(searchUrls);

    const handleTypeClick = (searchType: string) => {
        if (typeof searchUrls === "string") {
            return;
        }

        const keysArray = Object.keys(searchUrls);
        setCurrentUrlIndex(keysArray.findIndex(url => url === searchType));
    };

    const nav = searchTypes.map((searchType, index) => (
        <li key={searchType}>
            <p
                className={`search-type ${
                    index === currentUrlIndex ? "active" : ""
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
