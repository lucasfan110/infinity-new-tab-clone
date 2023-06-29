import { useSelector } from "react-redux";
import {
    BaseSearchEngine,
    DEFAULT_ENGINE_LIST,
    getActiveEngines,
    RootState,
} from "../../store";
import DisplayIcon from "../../utils/DisplayIcon";
import Mask from "../Mask";
import EngineItem from "./EngineItem";

interface Props {
    show?: boolean;
    onClose?(): void;
    onEngineSelect?(engine: BaseSearchEngine): void;
    onEngineDelete?(engine: BaseSearchEngine): void;
    onEngineAdd?(): void;
}

export default function SearchEngineSelect({
    show = true,
    onClose,
    onEngineAdd,
    onEngineSelect,
    onEngineDelete,
}: Props) {
    const activeEnginesList = useSelector(
        ({
            searchEngine: { customizedEngines, activeEngineIds },
        }: RootState) => {
            return getActiveEngines(
                [...DEFAULT_ENGINE_LIST, ...customizedEngines],
                activeEngineIds
            );
        }
    );

    if (!show) {
        return null;
    }

    const renderedEngineList = activeEnginesList.map(engine => {
        const icon = (
            <DisplayIcon icon={engine.icon} className="w-12 h-12 mt-4" />
        );
        const showDelete = activeEnginesList.length > 1;

        return (
            <li key={engine.id}>
                <EngineItem
                    icon={icon}
                    engineName={engine.name}
                    showDelete={showDelete}
                    onSelect={() => onEngineSelect?.(engine)}
                    onDelete={() => onEngineDelete?.(engine)}
                />
            </li>
        );
    });

    return (
        <>
            <Mask show={show} onClick={onClose} />
            <div className="bg-white absolute p-0">
                <ul className="flex">
                    {renderedEngineList}
                    <li key="add">
                        <EngineItem
                            icon={
                                <img
                                    src="/images/icons/plus-sign.png"
                                    alt="add"
                                    className="h-12 w-12 mt-4"
                                />
                            }
                            engineName="Add"
                            onSelect={onEngineAdd}
                        />
                    </li>
                </ul>
            </div>
        </>
    );
}
