import "./message.styles.css";

interface MessageComponentProps {
  title?: string;
  subtitle?: string;
  message?: string;
}

const MessageComponent = ({
  title,
  subtitle,
  message,
}: MessageComponentProps) => {
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
