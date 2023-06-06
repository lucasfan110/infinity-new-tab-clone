import { useState } from "react";
import { FaPlus, FaRegQuestionCircle } from "react-icons/fa";
import { CustomizedSearchEngine, Icon } from "../../../store";
import DisplayIcon from "../../../utils/DisplayIcon";
import Input from "../../Forms/Input";
import TextArea from "../../Forms/TextArea";
import CustomEngineHowTo from "./CustomEngineHowTo";
import SolidIconCreator, { DEFAULT_TEXT_SIZE } from "./SolidIconCreator";
import { v4 as uuidv4 } from "uuid";

interface Props {
    defaultEngine?: CustomizedSearchEngine;
    onSubmit?(data: CustomizedSearchEngine): void;
    onCancel?(): void;
}

function engineNameToBgText(engineName: string): string {
    const substringLength = engineName.length === 3 ? 3 : 2;
    return engineName.substring(0, substringLength);
}

export default function UpsertEngine({
    defaultEngine = {
        id: uuidv4(),
        name: "",
        searchUrl: "",
        icon: {
            type: "basic",
            bgColor: "#ff4734",
            bgText: "",
            bgTextSize: DEFAULT_TEXT_SIZE,
        },
    },
    onSubmit,
    onCancel,
}: Props) {
    const [showHowTo, setShowHowTo] = useState(false);
    const [engineName, setEngineName] = useState(defaultEngine.name);
    const hasBgText =
        defaultEngine.icon.type === "basic" && defaultEngine.icon.bgText !== "";
    const [useDefaultBgText, setUseDefaultBgText] = useState(!hasBgText);
    const [searchUrl, setSearchUrl] = useState(defaultEngine.searchUrl);
    const [icon, setIcon] = useState<Icon>(defaultEngine.icon);
    const [validations, setValidations] = useState({
        isEngineNameValidate: true,
        isSearchUrlValidate: true,
    });

    /**  Whether if all of the fields in `validations` are true */
    const isAllValidate = (defaultValidations = validations) =>
        !Object.values(defaultValidations).some(v => !v);

    const validationFunctions = {
        validateEngineName({
            defaultEngineName = engineName,
            defaultValidation = validations,
        }) {
            const newValidations = {
                ...defaultValidation,
                isEngineNameValidate: defaultEngineName !== "",
            };
            setValidations(newValidations);
            return newValidations;
        },
        validateSearchUrl({
            defaultSearchUrl = searchUrl,
            defaultValidation = validations,
        }) {
            const newValidations = {
                ...defaultValidation,
                isSearchUrlValidate: defaultSearchUrl.includes("%s"),
            };
            setValidations(newValidations);
            return newValidations;
        },
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let defaultValidation = validations;
        const functions = Object.values(validationFunctions);
        functions.forEach(validationFunction => {
            defaultValidation = validationFunction({
                defaultValidation,
            });
        });

        if (!isAllValidate(defaultValidation)) {
            return;
        }

        onSubmit?.({
            icon,
            id: defaultEngine.id,
            name: engineName,
            searchUrl,
        });
    };

    const handleEngineNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const engineName = e.target.value;

        setEngineName(engineName);
        validationFunctions.validateEngineName({
            defaultEngineName: engineName,
        });

        if (useDefaultBgText && icon.type === "basic") {
            setIcon({ ...icon, bgText: engineNameToBgText(e.target.value) });
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const searchUrl = e.target.value;

        setSearchUrl(searchUrl);
        validationFunctions.validateSearchUrl({ defaultSearchUrl: searchUrl });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white px-5 py-6 mt-6">
                <label htmlFor="engine-name" className="text-sm">
                    <span>Search Engine</span>
                    <span
                        hidden={validations.isEngineNameValidate}
                        className="ml-3 text-red-600 text-xs"
                    >
                        *Enter search engine name
                    </span>
                </label>
                <Input
                    id="engine-name"
                    name="engine-name"
                    placeholder="Name"
                    value={engineName}
                    onChange={handleEngineNameChange}
                />

                <label htmlFor="url" className="text-sm flex items-center">
                    Url (use %s to replace search word)
                    <button
                        className="w-4 h-4 ml-2"
                        type="button"
                        onClick={() => setShowHowTo(true)}
                    >
                        <FaRegQuestionCircle className="text-gray-300 w-full h-full" />
                    </button>
                    <span
                        className="ml-1 text-red-600"
                        hidden={validations.isSearchUrlValidate}
                    >
                        *Format error
                    </span>
                </label>
                <TextArea
                    id="url"
                    name="url"
                    placeholder="URL"
                    value={searchUrl}
                    onChange={handleUrlChange}
                />

                <label htmlFor="select-icon">Select Icon</label>

                <div className="flex items-center mb-8">
                    <div className="w-14 h-14 my-2 shadow-2xl">
                        <DisplayIcon icon={icon} className="w-full h-full" />
                        <p className="text-xs">Solid color icon</p>
                    </div>

                    <div className="border h-16 w-0 ml-4" />

                    <button className="w-16 h-16 ml-4" type="button">
                        <div className="border border-dashed w-full h-full rounded border-2 flex items-center justify-center cursor-pointer">
                            <FaPlus className="w-1/2 h-1/2 text-gray-300" />
                        </div>

                        <p className="text-xs text-center">Local icon</p>
                    </button>
                </div>

                {icon.type === "basic" && (
                    <SolidIconCreator
                        icon={icon}
                        onIconChange={icon => setIcon(icon)}
                        onIconTextChange={() => setUseDefaultBgText(false)}
                    />
                )}

                <div className="flex justify-center align-center flex-col mt-6 mx-10">
                    <button className="bg-gray-600 text-white h-10 rounded-lg hover:bg-gray-700 transition text-sm">
                        OK
                    </button>
                    <button
                        className="bg-gray-200 hover:bg-gray-300 transition text-black h-10 rounded-lg mt-3 text-sm"
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>

            <CustomEngineHowTo
                show={showHowTo}
                onClose={() => setShowHowTo(false)}
            />
        </>
    );
}
