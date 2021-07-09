import React from "react";
import { CSSTransition } from "react-transition-group";

interface transitionProps {
    type: string;
    show: boolean;
    unmountOnExit?: boolean;
    children: React.ReactNode;
    speed?: "fast" | "normal" | "slow" | undefined;
    onEnter?: Function;
    onEntering?: Function;
    onEntered?: Function;
    onExit?: Function;
    onExiting?: Function;
    onExited?: Function;
}

const Transition = (props: transitionProps) => {
    const {
        type,
        show,
        speed,
        unmountOnExit,
        children,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
    } = props;

    return (
        <CSSTransition
            in={show}
            appear={show}
            timeout={speed === "fast" ? 150 : speed === "slow" ? 500 : 300}
            unmountOnExit={unmountOnExit}
            classNames={
                type === "fade"
                    ? `fade-${speed ? speed : "normal"}-transition`
                    : type === "scale"
                    ? `scale-fade-${speed ? speed : "normal"}-transition`
                    : type === "slide"
                    ? `slide-fade-${speed ? speed : "normal"}-transition`
                    : ""
            }
            onEnter={onEnter}
            onEntering={onEntering}
            onEntered={onEntered}
            onExit={onExit}
            onExiting={onExiting}
            onExited={onExited}
        >
            {React.isValidElement(children)
                ? React.cloneElement(children, {
                      className: `${
                          children.props.className
                              ? children.props.className
                              : ""
                      } transition-base`,
                  })
                : null}
        </CSSTransition>
    );
};

export default Transition;
