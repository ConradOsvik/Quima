import React, { useState, useEffect } from "react";

import styles from "../styles/components/Checkbox.module.css";
import { Check } from "react-feather";

interface SwitchProps {
    className?: string;
    checked?: boolean;
    onChange?: Function;
    onClick?: Function;
    onMouseEnter?: Function;
    onMouseLeave?: Function;
    children?: React.ReactNode;
    value?: string;
    reverse?: boolean;
    theme?: string;
    disabled?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, SwitchProps>(
    (props, ref) => {
        let {
            className,
            checked,
            onChange,
            onClick,
            onMouseEnter,
            onMouseLeave,
            children,
            value,
            reverse,
            theme,
            disabled,
        } = props;

        const [inputChecked, setInputChecked] = useState(
            checked ? checked : (checked = false)
        );
        const [inputValue, setInputValue] = useState(value);

        useEffect(() => {
            setInputChecked(checked);
        }, [checked]);

        useEffect(() => {
            setInputValue(value);
        }, [value]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) onChange(e);
            setInputChecked(!inputChecked);
        };

        const handleClick = (e: React.MouseEvent) => {
            if (onClick) onClick(e);
        };

        const handleMouseEnter = (e: React.MouseEvent) => {
            if (onMouseEnter) onMouseEnter(e);
        };

        const handleMouseLeave = (e: React.MouseEvent) => {
            if (onMouseLeave) onMouseLeave(e);
        };

        return (
            <label
                className={`${className ? className : ""} ${styles.container} ${
                    reverse ? styles.containerReverse : ""
                } ${
                    theme === "secondary" ? styles.secondary : styles.primary
                } ${inputChecked ? styles.checked : ""} ${
                    disabled ? styles.disabled : ""
                }`}
            >
                <input
                    ref={ref}
                    type="checkbox"
                    className={styles.input}
                    checked={inputChecked}
                    value={inputValue}
                    role="checkbox"
                    aria-checked={inputChecked}
                    tabIndex={disabled ? -1 : null}
                    onChange={(e) => handleChange(e)}
                    onClick={(e) => handleClick(e)}
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                />
                <span className={styles.border}>
                    <span className={styles.head}>
                        <Check />
                    </span>
                </span>
                <span className={styles.label}>{children}</span>
            </label>
        );
    }
);

export default Checkbox;