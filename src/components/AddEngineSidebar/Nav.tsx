import { useEffect, useRef, useState } from "react";
import "./Nav.scss";

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
                className={`${activeIndex === index ? "active" : ""}`}
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
        <div className="nav">
            <ul className="nav-list">{renderedPageTitle}</ul>
            <div className="line" />
        </div>
    );
}
