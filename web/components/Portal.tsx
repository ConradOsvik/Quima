import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
    position?: string;
    children: React.ReactNode;
}

const Portal = ({ children, position }: PortalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    return mounted
        ? position === "absolute"
            ? ReactDOM.createPortal(
                  children,
                  document.getElementById("quima-overlay-absolute")
              )
            : ReactDOM.createPortal(
                  children,
                  document.getElementById("quima-overlay-fixed")
              )
        : null;
};

export default Portal;
