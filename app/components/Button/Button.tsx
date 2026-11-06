import "./Button.scss";

type ButtonProps = React.ComponentProps<"button">;

export default function Button({ type = "button", ...props }: ButtonProps) {
  return <button className="button" type={type} {...props} />;
}
