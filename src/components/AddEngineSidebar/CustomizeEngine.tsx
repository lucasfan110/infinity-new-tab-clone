import { useSelector } from "react-redux";
import { CustomizedSearchEngine, RootState } from "../../store";
import displayIcon from "../../utils/displayIcon";
import Heading from "../Heading";
import SidebarContainer from "./SidebarContainer";
import { BsThreeDotsVertical } from "react-icons/bs";

interface CustomEngineCardProps {
    engine: CustomizedSearchEngine;
}

function CustomEngineCard({ engine }: CustomEngineCardProps) {
    if (typeof engine.searchUrl !== "string") {
        throw new Error("Invalid custom engine!");
    }

    return (
        <div className="flex bg-white h-24 items-center rounded group no-select">
            {displayIcon(engine.icon, "w-16 h-16 ml-4")}

            <div className="ml-4 grow">
                <Heading size={6}>{engine.name}</Heading>
                <p className="text-gray-400 text-xs">{engine.searchUrl}</p>
            </div>

            <BsThreeDotsVertical className="mr-4 w-8 h-8 opacity-0 group-hover:opacity-60 transition hover:bg-gray-200 p-1 box-border cursor-pointer rounded duration-300" />
        </div>
    );
}

export default function CustomizeEngine() {
    const customizedEngines = useSelector(
        (state: RootState) => state.searchEngine.customizedEngines
    );

    const renderedCustomizedEngine = customizedEngines.map(e => {
        return (
            <li key={e.id}>
                <CustomEngineCard engine={e} />
            </li>
        );
    });

    return (
        <SidebarContainer>
            <ul className="mt-4">{renderedCustomizedEngine}</ul>
        </SidebarContainer>
    );
}
