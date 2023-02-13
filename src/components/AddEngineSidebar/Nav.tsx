import classNames from "classnames";
import { useState } from "react";

interface Props {
    pages: { [key: string]: React.ReactNode };
}

export default function Nav({ pages }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNavClick = (index: number) => {
        setActiveIndex(index);
    };

    const renderedPageTitles = Object.keys(pages).map((key, index) => {
        return (
            <li
                key={key}
                className={classNames(
                    "inline mr-10 cursor-pointer text-nav-gray text-center transition duration-500 no-select py-2",
                    {
                        "border-b-2 border-black pb-2": activeIndex === index,
                    }
                )}
                onClick={() => handleNavClick(index)}
            >
                {key}
            </li>
        );
    });

    const content = Object.values(pages)[activeIndex];

    return (
        <div>
            <ul className="border-gray-200 border-y px-12 py-5">
                {renderedPageTitles}
            </ul>
            {content}
        </div>
    );
}
