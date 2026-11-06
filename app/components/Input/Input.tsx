import { useId } from "react";
import "./Input.scss";

type InputProps = React.ComponentProps<"input"> & {
  label: string;
};

export default function Input({ label, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="input">
      <label className="input__label" htmlFor={inputId}>
        {label}
      </label>
      <input className="input__field" id={inputId} {...props} />
    </div>
  );
}
