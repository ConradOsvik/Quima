import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../utils/Firebase";
import { useRouter } from "next/router";
import styles from "../styles/AppBar.module.css";

import DesktopView from "../utils/DesktopView";
import TabletView from "../utils/TabletView";
import MobileView from "../utils/MobileView";

import Button from "../components/Button";

const AppBar = (props) => {
    const router = useRouter();

    const [user, loading, error] = useAuthState(firebase.auth());

    return (
        <DesktopView>
            <div className={styles.container}>
                <div className={styles.left}></div>
                <nav className={styles.middle}>{props.children}</nav>
                <div className={styles.right}>
                    {loading ? (
                        <>
                            <Button
                                prefix="✌️"
                                onClick={() => router.push("/login")}
                            >
                                Login
                            </Button>
                            <Button
                                variant="box"
                                prefix="👋"
                                onClick={() => router.push("/signup")}
                            >
                                Sign up
                            </Button>
                        </>
                    ) : !user ? (
                        <>
                            <Button
                                prefix="✌️"
                                onClick={() => router.push("/login")}
                            >
                                Login
                            </Button>
                            <Button
                                variant="box"
                                prefix="👋"
                                onClick={() => router.push("/signup")}
                            >
                                Sign up
                            </Button>
                        </>
                    ) : user ? (
                        <div className={styles.profileContainer}></div>
                    ) : (
                        console.log(error)
                    )}
                </div>
            </div>
        </DesktopView>
    );
};

export default AppBar;
