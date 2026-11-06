import "./StatusMessage.scss";

type StatusMessageProps = {
  variant?: "loading" | "error";
  children: React.ReactNode;
};

export default function StatusMessage({
  variant = "loading",
  children,
}: StatusMessageProps) {
  return (
    <p
      className={`status-message status-message--${variant}`}
      role={variant === "error" ? "alert" : "status"}
    >
      {children}
    </p>
  );
}
