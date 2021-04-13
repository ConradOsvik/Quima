import React, { useRef } from "react";
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

    const ref = useRef();

    const anchor = props.anchor;
    let rect,
        x,
        y,
        height,
        width,
        windowWidth,
        windowHeight,
        menuRect,
        menuWidth,
        menuHeight;

    if (anchor !== undefined && ref.current !== undefined) {
        rect = anchor.getBoundingClientRect();
        x = rect.left;
        y = rect.top;
        height = rect.height;
        width = rect.width;
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        menuRect = ref.current.getBoundingClientRect();
        menuWidth = menuRect.width;
        menuHeight = menuRect.height;
    }

    return ReactDOM.createPortal(
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: "none",
                visibility: Boolean(anchor) ? "visible" : "hidden",
            }}
        >
            <CSSTransition in={Boolean(anchor)} timeout={300} classNames="menu">
                <div
                    {...initialProps}
                    style={{
                        top:
                            windowHeight < menuHeight + y + height
                                ? `${windowHeight - menuHeight}px`
                                : `${y + height}px`,
                        left:
                            windowWidth < menuWidth + x
                                ? `${windowWidth - menuWidth}px`
                                : `${x}px`,
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

{
    /*<div
            {...initialProps}
            style={{
                position: "absolute",
                display: "inline-block",
                top:
                    windowHeight < menuHeight + y + height
                        ? `${windowHeight - menuHeight}px`
                        : `${y + height}px`,
                left:
                    windowWidth < menuWidth + x + width
                        ? `${windowWidth - menuWidth}px`
                        : `${x}px`,
            }}
            ref={ref}
        >
            {props.children}
        </div> */
}
