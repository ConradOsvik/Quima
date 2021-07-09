import React, { useState, useRef, useImperativeHandle, useEffect } from "react";

import styles from "../styles/components/Tooltip.module.css";
import Portal from "./Portal";
import Transition from "./Transition";

interface TooltipProps {
    title: string;
    children: React.ReactNode;
    position?: string;
}

const Tooltip = React.forwardRef<HTMLSpanElement, TooltipProps>(
    (props, ref) => {
        const { title, children, position } = props;

        const [showTooltip, setShowTooltip] = useState(false);
        const [displayTooltip, setDisplayTooltip] = useState(false);
        const [tooltipX, setTooltipX] = useState(null);
        const [tooltipY, setTooltipY] = useState(null);
        const [tooltipWidth, setTooltipWidth] = useState(null);
        const [tooltipHeight, setTooltipHeight] = useState(null);
        const [anchorWidth, setAnchorWidth] = useState(null);
        const [anchorHeight, setAnchorHeight] = useState(null);
        const [anchor, setAnchor] = useState(undefined);

        const tooltipRef = useRef(null);

        useImperativeHandle(ref, () => tooltipRef.current);

        useEffect(() => {
            let t: ReturnType<typeof setTimeout>;
            let t2: ReturnType<typeof setTimeout>;
            if (showTooltip) {
                clearTimeout(t2);
                console.log("cleared outro");
                t = setTimeout(() => {
                    setDisplayTooltip(true);
                }, 500);
            }
            return () => {
                setDisplayTooltip(false);
                if (showTooltip) {
                    clearTimeout(t);
                    console.log("init outro");
                    t2 = setTimeout(() => {
                        setTooltipX(null);
                        setTooltipY(null);
                        setTooltipWidth(null);
                        setTooltipHeight(null);
                        setAnchorWidth(null);
                        setAnchorHeight(null);
                        console.log("completed outro");
                    }, 150);
                }
            };
        }, [showTooltip]);

        useEffect(() => {
            window.addEventListener("scroll", handleHideTooltip);
            return () => {
                window.removeEventListener("scroll", handleHideTooltip);
            };
        }, []);

        useEffect(() => {
            if (tooltipRef.current) {
                setTooltipWidth(tooltipRef.current.offsetWidth);
            }
        }, [title]);

        const handleShowTooltip = (e: React.MouseEvent<HTMLElement>) => {
            if (tooltipRef.current) {
                setAnchor(e.currentTarget);
                setShowTooltip(true);
                setTooltipX(
                    e.pageX -
                        (e.clientX -
                            e.currentTarget.getBoundingClientRect().left)
                );
                setTooltipY(
                    e.pageY -
                        (e.clientY -
                            e.currentTarget.getBoundingClientRect().top)
                );
                setTooltipWidth(tooltipRef.current.offsetWidth);
                setTooltipHeight(tooltipRef.current.offsetHeight);
                setAnchorWidth(e.currentTarget.offsetWidth);
                setAnchorHeight(e.currentTarget.offsetHeight);
            }
        };

        const handleHideTooltip = () => {
            setShowTooltip(false);
        };

        return (
            <>
                <Portal position="absolute">
                    <Transition type="fade" show={displayTooltip} speed="fast">
                        <span
                            ref={tooltipRef}
                            className={styles.container}
                            style={{
                                top: `${
                                    position === "top"
                                        ? tooltipY - tooltipHeight
                                        : position === "left"
                                        ? tooltipY +
                                          anchorHeight / 2 -
                                          tooltipHeight / 2
                                        : position === "right"
                                        ? tooltipY +
                                          anchorHeight / 2 -
                                          tooltipHeight / 2
                                        : tooltipY + anchorHeight
                                }px`,
                                left: `${
                                    position === "top"
                                        ? tooltipX +
                                          anchorWidth / 2 -
                                          tooltipWidth / 2
                                        : position === "left"
                                        ? tooltipX - tooltipWidth
                                        : position === "right"
                                        ? tooltipX + anchorWidth
                                        : tooltipX +
                                          anchorWidth / 2 -
                                          tooltipWidth / 2
                                }px`,
                            }}
                        >
                            <span className={styles.tooltip}>{title}</span>
                        </span>
                    </Transition>
                </Portal>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            onMouseEnter: (
                                e: React.MouseEvent<HTMLElement>
                            ) => {
                                child.props.onMouseEnter
                                    ? child.props.onMouseEnter(e)
                                    : null;
                                handleShowTooltip(e);
                            },
                            onMouseLeave: (
                                e: React.MouseEvent<HTMLElement>
                            ) => {
                                child.props.onMouseLeave
                                    ? child.props.onMouseLeave(e)
                                    : null;
                                handleHideTooltip();
                            },
                            onClick: (e: React.MouseEvent<HTMLElement>) => {
                                child.props.onClick
                                    ? child.props.onClick(e)
                                    : null;
                                handleHideTooltip();
                            },
                        });
                    }
                })}
            </>
        );
    }
);

export default Tooltip;
