import React from "react";
import classNames from "classnames";

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

        setCurrentUrlIndex(searchTypes.findIndex(url => url === searchType));
    };

    const nav = searchTypes.map((searchType, index) => {
        const isActive = index === currentUrlIndex;

        return (
            <li key={searchType} className="inline select-none mr-12">
                <p
                    className={classNames(
                        "inline text-white cursor-pointer hover:opacity-60",
                        {
                            "opacity-80": isActive,
                            "opacity-40": !isActive,
                        }
                    )}
                    onClick={() => handleTypeClick(searchType)}
                >
                    {searchType}
                </p>
            </li>
        );
    });

    return (
        <div className="align-self-start mb-5">
            <ul className="p-0 ml-2.5">{nav}</ul>
        </div>
    );
}
