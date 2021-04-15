import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import MenuItem from "../components/MenuItem";
import styles from "../styles/SettingsMenu.module.css";

const SettingsMenu = (props) => {
    const [activeMenu, setActiveMenu] = useState("settings");

    return (
        <div className={styles.container}>
            <CSSTransition
                in={activeMenu === "settings"}
                timeout={300}
                unmountOnExit
                classNames=""
            >
                <div>
                    <MenuItem>test</MenuItem>
                    <MenuItem>test</MenuItem>
                    <MenuItem>test</MenuItem>
                    <MenuItem>test</MenuItem>
                </div>
            </CSSTransition>
        </div>
    );
};

export default SettingsMenu;
