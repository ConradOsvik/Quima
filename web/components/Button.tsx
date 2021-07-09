import React from "react";

import styles from "../styles/components/Button.module.css";

interface ButtonProps {
    className?: string;
    style?: object;
    id?: string;
    onClick?: Function;
    onMouseEnter?: Function;
    onMouseLeave?: Function;
    children: React.ReactNode;
    size?: string;
    variant?: string;
    theme?: string;
    disabled?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    type?: "button" | "submit" | "reset";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const {
            className,
            style,
            id,
            onClick,
            onMouseEnter,
            onMouseLeave,
            children,
            size,
            variant,
            theme,
            disabled,
            leftIcon,
            rightIcon,
            type,
        } = props;

        const handleOnClick = (e: React.MouseEvent) => {
            if (onClick) {
                onClick(e);
            }
        };

        const handleMouseEnter = (e: React.MouseEvent) => {
            if (onMouseEnter) onMouseEnter(e);
        };

        const handleMouseLeave = (e: React.MouseEvent) => {
            if (onMouseLeave) onMouseLeave(e);
        };

        return (
            <button
                ref={ref}
                style={style}
                className={`${className ? className : ""} ${
                    variant === "outline"
                        ? styles.outline
                        : variant === "none"
                        ? styles.none
                        : styles.filled
                } ${
                    size === "large"
                        ? styles.large
                        : size === "medium"
                        ? styles.medium
                        : styles.small
                } ${
                    theme === "secondary" ? styles.secondary : styles.primary
                } ${styles.base} ${disabled ? styles.disabled : ""}`}
                id={id}
                type={type ? type : "button"}
                role="button"
                tabIndex={disabled ? -1 : null}
                disabled={disabled}
                onClick={handleOnClick}
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={(e) => handleMouseLeave(e)}
            >
                {React.isValidElement(leftIcon) ? (
                    <span className={`${styles.icon} ${styles.leftIcon}`}>
                        {React.cloneElement(leftIcon, {
                            width: undefined,
                            height: undefined,
                        })}
                    </span>
                ) : null}
                {children}
                {React.isValidElement(rightIcon) ? (
                    <span className={`${styles.icon} ${styles.rightIcon}`}>
                        {React.cloneElement(rightIcon, {
                            width: undefined,
                            height: undefined,
                        })}
                    </span>
                ) : null}
            </button>
        );
    }
);

export default Button;
