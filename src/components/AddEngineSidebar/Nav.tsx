import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

interface Props {
    pages: { [key: string]: React.ReactNode };
}

export default function Nav({ pages }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const navItemsRef = useRef<[number, number][]>([]);

    useEffect(() => {
        console.log(navItemsRef.current);
    }, []);

    const handleNavClick = (index: number) => {
        setActiveIndex(index);
    };

    const renderedPageTitle = Object.keys(pages).map((key, index) => {
        return (
            <li
                key={key}
                className={classNames(
                    "inline mr-10 cursor-pointer text-nav-gray text-center",
                    {
                        underline: activeIndex === index,
                    }
                )}
                onClick={() => handleNavClick(index)}
                ref={ref => {
                    if (!ref) {
                        return;
                    }

                    const rect = ref.getBoundingClientRect();
                    navItemsRef.current[index] = [rect.left, rect.top];
                }}
            >
                {key}
            </li>
        );
    });

    return (
        <div className="mt-10">
            <div className="">
                <ul className="border-gray-200 border-y px-4 py-10">
                    {renderedPageTitle}
                </ul>
            </div>
        </div>
    );
}
