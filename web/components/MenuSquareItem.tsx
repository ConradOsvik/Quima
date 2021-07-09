import styles from "../styles/components/MenuSquareItem.module.css";

interface MenuSquareItemsProps {
    title: string;
    icon: string;
    onClick?: React.MouseEventHandler;
}

const MenuSquareItem = (props: MenuSquareItemsProps) => {
    const { title, icon, onClick } = props;
    return (
        <div className={styles.container} onClick={onClick}>
            {icon ? (
                <span className={styles.icon}>
                    <img
                        className={styles.iconImg}
                        src={`/icons/${icon}.png`}
                    />
                </span>
            ) : null}
            <span className={styles.title}>{title}</span>
        </div>
    );
};

export default MenuSquareItem;
