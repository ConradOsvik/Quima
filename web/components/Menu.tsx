import { useState, useEffect, useRef } from "react";

import Portal from "./Portal";
import Transition from "./Transition";

interface MenuProps {
    children: React.ReactNode;
    anchor: Element;
    onClose?: Function;
    id?: string;
}

const Menu = (props: MenuProps) => {
    const { children, anchor, onClose, id } = props;

    const [windowX, setWindowX] = useState(null);
    const [windowY, setWindowY] = useState(null);
    const [windowWidth, setWindowWidth] = useState(null);
    const [windowHeight, setWindowHeight] = useState(null);
    const [anchorWidth, setAnchorWidth] = useState(null);
    const [anchorHeight, setAnchorHeight] = useState(null);
    const [menuWidth, setMenuWidth] = useState(null);
    const [menuHeight, setMenuHeight] = useState(null);

    const menuRef = useRef(null);

    useEffect(() => {
        window.addEventListener("click", handleClick);
        window.addEventListener("resize", handleResize);

        if (anchor && menuRef.current) {
            handleMenuPlacement(window.innerWidth, window.innerHeight);
        }
        return () => {
            window.removeEventListener("click", handleClick);
            window.removeEventListener("resize", handleResize);
        };
    }, [anchor, menuRef]);

    const handleResize = (e) => {
        if (anchor && menuRef.current) {
            const width = e.currentTarget.innerWidth;
            const height = e.currentTarget.innerHeight;
            handleMenuPlacement(width, height);
        } else {
            setWindowX(null);
            setWindowY(null);
            setWindowWidth(null);
            setWindowHeight(null);
            setAnchorWidth(null);
            setAnchorHeight(null);
            setMenuWidth(null);
            setMenuHeight(null);
        }
    };

    const handleClick = (e) => {
        if (anchor && menuRef) {
            if (e.target !== anchor && !anchor.contains(e.target)) {
                if (e.target !== menuRef.current) {
                    let isInside = false;
                    for (let i = 0; i < e.path.length; i++) {
                        if (e.path[i] === menuRef.current) {
                            isInside = true;
                        }
                    }
                    if (!isInside) {
                        if (onClose) onClose();
                    } else if (isInside) {
                        handleMenuPlacement(
                            window.innerWidth,
                            window.innerHeight
                        );
                    }
                }
            }
        }
    };

    const handleMenuPlacement = (windowW, windowH) => {
        const anchorRect = anchor.getBoundingClientRect();

        setWindowX(anchorRect.left);
        setWindowY(anchorRect.top);
        setWindowWidth(windowW);
        setWindowHeight(windowH);
        setAnchorWidth(anchorRect.width);
        setAnchorHeight(anchorRect.height);
        setMenuWidth(menuRef.current.offsetWidth);
        setMenuHeight(menuRef.current.offsetHeight);
    };

    return (
        <Portal position="absolute">
            <Transition type="fade" show={Boolean(anchor)} speed="fast">
                <div
                    ref={menuRef}
                    id={id}
                    className="menu"
                    style={{
                        top:
                            windowY + anchorHeight + menuHeight < windowHeight
                                ? windowY + anchorHeight
                                : windowY - menuHeight,
                        left:
                            windowX + menuWidth < windowWidth
                                ? windowX
                                : windowX + anchorWidth - menuWidth,
                    }}
                >
                    {children}
                </div>
            </Transition>
        </Portal>
    );
};

export default Menu;
