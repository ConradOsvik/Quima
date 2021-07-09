import styles from "../styles/components/DialogHeader.module.css";

interface DialogHeaderProps {
    title: string;
    icon?: string;
}

const DialogHeader = (props: DialogHeaderProps) => {
    const { title, icon } = props;
    return (
        <div className={styles.container}>
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

export default DialogHeader;
