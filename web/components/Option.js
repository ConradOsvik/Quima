const Option = (props) => {
    return (
        <option value={props.children.toLowerCase()}>{props.children}</option>
    );
};

export default Option;
