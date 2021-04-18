import { useEffect } from "react";

const useTabbing = () => {
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleMouseDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Tab") {
            document.querySelector("html").setAttribute("tabbing", "");
        } else {
            document.querySelector("html").removeAttribute("tabbing");
        }
    };
    const handleMouseDown = () => {
        document.querySelector("html").removeAttribute("tabbing");
    };
};

export default useTabbing;
