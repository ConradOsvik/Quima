import React, { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";

import DesktopView from "../utils/DesktopView";
import TabletView from "../utils/TabletView";
import MobileView from "../utils/MobileView";
import AppBar from "../widgets/AppBar";
import Paper from "../components/Paper";
import Button from "../components/Button";
const Menu = dynamic(() => import("../components/Menu"), { ssr: false });

export default function Home() {
    const [currentAnchor, setCurrentAnchor] = useState(undefined);

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
            <div
                style={{ display: "inline-block" }}
                onMouseLeave={() => setCurrentAnchor(undefined)}
            >
                <Button onMouseEnter={(e) => setCurrentAnchor(e.target)}>
                    test
                </Button>
                <Menu anchor={currentAnchor}>testtesttest</Menu>
                <Button
                    variant="box"
                    size="large"
                    onMouseEnter={(e) => setCurrentAnchor(e.target)}
                >
                    anotha one
                </Button>
            </div>
        </div>
    );
}
