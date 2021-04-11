import useWindowWidth from "./hooks/useWindowWidth";

const DesktopView = (props) => {
    const width = useWindowWidth();

    return width <= 1200 && width > 600 ? <>{props.children}</> : "";
};

export default DesktopView;
