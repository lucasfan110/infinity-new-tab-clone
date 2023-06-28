import { useEffect, useRef } from "react";

export default function UploadWidget() {
    const cloudinaryRef = useRef<any>();
    const widgetRef = useRef<any>();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        console.log(cloudinaryRef.current);
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "dxh0z73s8",
                uploadPreset: "infinity_new_tab",
            },
            (error: any, result: any) => {
                console.log(result);

                if (result.event === "success") {
                    console.log(result.info.secure_url);
                }

                console.log(error);
            }
        );
        console.log(widgetRef.current);
    }, []);

    return <button onClick={() => widgetRef.current.open()}>Upload</button>;
}
