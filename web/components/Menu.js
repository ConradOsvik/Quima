import React from "react";

const Menu = (props) => {
    const initialProps = {
        ...props,
    };

    const anchor = props.anchor;

    return React.createPortal(
        <div {...initialProps}>{props.children}</div>,
        document.getElementsByClassName("overlay-container")
    );
};
