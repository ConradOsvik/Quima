import styles from "../styles/Paper.module.css";

const Paper = (props) => {
    return <div className={styles.container}>{props.children}</div>;
};

export default Paper;
