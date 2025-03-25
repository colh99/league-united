import PropTypes from "prop-types";

const Message = ({ username, message }) => {
    return (
        <div className="sub-component-container">
            {message ? (
                <p><strong>{message}</strong></p>
            ) : (
                <p>Welcome, {username}!</p>
            )}
        </div>
    );
};

Message.propTypes = {
    username: PropTypes.string.isRequired,
    message: PropTypes.string,
};

export default Message;