import React from "react";
import { ChangeEvent, useRef } from "react";

export function FileUploadSingle() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const [file, setFile] = useState<File>();
    
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && canvasRef.current) {
            // setFile(e.target.files[0]);
            const imageData = await createImageBitmap(e.target.files[0])

            if (canvasRef.current != null) {
                const context = canvasRef.current.getContext("2d")
                if (context)
                    context.drawImage(imageData, 0, 0)
            }
        }
    };
    
    return <>
        <input type="file" onChange={handleFileChange} />
        <canvas ref={canvasRef} width="200" height="200"></canvas>
    </>;
}