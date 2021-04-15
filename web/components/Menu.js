import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Menu.module.css";
import { CSSTransition } from "react-transition-group";

const Menu = (props) => {
    const initialProps = {
        ...props,
        className: `menu ${
            props.className !== undefined ? props.className : ""
        } ${styles.container}`,
        anchor: undefined,
    };

    const [windowX, setWindowX] = useState(undefined);
    const [windowY, setWindowY] = useState(undefined);
    const [windowWidth, setWindowWidth] = useState(undefined);
    const [windowHeight, setWindowHeight] = useState(undefined);
    const [buttonWidth, setButtonWidth] = useState(undefined);
    const [buttonHeight, setButtonHeight] = useState(undefined);
    const [menuWidth, setMenuWidth] = useState(undefined);
    const [menuHeight, setMenuHeight] = useState(undefined);

    useEffect(() => {
        window.addEventListener("click", handleClick);
        window.addEventListener("resize", handleResize);

        if (props.anchor !== undefined && ref.current !== undefined) {
            getMenuPlacement(window.innerWidth, window.innerHeight);
        }

        return () => {
            window.removeEventListener("click", handleClick);
            window.removeEventListener("resize", handleResize);
        };
    }, [props.anchor, ref]);

    const handleClick = (e) => {
        if (props.anchor !== undefined && ref.current !== undefined) {
            if (e.target !== props.anchor && !props.anchor.contains(e.target)) {
                if (
                    e.target !== ref.current &&
                    !ref.current.contains(e.target)
                ) {
                    if (props.onClose) {
                        props.onClose();
                    }
                }
            }
        }
    };

    const handleResize = (e) => {
        if (props.anchor !== undefined && ref.current !== undefined) {
            const width = e.currentTarget.innerWidth;
            const height = e.currentTarget.innerHeight;
            getMenuPlacement(width, height);
        }
    };

    const getMenuPlacement = (windowW, windowH) => {
        const anchorRect = props.anchor.getBoundingClientRect();
        const menuRect = ref.current.getBoundingClientRect();

        setWindowX(anchorRect.left);
        setWindowY(anchorRect.top);
        setWindowWidth(windowW);
        setWindowHeight(windowH);
        setButtonWidth(anchorRect.width);
        setButtonHeight(anchorRect.height);
        setMenuWidth(menuRect.width);
        setMenuHeight(menuRect.height);
    };

    const ref = useRef();

    return ReactDOM.createPortal(
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1000,
                pointerEvents: "none",
                visibility: Boolean(props.anchor) ? "visible" : "hidden",
            }}
        >
            <CSSTransition
                in={Boolean(props.anchor)}
                timeout={0}
                classNames="menu"
            >
                <div
                    {...initialProps}
                    style={{
                        top:
                            windowHeight < menuHeight + windowY + buttonHeight
                                ? `${windowHeight - menuHeight}px`
                                : `${windowY + buttonHeight}px`,
                        left:
                            windowWidth <
                            windowX + buttonWidth / 2 + menuWidth / 2
                                ? `${windowWidth - menuWidth}px`
                                : `${
                                      windowX + buttonWidth / 2 - menuWidth / 2
                                  }px`,
                    }}
                    ref={ref}
                >
                    {props.children}
                </div>
            </CSSTransition>
        </div>,
        document.querySelector("body")
    );
};

export default Menu;
