import { FaRegQuestionCircle } from "react-icons/fa";
import { CustomizedSearchEngine } from "../../store";
import Input from "../Forms/Input";
import TextArea from "../Forms/TextArea";
import CustomEngineHowTo from "./CustomEngineHowTo";

interface Props {
    defaultEngine?: CustomizedSearchEngine;
    onSubmit?(): void;
}

export default function UpsertEngine({ defaultEngine, onSubmit }: Props) {
    const handleSubmit = () => {
        onSubmit?.();
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white px-4 py-2">
                <label htmlFor="engine-name">Search Engine</label>
                <Input id="engine-name" name="engine-name" placeholder="Name" />

                <label htmlFor="url" className="flex items-center">
                    Url (use %s to replace search word)
                    <button className="w-4 h-4 ml-2" type="button">
                        <FaRegQuestionCircle className="text-gray-300 w-full h-full" />
                    </button>
                </label>
                <TextArea id="url" name="url" placeholder="URL" />

                <label htmlFor="select-icon">Select Icon</label>
            </form>

            <CustomEngineHowTo />
        </>
    );
}
