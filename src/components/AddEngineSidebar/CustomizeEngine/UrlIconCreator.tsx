import Input from "../../Forms/Input";
import TextBubble from "./TextBubble";
import DisplayIcon from "../../../utils/DisplayIcon";
import { DEFAULT_BASIC_ICON } from "../../../store";

interface Props {
    urlLink?: string;
    onUrlLinkChange?(urlLink: string): void;
}

export default function UrlIconCreator({ urlLink, onUrlLinkChange }: Props) {
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onUrlLinkChange?.(event.target.value);
    };

    return (
        <TextBubble arrowLeftMargin="40%" className="px-4 pt-4 pb-1">
            <label className="text-sm mb-2">URL Link</label>

            <Input
                placeholder="URL link to the image"
                className="text-sm"
                value={urlLink}
                onChange={onInputChange}
            />

            {urlLink && (
                <div className="mt-2">
                    Preview:
                    <DisplayIcon
                        icon={{
                            type: "img",
                            basicIcon: DEFAULT_BASIC_ICON,
                            urlIcon: {
                                url: urlLink,
                            },
                        }}
                    />
                </div>
            )}
        </TextBubble>
    );
}
