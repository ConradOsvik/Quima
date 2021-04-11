import useWindowWidth from "./hooks/useWindowWidth";

const DesktopView = (props) => {
    const width = useWindowWidth();

    return width > 1200 ? <>{props.children}</> : "";
};

export default DesktopView;
