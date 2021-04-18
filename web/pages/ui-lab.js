import React, { useState } from "react";

import Head from "next/head";
import useTabbing from "../utils/hooks/useTabbing";

import Button from "../components/Button";
import SliderInput from "../components/SliderInput";
import TextInput from "../components/TextInput";
import Text from "../components/Text";
import Menu from "../components/Menu";

const UILab = (props) => {
    useTabbing();

    const [currentAnchor, setCurrentAnchor] = useState(undefined);

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
            Font styles:
            <Text variant="h1">This is a h1</Text>
            <Text variant="h2">This is a h2</Text>
            <Text variant="h3">This is a h3</Text>
            <Text variant="h4">This is a h4</Text>
            <Text variant="h5">This is a h5</Text>
            <Text variant="h6">This is a h6</Text>
            <Text variant="sub1">This is a sub1</Text>
            <Text variant="sub2">This is a sub2</Text>
            <Text variant="body1">This is a body1</Text>
            <Text variant="body2">This is a body2</Text>
            <Text variant="caption">This is a caption</Text>
            <Text variant="overline">This is an underline</Text>
            <Text variant="body1">Buttons:</Text>
            <Button>Button</Button>
            <Button
                variant="box"
                onClick={(e) =>
                    setCurrentAnchor(
                        Boolean(currentAnchor) ? undefined : e.target
                    )
                }
            >
                Button
            </Button>
            <Menu anchor={currentAnchor}>test</Menu>
            <Text variant="body1">Inputs:</Text>
            <TextInput />
        </div>
    );
};

export default UILab;
