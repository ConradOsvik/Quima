import React, { useEffect, useState } from "react";

import styles from "../styles/components/RadioGroup.module.css";

interface RadioGroupProps {
    children: React.ReactNode;
    value: string;
    onChange: Function;
    className?: string;
}

const RadioGroup = (props: RadioGroupProps) => {
    const { children, value, onChange, className } = props;

    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e);
    };

    return (
        <div
            className={`${className ? className : ""} ${styles.container}`}
            role="radiogroup"
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e),
                        checked: child.props.value === currentValue,
                    });
                }
            })}
        </div>
    );
};

export default RadioGroup;
