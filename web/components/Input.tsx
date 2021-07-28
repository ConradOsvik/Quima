import React, { useState, useEffect, useRef, useImperativeHandle } from "react";

import styles from "../styles/components/Input.module.css";
import { Eye, EyeOff } from "react-feather";

interface InputProps {
    feedback?: string;
    status?: "error" | "success" | "warning";
    value?: string;
    label?: string;
    placeholder?: string;
    max?: number;
    type?:
        | "text"
        | "textfield"
        | "number"
        | "password"
        | "email"
        | "tel"
        | "date"
        | "select";
    focus?: boolean;
    onChange?: Function;
    onClick?: Function;
    onMouseEnter?: Function;
    onMouseLeave?: Function;
    onFocus?: Function;
    onBlur?: Function;
    className?: "string";
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    let {
        feedback,
        status,
        value,
        label,
        placeholder,
        max,
        type,
        focus,
        onChange,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        className,
        icon,
        disabled,
    } = props;

    const [inputValue, setInputValue] = useState(
        value ? value : type === "number" ? (value = "0") : (value = "")
    );
    const [inputStatus, setInputStatus] = useState(status);
    const [inputFeedback, setInputFeedback] = useState(feedback);
    const [inputLabel, setInputLabel] = useState(label);
    const [inputPlaceholder, setInputPlaceholder] = useState(placeholder);
    const [maxCharacters, setMaxCharacters] = useState(max);
    const [inputType, setInputType] = useState(type);

    const [inputFocus, setInputFocus] = useState(focus);

    const inputRef = useRef(null);

    useImperativeHandle(ref, () => inputRef.current);

    /*Updating values through props*/
    useEffect(() => {
        setInputStatus(status);
    }, [status]);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        setInputFeedback(feedback);
    }, [feedback]);

    useEffect(() => {
        setInputLabel(label);
    }, [label]);

    useEffect(() => {
        setInputPlaceholder(placeholder);
    }, [placeholder]);

    useEffect(() => {
        setMaxCharacters(max);
    }, [max]);

    useEffect(() => {
        setInputType(type);
    }, [type]);

    useEffect(() => {
        setInputFocus(focus);
        if (focus) {
            inputRef.current.focus();
        } else {
            inputRef.current.blur();
        }
    }, [focus]);
    /* <---> */

    //max length
    useEffect(() => {
        if (
            (type === "text" || type === "textfield") &&
            max &&
            inputValue.length > max
        ) {
            setInputValue(inputValue.substring(0, max));
        }
    }, [type, inputValue, max]);

    //events
    const handleChange = (
        e:
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLInputElement>
    ) => {
        if (onChange) onChange(e);
        setInputValue(e.target.value);
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

    const handleFocus = (e: React.FocusEvent) => {
        if (onFocus) onFocus(e);
        setInputFocus(true);
    };

    const handleBlur = (e: React.FocusEvent) => {
        if (onBlur) onBlur(e);
        setInputFocus(false);
    };

    const incrementValue = () => {
        setInputValue(`${Number(inputValue) + 1}`);
    };

    const decrementValue = () => {
        setInputValue(`${Number(inputValue) - 1}`);
    };

    const togglePassword = () => {
        setInputType(inputType === "text" ? "password" : "text");
    };

    return (
        <div
            className={`${styles.container} ${
                inputStatus === "error"
                    ? styles.error
                    : inputStatus === "success"
                    ? styles.success
                    : inputStatus === "warning"
                    ? styles.warning
                    : ""
            } ${disabled ? styles.disabled : ""}`}
        >
            <span className={styles.label}>{inputLabel}</span>
            <div className={styles.innerContainer}>
                {type !== "textfield" && React.isValidElement(icon) ? (
                    <span className={`${styles.icon} ${styles.leftIcon}`}>
                        {React.cloneElement(icon, {
                            width: undefined,
                            height: undefined,
                        })}
                    </span>
                ) : null}
                {type === "textfield" ? (
                    <textarea
                        ref={inputRef}
                        className={`${className ? className : ""} ${
                            styles.input
                        }`}
                        value={inputValue}
                        placeholder={inputFocus ? inputPlaceholder : undefined}
                        tabIndex={disabled ? -1 : null}
                        disabled={disabled}
                        onChange={(e) => handleChange(e)}
                        onClick={(e) => handleClick(e)}
                        onMouseEnter={(e) => handleMouseEnter(e)}
                        onMouseLeave={(e) => handleMouseLeave(e)}
                        onFocus={(e) => handleFocus(e)}
                        onBlur={(e) => handleBlur(e)}
                    />
                ) : (
                    <input
                        ref={inputRef}
                        type={inputType ? inputType : "text"}
                        className={`${className ? className : ""} ${
                            styles.input
                        }`}
                        value={inputValue}
                        placeholder={inputPlaceholder} //Legacy: inputFocus ? inputPlaceholder : undefined
                        tabIndex={disabled ? -1 : null}
                        disabled={disabled}
                        onChange={(e) => handleChange(e)}
                        onClick={(e) => handleClick(e)}
                        onMouseEnter={(e) => handleMouseEnter(e)}
                        onMouseLeave={(e) => handleMouseLeave(e)}
                        onFocus={(e) => handleFocus(e)}
                        onBlur={(e) => handleBlur(e)}
                    />
                )}
                {type === "password" ? (
                    <span
                        className={`${styles.icon} ${styles.rightIcon}`}
                        onClick={togglePassword}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        {inputType === "text" ? (
                            <EyeOff width={undefined} height={undefined} />
                        ) : (
                            <Eye width={undefined} height={undefined} />
                        )}
                    </span>
                ) : null}
                {type === "number" ? (
                    <div className={styles.numberContainer}>
                        <span
                            className={`${styles.numberButton} ${styles.numberIncrement}`}
                            onClick={() => incrementValue()}
                        ></span>
                        <span
                            className={`${styles.numberButton} ${styles.numberDecrement}`}
                            onClick={() => decrementValue()}
                        ></span>
                    </div>
                ) : null}
            </div>
            <div className={styles.feedbackContainer}>
                <span className={styles.feedback}>{inputFeedback}</span>
                {(type === "text" || type === "textfield") && max ? (
                    <span className={styles.maxCharacters}>
                        {inputValue.length}/{maxCharacters}
                    </span>
                ) : null}
            </div>
        </div>
    );
});

export default Input;
