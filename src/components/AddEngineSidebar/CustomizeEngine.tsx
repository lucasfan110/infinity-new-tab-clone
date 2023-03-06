import { useDispatch, useSelector } from "react-redux";
import {
    addActiveEngineId,
    CustomizedSearchEngine,
    RootState,
} from "../../store";
import SidebarContainer from "./SidebarContainer";
import { useState } from "react";
import UpsertEngine from "./UpsertEngine";
import CustomEngineCard from "./CustomEngineCard";

export default function CustomizeEngine() {
    const { customizedEngines, activeEngineIds } = useSelector(
        (state: RootState) => state.searchEngine
    );
    const dispatch = useDispatch();

    const [showEngineUpserting, setShowEngineUpserting] = useState(false);

    const handleAdd = (engine: CustomizedSearchEngine) => {
        dispatch(addActiveEngineId(engine.id));
    };

    const renderedCustomizedEngine = customizedEngines.map(e => {
        let isAdded = false;

        if (activeEngineIds.includes(e.id)) {
            isAdded = true;
        }

        return (
            <li key={e.id}>
                <CustomEngineCard
                    engine={e}
                    isAdded={isAdded}
                    onAdd={handleAdd}
                />
            </li>
        );
    });

    return (
        <SidebarContainer>
            {showEngineUpserting ? (
                <UpsertEngine />
            ) : (
                <ul className="mt-4">{renderedCustomizedEngine}</ul>
            )}
            <UpsertEngine />
        </SidebarContainer>
    );
}
