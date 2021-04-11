import React, { useState } from "react";

import styles from "../styles/SliderInput.module.css";

const SliderInput = React.forwardRef((props, ref) => {
    const [value, setValue] = useState(
        props.value && props.value.length > 0 ? props.value : ""
    );

    const initialProps = {
        ...props,
        type: "range",
        className: `${props.className !== undefined ? props.className : ""} ${
            styles.input
        }`,
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

export default SliderInput;
