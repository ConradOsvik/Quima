import { useEffect, useState } from "react";

import firebase from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toPng } from "dom-to-image";

import styles from "../styles/widgets/Appbar.module.css";
import Tooltip from "../components/Tooltip";
import Menu from "../components/Menu";
import MenuItem from "../components/MenuItem";
import Divider from "../components/Divider";
import MenuHeader from "../components/MenuHeader";
import Dialog from "../components/Dialog";
import DialogHeader from "../components/DialogHeader";
import DialogFooter from "../components/DialogFooter";
import MenuSquareItem from "../components/MenuSquareItem";

interface AppbarProps {}

const Appbar = (props: AppbarProps) => {
    const [user, loading, error] = useAuthState(firebase.auth());

    const [navTooltip, setNavTooltip] = useState(undefined);
    const [rightMenuTooltip, setRightMenuTooltip] = useState(undefined);

    const [settingsMenuPage, setSettingsMenuPage] = useState("main");

    const [settingsMenu, setSettingsMenu] = useState(undefined);
    const [menu, setMenu] = useState(undefined);

    const [feedbackDialog, setFeedbackDialog] = useState(false);
    const [feedbackImg, setFeedbackImg] = useState(undefined);

    const filter = (node: HTMLElement) => {
        return node.id !== "feedback-ignore";
    };

    const getFeedbackImg = () => {
        toPng(document.querySelector("body"), {
            filter: filter,
            quality: 1,
            height: 1080,
            width: 1920,
        }).then((url: string) => {
            setFeedbackImg(url);
        });
    };

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <Tooltip title="Quima.io">
                    <button className={styles.button}>
                        <span
                            className={`${styles.iconButton} ${styles.logo}`}
                        />
                    </button>
                </Tooltip>
            </div>
            <nav className={styles.center}>
                <Tooltip title={navTooltip}>
                    <button
                        className={styles.button}
                        onMouseOver={() => setNavTooltip("create a new game")}
                    >
                        <span
                            className={`${styles.iconButton} ${styles.createButton}`}
                        />
                        Create game
                    </button>
                    <button
                        className={styles.button}
                        onMouseOver={() => setNavTooltip("play a new game")}
                    >
                        <span
                            className={`${styles.iconButton} ${styles.playButton}`}
                        />
                        Play game
                    </button>
                    <button
                        className={styles.button}
                        onMouseOver={() => setNavTooltip("about quima")}
                    >
                        <span
                            className={`${styles.iconButton} ${styles.aboutButton}`}
                        />
                        About
                    </button>
                </Tooltip>
            </nav>
            {user ? (
                <div className={styles.right}>
                    <Tooltip title={rightMenuTooltip}>
                        <button
                            className={styles.button}
                            onMouseOver={() => setRightMenuTooltip("menu")}
                            onClick={(e) =>
                                setMenu(menu ? undefined : e.target)
                            }
                        >
                            <span
                                className={`${styles.menuButton} ${styles.iconButton}`}
                            />
                            Menu
                        </button>
                        <button
                            className={styles.button}
                            onMouseOver={() =>
                                setRightMenuTooltip("notifications")
                            }
                        >
                            <span
                                className={`${styles.notificationButton} ${styles.iconButton}`}
                            />
                            Notifications
                        </button>
                        <button
                            className={styles.button}
                            onMouseOver={() => setRightMenuTooltip("settings")}
                            onClick={(e) =>
                                setSettingsMenu(
                                    settingsMenu ? undefined : e.target
                                )
                            }
                        >
                            <span
                                className={`${styles.settingsButton} ${styles.iconButton}`}
                            />
                            settings
                        </button>
                    </Tooltip>
                </div>
            ) : loading ? (
                <div className={styles.right}></div>
            ) : (
                <div className={styles.right}>
                    <button
                        className={`${styles.iconButton} ${styles.loginButton}`}
                    ></button>
                </div>
            )}
            <Menu
                anchor={settingsMenu}
                onClose={() => setSettingsMenu(undefined)}
                id="feedback-ignore"
            >
                {settingsMenuPage === "main" ? (
                    <div className={styles.settingsMenu}>
                        <MenuHeader
                            title="Settings"
                            onClick={() => setSettingsMenu(undefined)}
                        />
                        <Divider />
                        <MenuItem
                            icon="wrench"
                            title="Send feedback"
                            body="Give feedback about your experience"
                            onClick={() => {
                                setFeedbackDialog(true);
                                setSettingsMenu(undefined);
                            }}
                        />
                        <Divider />
                        <MenuItem
                            icon="profile"
                            title="Account"
                            body="View your account"
                        />
                        <MenuItem
                            icon="gear"
                            title="Settings and preferences"
                            body="Change your user settings and preferences"
                        />
                        <MenuItem
                            onClick={() => setSettingsMenuPage("darkmode")}
                            icon="moon"
                            title="Darkmode and display"
                            body="Choose your display settings"
                        />
                        <Divider />
                        <MenuItem
                            icon="signout"
                            title="Log out"
                            body="Log out of the quima app"
                        />
                    </div>
                ) : settingsMenuPage === "feedback" ? (
                    ""
                ) : settingsMenuPage === "settings" ? (
                    ""
                ) : settingsMenuPage === "darkmode" ? (
                    <div className={styles.settingsMenu}>
                        <MenuHeader
                            title="Darkmode and display"
                            onClick={() => setSettingsMenuPage("main")}
                        />
                        <Divider />
                    </div>
                ) : null}
            </Menu>
            <Menu anchor={menu} onClose={() => setMenu(undefined)}>
                <div className={styles.menu}>
                    <MenuSquareItem icon="search" title="Search" />
                    <MenuSquareItem icon="friends" title="Friends" />
                    <MenuSquareItem icon="group" title="Groups" />
                </div>
            </Menu>
            <Dialog
                in={feedbackDialog}
                onClose={() => setFeedbackDialog(false)}
                id="feedback-ignore"
            >
                <DialogHeader icon="web" title="Feedback" />
                <div className={styles.feedbackImgContainer}>
                    {feedbackImg ? (
                        <img src={feedbackImg} />
                    ) : (
                        <button
                            className={styles.button}
                            onClick={getFeedbackImg}
                        >
                            Get screenshot
                        </button>
                    )}
                </div>
                <DialogFooter
                    onClose={() => setFeedbackDialog(false)}
                    onClick={() => setFeedbackDialog(false)}
                >
                    Send Feedback
                </DialogFooter>
            </Dialog>
        </header>
    );
};

export default Appbar;
