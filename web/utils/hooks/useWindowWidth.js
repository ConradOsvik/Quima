import { useState, useEffect } from "react";

const getWindowWidth = () => {
    const width = window.innerWidth;
    return width;
};

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        setWindowWidth(getWindowWidth());

        function handleResize() {
            setWindowWidth(getWindowWidth());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowWidth;
};

export default useWindowWidth;
