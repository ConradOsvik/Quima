import React from "react";

import styles from "../styles/Button.module.css";

const Button = React.forwardRef((props, ref) => {
    const initialProps = {
        ...props,
        type: props.type !== undefined ? props.type : "button",
        className: `${props.className !== undefined ? props.className : ""} ${
            styles.base
        } ${
            props.size === "medium"
                ? styles.medium
                : props.size === "large"
                ? styles.large
                : styles.small
        } ${props.variant === "box" ? styles.box : styles.none} ${
            props.disabled ? styles.disabled : ""
        }`,
        role: "button",
        tabIndex: props.disabled ? -1 : 0,
        prefix: undefined,
        suffix: undefined,
        variant: undefined,
    };

    return (
        <button {...initialProps} ref={ref}>
            {React.isValidElement(props.prefix) ? (
                <span className={styles.prefix}>
                    {React.cloneElement(props.prefix, {
                        width: undefined,
                        height: undefined,
                    })}
                </span>
            ) : (
                ""
            )}
            {props.children}
            {React.isValidElement(props.suffix) ? (
                <span className={styles.suffix}>
                    {React.cloneElement(props.suffix, {
                        width: undefined,
                        height: undefined,
                    })}
                </span>
            ) : (
                ""
            )}
        </button>
    );
});

export default Button;
