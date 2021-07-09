import { useEffect } from "react";

const useKeyboardShortcut = (keyboardKeys: Array<string>, cb: Function) => {
    const keyMap = {};

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        window.addEventListener("keyup", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
            window.removeEventListener("keyup", handleKeyPress);
        };
    }, []);

    const handleKeyPress = (e: any) => {
        e = e || event;
        keyMap[e.key.toLowerCase()] = e.type == "keydown";
        if (keyboardKeys.every((key) => keyMap[key] === true)) {
            cb();
        }
    };
};

export default useKeyboardShortcut;
