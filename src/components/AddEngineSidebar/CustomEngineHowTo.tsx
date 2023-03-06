import Heading from "../Heading";
import Mask from "../Mask";

export default function CustomEngineHowTo() {
    return (
        <>
            <Mask />
            <div className="fixed w-[800px] h-[70vh] bg-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 overflow-auto rounded-lg">
                <div className="sticky top-0 bg-white pt-6">
                    <Heading size={4} className="text-center">
                        About using "%s" to replace search terms
                    </Heading>

                    <hr className="my-6" />
                </div>

                <div className="px-16">
                    <p className="my-6">
                        1. Open any website and enter "%s" in the search box to
                        search. (With Google as an example)
                    </p>
                    <img src="/images/steps/1.png" alt="%s in the search box" />

                    <p className="my-6">
                        2. Copy the URL of the search result directly
                    </p>
                    <img src="/images/steps/2.png" alt="copy the url" />

                    <p className="my-6">
                        3. Paste the copied URL here and you're done
                    </p>
                    <img
                        src="/images/steps/3.png"
                        alt="paste the url"
                        className="mb-20"
                    />
                </div>
            </div>
        </>
    );
}
