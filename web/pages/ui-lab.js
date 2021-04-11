import React, { useEffect } from "react";

import Head from "next/head";

import Button from "../components/Button";
import SliderInput from "../components/SliderInput";
import TextInput from "../components/TextInput";

const UILab = (props) => {
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
        <div>
            <Head>
                <title>UI Lab</title>
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
            <Button variant="box" size="medium">
                test
            </Button>
            <Button size="medium">test</Button>
            <TextInput />
            <SliderInput />
        </div>
    );
};

export default UILab;
