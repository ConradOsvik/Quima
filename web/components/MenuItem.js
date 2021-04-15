import styles from "../styles/MenuItem.module.css";

import Text from "./Text";

const MenuItem = (props) => {
    return (
        <div className={styles.container}>
            {props.prefix}
            <Text variant="body1">{props.children}</Text>
            {props.suffix}
        </div>
    );
};

export default MenuItem;
