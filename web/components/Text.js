import React from "react";
import styles from "../styles/Text.module.css";

const Text = React.forwardRef((props, ref) => {
    const initialProps = {
        ...props,
        className: `${props.className !== undefined ? props.className : ""} ${
            styles[props.variant]
        }`,
        tabIndex:
            props.variant === "h1" ||
            props.variant === "h2" ||
            props.variant === "h3" ||
            props.variant === "h4" ||
            props.variant === "h5" ||
            props.variant === "h6"
                ? 0
                : -1,
    };

    return props.variant === "h1" ? (
        <h1 {...initialProps} ref={ref}>
            {props.children}
        </h1>
    ) : props.variant === "h2" ? (
        <h2 {...initialProps} ref={ref}>
            {props.children}
        </h2>
    ) : props.variant === "h3" ? (
        <h3 {...initialProps} ref={ref}>
            {props.children}
        </h3>
    ) : props.variant === "h4" ? (
        <h4 {...initialProps} ref={ref}>
            {props.children}
        </h4>
    ) : props.variant === "h5" ? (
        <h5 {...initialProps} ref={ref}>
            {props.children}
        </h5>
    ) : props.variant === "h6" ? (
        <h6 {...initialProps} ref={ref}>
            {props.children}
        </h6>
    ) : props.variant === "sub1" ? (
        <p {...initialProps} ref={ref}>
            {props.children}
        </p>
    ) : props.variant === "sub2" ? (
        <p {...initialProps} ref={ref}>
            {props.children}
        </p>
    ) : props.variant === "body2" ? (
        <p {...initialProps} ref={ref}>
            {props.children}
        </p>
    ) : props.variant === "caption" ? (
        <span {...initialProps} ref={ref}>
            {props.children}
        </span>
    ) : props.variant === "overline" ? (
        <span {...initialProps} ref={ref}>
            {props.children}
        </span>
    ) : (
        <p {...initialProps} ref={ref}>
            {props.children}
        </p>
    );
});

export default Text;
