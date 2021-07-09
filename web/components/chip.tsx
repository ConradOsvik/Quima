import styles from "../styles/components/Chip.module.css";

interface ChipProps {
    variant?: string;
    size?: string;
    theme?: string;
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
}

const Chip = (props: ChipProps) => {
    const { variant, size, theme, className, children, disabled } = props;

    return (
        <span
            className={`${className ? className : ""} ${
                variant === "outline" ? styles.outline : styles.filled
            } ${
                size === "large"
                    ? styles.large
                    : size === "medium"
                    ? styles.medium
                    : styles.small
            } ${
                theme === "primary"
                    ? styles.primary
                    : theme === "secondary"
                    ? styles.secondary
                    : ""
            } ${disabled ? styles.disabled : ""}`}
        >
            {children}
        </span>
    );
};

export default Chip;
