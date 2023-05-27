import { useDispatch, useSelector } from "react-redux";
import {
    addActiveEngineId,
    CustomizedSearchEngine,
    RootState,
    updateCustomEngine,
} from "../../../store";
import SidebarContainer from "../SidebarContainer";
import { useState } from "react";
import UpsertEngine from "./UpsertEngine";
import CustomEngineCard from "./CustomEngineCard";

export default function CustomizeEngine() {
    const { customizedEngines, activeEngineIds } = useSelector(
        (state: RootState) => state.searchEngine
    );
    const dispatch = useDispatch();

    const [showEngineUpserting, setShowEngineUpserting] = useState(false);
    const [upsertEngElem, setUpsertEngElem] = useState<React.ReactNode>(<></>);

    const handleAdd = (engine: CustomizedSearchEngine) => {
        dispatch(addActiveEngineId(engine.id));
    };

    const handleEdit = (engine: CustomizedSearchEngine) => {
        const handleSubmit = (newEngine: CustomizedSearchEngine) => {
            dispatch(updateCustomEngine(newEngine));
            setShowEngineUpserting(false);
        };

        setShowEngineUpserting(true);
        setUpsertEngElem(
            <UpsertEngine
                onCancel={() => setShowEngineUpserting(false)}
                defaultEngine={engine}
                onSubmit={handleSubmit}
            />
        );
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
                    onEdit={handleEdit}
                />
            </li>
        );
    });

    return (
        <SidebarContainer>
            {showEngineUpserting ? (
                upsertEngElem
            ) : (
                <ul className="mt-4">{renderedCustomizedEngine}</ul>
            )}
        </SidebarContainer>
    );
}
