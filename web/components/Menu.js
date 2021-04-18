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

    const ref = useRef();
    const [mounted, setMounted] = useState(false);

    const [windowX, setWindowX] = useState(undefined);
    const [windowY, setWindowY] = useState(undefined);
    const [windowWidth, setWindowWidth] = useState(undefined);
    const [windowHeight, setWindowHeight] = useState(undefined);
    const [buttonWidth, setButtonWidth] = useState(undefined);
    const [buttonHeight, setButtonHeight] = useState(undefined);
    const [menuWidth, setMenuWidth] = useState(undefined);
    const [menuHeight, setMenuHeight] = useState(undefined);

    useEffect(() => {
        setMounted(true);

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

    return mounted
        ? ReactDOM.createPortal(
              <CSSTransition
                  in={Boolean(props.anchor)}
                  timeout={300}
                  classNames="menu-container"
              >
                  <div className="menu-container">
                      <CSSTransition
                          in={Boolean(props.anchor)}
                          timeout={150}
                          classNames="menu"
                      >
                          <div
                              {...initialProps}
                              style={{
                                  transformOrigin: `${
                                      windowHeight <
                                      windowY + buttonHeight + menuHeight
                                          ? "bottom"
                                          : "top"
                                  } ${
                                      windowWidth < windowX + menuWidth
                                          ? "right"
                                          : "left"
                                  }`,
                                  top:
                                      windowHeight <
                                      windowY + buttonHeight + menuHeight
                                          ? `${windowY - menuHeight - 5}px`
                                          : `${windowY + buttonHeight + 5}px`,
                                  left:
                                      windowWidth < windowX + menuWidth
                                          ? `${
                                                windowX +
                                                buttonWidth -
                                                menuWidth
                                            }px`
                                          : `${windowX}px`,
                              }}
                              ref={ref}
                          >
                              <div className={styles["inner-container"]}>
                                  {props.children}
                              </div>
                          </div>
                      </CSSTransition>
                  </div>
              </CSSTransition>,
              document.querySelector("body")
          )
        : "";
};

export default Menu;
