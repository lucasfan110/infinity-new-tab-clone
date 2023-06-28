import { useEffect, useRef } from "react";

declare global {
    var cloudinary: any;
}

interface Props {
    onUploaded?(url: string): void;
    onError?(error: any): void;
}

export default function useUploadWidgets({ onUploaded, onError }: Props) {
    const cloudinaryRef = useRef<any>();
    const widgetRef = useRef<any>();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "dxh0z73s8",
                uploadPreset: "infinity_new_tab",
            },
            (error: any, result: any) => {
                if (error !== undefined) {
                    onError?.(error);
                    return;
                }

                if (result.event === "success") {
                    onUploaded?.(result.info.secure_url);
                }
            }
        );
    }, [onUploaded, onError]);

    return [cloudinaryRef, widgetRef];
}
