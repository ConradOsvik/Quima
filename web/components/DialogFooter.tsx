import styles from "../styles/components/DialogFooter.module.css";

interface DialogFooterProps {
    children: string;
    onClick?: React.MouseEventHandler;
    onClose?: Function;
}

const DialogFooter = (props: DialogFooterProps) => {
    const { children, onClick, onClose } = props;

    const handleClose = () => {
        if (onClose) onClose();
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.button} ${styles.cancel}`}
                onClick={handleClose}
            >
                Cancel
            </button>
            <button className={styles.button} onClick={onClick}>
                {children}
            </button>
        </div>
    );
};

export default DialogFooter;
