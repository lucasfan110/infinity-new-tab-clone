import { useDispatch, useSelector } from "react-redux";
import {
    addActiveEngineId,
    addCustomEngine,
    CustomizedSearchEngine,
    deleteCustomEngine,
    RootState,
    updateCustomEngine,
} from "../../../store";
import SidebarContainer from "../SidebarContainer";
import { useState } from "react";
import UpsertEngine from "./UpsertEngine";
import CustomEngineCard from "./CustomEngineCard";
import { FaPlus } from "react-icons/fa";

export default function CustomizeEngine() {
    const { customizedEngines, activeEngineIds } = useSelector(
        (state: RootState) => state.searchEngine
    );
    const dispatch = useDispatch();

    const [upsertEngElem, setUpsertEngElem] = useState<React.ReactNode | null>(
        null
    );

    const handleAddActiveId = (engine: CustomizedSearchEngine) => {
        dispatch(addActiveEngineId(engine.id));
    };

    const handleEdit = (engine: CustomizedSearchEngine) => {
        const handleSubmit = (newEngine: CustomizedSearchEngine) => {
            dispatch(updateCustomEngine(newEngine));
            setUpsertEngElem(null);
        };

        setUpsertEngElem(
            <UpsertEngine
                onCancel={() => setUpsertEngElem(null)}
                defaultEngine={engine}
                onSubmit={handleSubmit}
            />
        );
    };

    const handleAddEngine = () => {
        const handleAdd = (engine: CustomizedSearchEngine) => {
            dispatch(addCustomEngine(engine));
            setUpsertEngElem(null);
        };

        setUpsertEngElem(
            <UpsertEngine
                onCancel={() => setUpsertEngElem(null)}
                onSubmit={handleAdd}
            />
        );
    };

    const handleDelete = (engine: CustomizedSearchEngine) => {
        dispatch(deleteCustomEngine(engine));
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
                    onAdd={handleAddActiveId}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </li>
        );
    });

    return (
        <SidebarContainer>
            {(() => {
                if (upsertEngElem !== null) {
                    return upsertEngElem;
                }

                return (
                    <>
                        <ul className="mt-4">{renderedCustomizedEngine}</ul>
                        <button
                            className="flex items-center justify-center w-full bg-white h-12 mt-6 rounded text-sm"
                            onClick={handleAddEngine}
                        >
                            <FaPlus className="mr-2" />
                            Add a new Search Engine
                        </button>
                    </>
                );
            })()}
        </SidebarContainer>
    );
}
