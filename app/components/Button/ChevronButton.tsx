import "./Button.scss";

type ChevronButtonProps = Omit<React.ComponentProps<"button">, "children"> & {
  direction?: "left" | "right";
  "aria-label": string;
};

export default function ChevronButton({
  direction = "right",
  type = "button",
  ...props
}: ChevronButtonProps) {
  return (
    <button
      className={`chevron-button chevron-button--${direction}`}
      type={type}
      {...props}
    >
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden>
        <path
          d="M1 1l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
