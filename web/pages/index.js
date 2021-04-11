import React, { useEffect } from "react";

import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import DesktopView from "../utils/DesktopView";
import TabletView from "../utils/TabletView";
import MobileView from "../utils/MobileView";
import AppBar from "../widgets/AppBar";
import Paper from "../components/Paper";

export default function Home() {
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

    return (
        <div className={styles.container}>
            <Head>
                <title>Home</title>
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

            <Paper>test</Paper>

            <DesktopView>Desktop</DesktopView>
            <TabletView>Tablet</TabletView>
            <MobileView>Mobile</MobileView>
            <div className="overlay-container"></div>
        </div>
    );
}
