import "./message.styles.css"

interface MessageComponentProps{
    title?: string;
    subtitle?: string;
    message?: string;  
}

/**
 * MessageComponent is a reusable component that displays a message with a title, subtitle, and a message.
 * 
 * The component expects the following props:
 * - title: A string that is the title of the message. If not given, it defaults to an empty string.
 * - subtitle: A string that is the subtitle of the message. If not given, it defaults to an empty string.
 * - message: A string that is the message of the message. If not given, it defaults to "Pick a subject to get started."
 * 
 * The component renders a h2 element with the title and subtitle in a span, and a p element with the message.
 */
const MessageComponent = ({title, subtitle, message}: MessageComponentProps) => {
    return (
        <section className="message-container">
            <h2 className="message__title">
                {title || ""} <span>{subtitle || ""}</span>
            </h2>
            {message && <p className="message">Pick a subject to get started.</p>}
        </section>
    );
};

export default MessageComponent;