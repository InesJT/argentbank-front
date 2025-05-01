import PropTypes from "prop-types";

const ErrorText = ({ styleClass, children }) => {
  return <p className={`${styleClass}`}>{children}</p>;
};

ErrorText.propTypes = {
  styleClass: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ErrorText;
