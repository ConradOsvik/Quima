import React from "react";
import styles from "../styles/components/MenuItem.module.css";

interface MenuItemProps {
    title?: string;
    body?: string;
    icon?: string;
    onClick?: Function;
}

const MenuItem = (props: MenuItemProps) => {
    const { title, body, icon, onClick } = props;

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) onClick(e);
    };

    return (
        <div className={styles.container} onClick={handleClick}>
            {icon ? (
                <span className={styles.icon}>
                    <img
                        className={styles.iconImg}
                        src={`/icons/${icon}.png`}
                    />
                </span>
            ) : null}
            {(title && !body) || (body && !title) ? (
                <span className={title ? styles.title : styles.body}>
                    {title ? title : body}
                </span>
            ) : (
                <div className={styles.textContainer}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.body}>{body}</span>
                </div>
            )}
        </div>
    );
};

export default MenuItem;
