import React, { useEffect } from "react";
import firebase from "../utils/Firebase";
import styles from "../styles/SignUp.module.css";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

import DesktopView from "../utils/DesktopView";
import TabletView from "../utils/TabletView";
import MobileView from "../utils/MobileView";

import Button from "../components/Button";
import TextInput from "../components/TextInput";
import AppBar from "../widgets/AppBar";
import Text from "../components/Text";

const SignUp = (props) => {
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleMouseDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Tab") {
            document.querySelector("html").setAttribute("tabbing", "");
        } else {
            document.querySelector("html").removeAttribute("tabbing");
        }
    };
    const handleMouseDown = () => {
        document.querySelector("html").removeAttribute("tabbing");
    };

    const router = useRouter();
    const auth = firebase.auth();
    const db = firebase.firestore();

    const handleSignUp = (e) => {
        e.preventDefault();

        if (
            e.target[2].value === e.target[3].value &&
            e.target[0].value !== "" &&
            e.target[1].value !== "" &&
            e.target[2].value !== "" &&
            e.target[3].value !== ""
        ) {
            auth.createUserWithEmailAndPassword(
                e.target[1].value,
                e.target[2].value
            ).then((data) => {
                db.collection("users")
                    .doc(data.user.uid)
                    .set({
                        userdata: {
                            username: e.target[0].value,
                            email: e.target[1].value,
                            uid: data.user.uid,
                        },
                    });
                document.getElementById("signup-form").reset();
            });
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Signup</title>
                <link
                    rel="preload"
                    href="/fonts/Roboto-Light.ttf"
                    as="font"
                    crossOrigin=""
                ></link>
                <link
                    rel="preload"
                    href="/fonts/Roboto-Regular.ttf"
                    as="font"
                    crossOrigin=""
                ></link>
                <link
                    rel="preload"
                    href="/fonts/Roboto-Medium.ttf"
                    as="font"
                    crossOrigin=""
                ></link>
                <link
                    rel="preload"
                    href="/fonts/Roboto-Bold.ttf"
                    as="font"
                    crossOrigin=""
                ></link>
            </Head>
            <AppBar>
                <Link href="/">
                    <a>🏡Home</a>
                </Link>
                <Link href="/ui-lab">
                    <a>🥼UI Lab</a>
                </Link>
            </AppBar>
            <div className={styles.innerContainer}>
                <Text variant="h1">Sign up</Text>
                <form
                    id="signup-form"
                    className={styles.loginForm}
                    onSubmit={handleSignUp}
                >
                    <TextInput placeholder="Username" />
                    <TextInput type="email" placeholder="Email" />
                    <TextInput type="password" placeholder="Password" />
                    <TextInput type="password" placeholder="Confirm password" />
                </form>
                <Button
                    type="submit"
                    form="signup-form"
                    variant="box"
                    size="medium"
                    prefix="👋"
                >
                    Sign up
                </Button>
                <Button size="medium" onClick={() => router.push("/login")}>
                    Already have a user?
                </Button>
            </div>
        </div>
    );
};

export default SignUp;
