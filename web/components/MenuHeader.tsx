import styles from "../styles/components/MenuHeader.module.css";
import Tooltip from "./Tooltip";

interface MenuHeaderProps {
    title: string;
    onClick?: Function;
}

const MenuHeader = (props: MenuHeaderProps) => {
    const { title, onClick } = props;

    const handleClick = (e) => {
        if (onClick) onClick(e);
    };

    return (
        <div className={styles.container}>
            <Tooltip title="Go back">
                <span className={styles.icon} onClick={handleClick}>
                    <img
                        className={styles.iconImg}
                        src="/icons/backarrow.png"
                    />
                </span>
            </Tooltip>
            <span className={styles.title}>{title}</span>
        </div>
    );
};

export default MenuHeader;
