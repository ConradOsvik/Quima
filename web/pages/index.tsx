import React, { useState } from "react";

import Button from "../components/Button";
import Transition from "../components/Transition";
import Switch from "../components/Switch";
import Checkbox from "../components/Checkbox";
import Radio from "../components/Radio";
import RadioGroup from "../components/RadioGroup";
import Input from "../components/Input";
import Tooltip from "../components/Tooltip";

import { EyeOff, Lock } from "react-feather";
import Chip from "../components/chip";
import useKeyboardShortcut from "../utils/hooks/useKeyboardShortcut";
import Dialog from "../components/Dialog";
import Appbar from "../widgets/Appbar";
import Menu from "../components/Menu";
import MenuItem from "../components/MenuItem";
import DialogHeader from "../components/DialogHeader";
import DialogFooter from "../components/DialogFooter";

export default function Home() {
    const [state, setState] = useState(undefined);
    const [currentAnchor, setCurrentAnchor] = useState(undefined);

    useKeyboardShortcut(["shift", "w"], () => {
        console.log("test");
    });
    return (
        <>
            <Appbar />
            <main>
                <Tooltip title="button">
                    <Button disabled size="small" variant="filled">
                        test
                    </Button>
                    <Button size="medium" variant="filled">
                        test
                    </Button>
                    <Button size="large" variant="filled">
                        test
                    </Button>
                    <Button disabled size="small" variant="outline">
                        test
                    </Button>
                    <Button size="medium" variant="outline">
                        test
                    </Button>
                    <Button size="large" variant="outline">
                        test
                    </Button>
                    <Button disabled size="small" variant="none">
                        test
                    </Button>
                    <Button size="medium" variant="none">
                        test
                    </Button>
                    <Button size="large" variant="none">
                        test
                    </Button>
                </Tooltip>
                <Transition
                    type="scale"
                    show={true}
                    onEnter={() => console.log("started enter")}
                    onEntering={() => console.log("entering")}
                    onEntered={() => console.log("entered")}
                    onExit={() => console.log("started exit")}
                    onExiting={() => console.log("exiting")}
                    onExited={() => console.log("exited")}
                >
                    <p>test</p>
                </Transition>
                <Tooltip title="switch">
                    <Switch reverse checked>
                        Switch
                    </Switch>
                </Tooltip>
                <Switch disabled reverse checked>
                    disabled
                </Switch>
                <Tooltip title="checkbox">
                    <Checkbox reverse checked>
                        Checkbox
                    </Checkbox>
                </Tooltip>
                <Checkbox disabled reverse checked>
                    disabled
                </Checkbox>
                <Tooltip title="radio">
                    <Radio reverse checked>
                        Radio
                    </Radio>
                </Tooltip>
                <Radio disabled reverse checked>
                    disabled
                </Radio>
                <RadioGroup
                    value={state}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setState(e.target.value)
                    }
                >
                    <Radio value="1" disabled>
                        1
                    </Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                    <Radio value="4">4</Radio>
                </RadioGroup>
                <Tooltip title="input">
                    <Input
                        icon={<Lock />}
                        label="label"
                        feedback="feedback"
                        type="password"
                        placeholder="password"
                        max={255}
                    />
                </Tooltip>
                <Chip theme="primary" disabled>
                    small
                </Chip>
                <Chip size="medium" theme="primary">
                    medium
                </Chip>
                <Chip size="large" theme="primary">
                    large
                </Chip>
                <Chip variant="outline" theme="primary" disabled>
                    small
                </Chip>
                <Chip variant="outline" size="medium" theme="primary">
                    medium
                </Chip>
                <Chip variant="outline" size="large" theme="primary">
                    large
                </Chip>
                <Tooltip title="tooltip" position="right">
                    <span>test</span>
                    <span>test</span>
                    <span>test</span>
                </Tooltip>
                <Button onClick={(e) => setCurrentAnchor(e.target)}>
                    test
                </Button>
                <Menu
                    anchor={currentAnchor}
                    onClose={() => setCurrentAnchor(undefined)}
                >
                    <MenuItem title="list" body="click me" icon="listmenu" />
                </Menu>
            </main>
        </>
    );
}
