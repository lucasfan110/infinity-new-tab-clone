import Input from "../../Forms/Input";
import TextBubble from "./TextBubble";

interface Props {}

export default function UrlIconCreator({}: Props) {
    return (
        <TextBubble>
            <label>Url Link</label>

            <Input />
        </TextBubble>
    );
}
