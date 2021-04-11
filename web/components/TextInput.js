import React, { useState } from "react";

import styles from "../styles/TextInput.module.css";

const TextInput = React.forwardRef((props, ref) => {
    const [value, setValue] = useState(
        props.value && props.value.length > 0 ? props.value : ""
    );

    const initialProps = {
        ...props,
        type:
            props.type === "email"
                ? "email"
                : props.type === "password"
                ? "password"
                : props.type === "search"
                ? "search"
                : "text",
        className: `${props.className !== undefined ? props.className : ""} ${
            styles.input
        }`,
        tabIndex: props.disabled ? -1 : 0,
    };

    return (
        <input
            {...initialProps}
            ref={ref}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
});

export default TextInput;
