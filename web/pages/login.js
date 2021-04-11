import React, { useEffect } from "react";
import styles from "../styles/Login.module.css";
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

const Login = (props) => {
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

    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
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
                <Text variant="h1">Login</Text>
                <form id="login-form" className={styles.loginForm}>
                    <TextInput placeholder="Username" />
                    <TextInput type="password" placeholder="Password" />
                </form>
                <Button
                    type="submit"
                    form="login-form"
                    variant="box"
                    size="medium"
                    prefix="✌️"
                >
                    Login
                </Button>
                <Button size="medium" onClick={() => router.push("/signup")}>
                    Not signed up yet?
                </Button>
            </div>
        </div>
    );
};

export default Login;
