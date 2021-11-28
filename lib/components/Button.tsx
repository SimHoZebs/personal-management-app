import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button
      className={`text-blue-400 rounded font-medium py-2 px-1 text-sm hover:(bg-opacity-10 bg-blue-300) ${className}`}
      {...rest}
    >
      {children?.toString().toUpperCase()}
    </button>
  );
}