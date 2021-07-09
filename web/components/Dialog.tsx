import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import Portal from "./Portal";

interface DialogProps {
    in: boolean;
    children: React.ReactNode;
    onClose?: Function;
    id: string;
}

const Dialog = (props: DialogProps) => {
    let { in: dialogIn, children, onClose, id } = props;

    const dialogRef = useRef(null);

    const handleClick = (e: React.MouseEvent) => {
        if (
            e.target !== dialogRef.current &&
            !dialogRef.current.contains(e.target)
        ) {
            if (onClose) onClose();
        }
    };

    return (
        <Portal>
            <CSSTransition
                appear={dialogIn}
                in={dialogIn}
                timeout={300}
                classNames="dialog-container"
                unmountOnExit
            >
                <div id={id} className="dialog-container" onClick={handleClick}>
                    <CSSTransition
                        appear={dialogIn}
                        in={dialogIn}
                        timeout={300}
                        classNames="dialog"
                        unmountOnExit
                    >
                        <div ref={dialogRef} className="dialog">
                            <div className="dialog-inner">{children}</div>
                        </div>
                    </CSSTransition>
                </div>
            </CSSTransition>
        </Portal>
    );
};

export default Dialog;
