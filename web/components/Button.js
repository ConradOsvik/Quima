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
            {props.prefix !== true ? (
                props.prefix !== undefined ? (
                    props.prefix.length > 0 ? (
                        <span
                            style={
                                props.size === "medium"
                                    ? { marginRight: 4 }
                                    : props.size === "large"
                                    ? { marginRight: 6 }
                                    : { marginRight: 2 }
                            }
                        >
                            {props.prefix}
                        </span>
                    ) : (
                        ""
                    )
                ) : (
                    ""
                )
            ) : (
                ""
            )}
            {props.children}
            {props.suffix !== true ? (
                props.suffix !== undefined ? (
                    props.suffix.length > 0 ? (
                        <span
                            style={
                                props.size === "medium"
                                    ? { marginLeft: 4 }
                                    : props.size === "large"
                                    ? { marginLeft: 6 }
                                    : { marginLeft: 2 }
                            }
                        >
                            {props.suffix}
                        </span>
                    ) : (
                        ""
                    )
                ) : (
                    ""
                )
            ) : (
                ""
            )}
        </button>
    );
});

export default Button;
