import { useEffect, useState } from "react";
import { toPng } from "html-to-image";

const useScreenshot = (node: HTMLElement) => {
    const [dataURL, setDataURL] = useState(undefined);
    if (node) {
        toPng(node).then((dataURL) => {
            setDataURL(dataURL);
        });
    }
    console.log(dataURL);
    return dataURL;
};

export default useScreenshot;
